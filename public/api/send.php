<?php
/**
 * Dunn Creative website form handler.
 * Receives the /contact form and the /start project brief (JSON POST from the
 * same site) and emails them to Chris. Runs on Hostinger with PHP's mail().
 *
 * Response: JSON { success: bool, message: string }
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

const TO_EMAIL   = 'chris@dunncreative.com';
const FROM_EMAIL = 'forms@dunncreative.net';   // must be an address on this hosting domain
const ALLOWED_ORIGINS = [
  'https://dunncreative.net', 'https://www.dunncreative.net',
  'https://dunncreative.com', 'https://www.dunncreative.com',
];

function reply(int $code, bool $ok, string $message): void {
  http_response_code($code);
  echo json_encode(['success' => $ok, 'message' => $message]);
  exit;
}

function clean($value, int $max = 5000): string {
  if (is_array($value)) { $value = implode(', ', array_map('strval', $value)); }
  if (!is_scalar($value)) { return ''; }
  $value = str_replace(["\r\n", "\r"], "\n", (string) $value);
  return mb_substr(trim($value), 0, $max);
}

function one_line(string $value): string {
  return trim(preg_replace('/[\r\n\t]+/', ' ', $value));
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  reply(405, false, 'Use POST.');
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, ALLOWED_ORIGINS, true)) {
  reply(403, false, 'Not allowed from this site.');
}

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 100000) {
  reply(413, false, 'Message is too long.');
}
$data = json_decode($raw, true);
if (!is_array($data)) { $data = $_POST; }

// Honeypot: bots fill hidden fields. Pretend success, send nothing.
if (!empty($data['_honey'])) {
  reply(200, true, 'Sent.');
}

$name  = one_line(clean($data['name'] ?? '', 200));
$email = one_line(clean($data['email'] ?? '', 200));
if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  reply(422, false, 'Add your name and a valid email.');
}

// Light rate limit: 5 sends per 10 minutes per IP.
$ip   = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$file = sys_get_temp_dir() . '/dc_forms_' . md5($ip);
$now  = time();
$hits = json_decode((string) @file_get_contents($file), true);
$hits = is_array($hits) ? array_values(array_filter($hits, fn($t) => $t > $now - 600)) : [];
if (count($hits) >= 5) {
  reply(429, false, 'Too many messages. Please try again in a few minutes.');
}
$hits[] = $now;
@file_put_contents($file, json_encode($hits));

$form    = (($data['_form'] ?? '') === 'brief') ? 'brief' : 'contact';
$subject = one_line(clean($data['_subject'] ?? '', 150));
if ($subject === '') {
  $subject = $form === 'brief' ? 'New project brief' : 'New contact message';
}

if ($form === 'brief' && !empty($data['brief'])) {
  $body = clean($data['brief'], 30000);
} else {
  $labels = [
    'name' => 'Name', 'email' => 'Email', 'company' => 'Company',
    'service' => 'Service', 'budget' => 'Budget', 'message' => 'Message',
  ];
  $lines = [];
  foreach ($data as $key => $value) {
    if (!is_string($key) || $key === '' || $key[0] === '_') { continue; }
    $text = clean($value, 10000);
    if ($text === '') { continue; }
    $label = $labels[$key] ?? ucfirst($key);
    $lines[] = strpos($text, "\n") !== false ? "$label:\n$text" : "$label: $text";
  }
  $body = implode("\n\n", $lines);
}

$page  = $form === 'brief' ? 'dunncreative.net/start' : 'dunncreative.net/contact';
$body .= "\n\n--\nSent from $page on " . gmdate('Y-m-d H:i') . " UTC";

$safeName = trim(str_replace(['"', '<', '>'], '', $name));
$headers  = implode("\r\n", [
  'From: Dunn Creative Website <' . FROM_EMAIL . '>',
  'Reply-To: ' . mb_encode_mimeheader($safeName, 'UTF-8') . ' <' . $email . '>',
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: 8bit',
  'X-Mailer: dunncreative-forms',
]);

$sent = mail(
  TO_EMAIL,
  mb_encode_mimeheader($subject, 'UTF-8'),
  $body,
  $headers,
  '-f' . FROM_EMAIL
);

if (!$sent) {
  reply(500, false, 'The server could not send the email.');
}
reply(200, true, 'Sent.');
