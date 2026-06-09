<?php
header("Content-Type: application/json; charset=UTF-8");
header("X-Content-Type-Options: nosniff");
header("Referrer-Policy: strict-origin-when-cross-origin");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");

function json_response($success, $message, $status_code = 200) {
  http_response_code($status_code);
  echo json_encode([
    "success" => $success,
    "message" => $message
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

function text_length($value) {
  return function_exists("mb_strlen") ? mb_strlen($value, "UTF-8") : strlen($value);
}

function clean_header_value($value) {
  return trim(str_replace(["\r", "\n"], " ", $value));
}

function clean_mail_body_value($value, $max_length = 300) {
  $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', (string) $value);
  $value = trim($value);

  if (function_exists("mb_substr")) {
    return mb_substr($value, 0, $max_length, "UTF-8");
  }

  return substr($value, 0, $max_length);
}

function get_client_ip() {
  $ip = $_SERVER["REMOTE_ADDR"] ?? "unknown";
  return preg_replace('/[^0-9a-fA-F:.]/', '', $ip) ?: "unknown";
}

function check_rate_limit($limit = 5, $window_seconds = 900) {
  $ip = get_client_ip();
  $file = sys_get_temp_dir() . "/serwokontrol-contact-" . hash("sha256", $ip) . ".json";
  $now = time();
  $attempts = [];

  if (is_readable($file)) {
    $decoded = json_decode((string) file_get_contents($file), true);
    if (is_array($decoded)) {
      $attempts = $decoded;
    }
  }

  $attempts = array_values(array_filter($attempts, function ($timestamp) use ($now, $window_seconds) {
    return is_int($timestamp) && ($now - $timestamp) < $window_seconds;
  }));

  if (count($attempts) >= $limit) {
    json_response(false, "Wysłano zbyt wiele wiadomości w krótkim czasie. Spróbuj ponownie później.", 429);
  }

  $attempts[] = $now;
  @file_put_contents($file, json_encode($attempts), LOCK_EX);
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  json_response(false, "Nieprawidłowa metoda wysyłki.", 405);
}

check_rate_limit();

$name = clean_header_value($_POST["name"] ?? "");
$email = clean_header_value($_POST["email"] ?? "");
$phone = clean_header_value($_POST["phone"] ?? "");
$company = clean_header_value($_POST["company"] ?? "");
$message = trim($_POST["message"] ?? "");
$website = trim($_POST["website"] ?? "");
$formStartedAt = trim($_POST["form_started_at"] ?? "");
$privacy = trim($_POST["privacy"] ?? "");

/*
  Honeypot antyspamowy.
  Pole "website" jest ukryte w formularzu. Użytkownik go nie wypełnia,
  ale boty często wpisują tam treść. W takim przypadku udajemy sukces,
  żeby nie podpowiadać botowi, że został wykryty.
*/
if ($website !== "") {
  json_response(true, "Wiadomość została wysłana. Dziękujemy za kontakt.");
}

/*
  Prosta ochrona przed automatycznymi wysyłkami: formularz nie powinien zostać
  wysłany natychmiast po załadowaniu strony.
*/
if ($formStartedAt !== "" && ctype_digit($formStartedAt)) {
  $elapsedMs = (int) round(microtime(true) * 1000) - (int) $formStartedAt;
  if ($elapsedMs >= 0 && $elapsedMs < 2500) {
    json_response(true, "Wiadomość została wysłana. Dziękujemy za kontakt.");
  }
}

if ($privacy !== "1") {
  json_response(false, "Potwierdź zgodę na kontakt w odpowiedzi na zapytanie.", 422);
}

if ($name === "" || $email === "" || $message === "") {
  json_response(false, "Uzupełnij wymagane pola: imię i nazwisko, e-mail oraz wiadomość.", 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_response(false, "Podaj poprawny adres e-mail.", 422);
}

if ($phone !== "" && !preg_match('/^[0-9+()\s.-]{5,40}$/u', $phone)) {
  json_response(false, "Podaj poprawny numer telefonu albo zostaw pole puste.", 422);
}

if (text_length($name) > 120) {
  json_response(false, "Pole imię i nazwisko jest zbyt długie.", 422);
}

if (text_length($company) > 160) {
  json_response(false, "Pole firma jest zbyt długie.", 422);
}

if (text_length($phone) > 40) {
  json_response(false, "Pole telefon jest zbyt długie.", 422);
}

$messageLength = text_length($message);

if ($messageLength < 5) {
  json_response(false, "Wiadomość jest zbyt krótka.", 422);
}

if ($messageLength > 5000) {
  json_response(false, "Wiadomość jest zbyt długa. Skróć ją i spróbuj ponownie.", 422);
}

/*
  ADRES DOCELOWY — tutaj trafiają wiadomości z formularza.
*/
$to = "biuro@serwokontrol.pl";

/*
  ADRES NADAWCY — najlepiej adres z tej samej domeny co strona.
  Nie ustawiamy From jako adres klienta, bo wiadomość może trafić do spamu.
  Adres klienta ustawiamy jako Reply-To.
*/
$from = "formularz@serwokontrol.pl";

$subject = "Nowa wiadomość z formularza kontaktowego - Serwokontrol";

$emailBody = "Nowa wiadomość z formularza kontaktowego:\n\n";
$emailBody .= "Imię i nazwisko: " . $name . "\n";
$emailBody .= "Firma: " . ($company !== "" ? $company : "Nie podano") . "\n";
$emailBody .= "E-mail: " . $email . "\n";
$emailBody .= "Telefon: " . ($phone !== "" ? $phone : "Nie podano") . "\n\n";
$emailBody .= "Wiadomość:\n";
$emailBody .= $message . "\n";
$emailBody .= "\n---\n";
$emailBody .= "Data wysyłki: " . date("Y-m-d H:i:s") . "\n";
$emailBody .= "IP: " . get_client_ip() . "\n";
$emailBody .= "User-Agent: " . clean_mail_body_value($_SERVER["HTTP_USER_AGENT"] ?? "Nieznany") . "\n";

$replyToName = addcslashes($name, "\\\"");

$headers = "From: Serwokontrol <" . $from . ">\r\n";
$headers .= "Reply-To: \"" . $replyToName . "\" <" . $email . ">\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$sent = mail($to, $subject, $emailBody, $headers);

if ($sent) {
  json_response(true, "Wiadomość została wysłana. Dziękujemy za kontakt.");
}

error_log("Serwokontrol contact form: mail() failed for " . $email);

json_response(false, "Nie udało się wysłać wiadomości. Spróbuj ponownie później lub skontaktuj się telefonicznie.", 500);
