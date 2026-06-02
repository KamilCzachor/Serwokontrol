<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  echo json_encode([
    "success" => false,
    "message" => "Nieprawidłowa metoda wysyłki."
  ]);
  exit;
}

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$phone = trim($_POST["phone"] ?? "");
$message = trim($_POST["message"] ?? "");
$company = trim($_POST["company"] ?? "");
$website = trim($_POST["website"] ?? "");

/*
  Honeypot antyspamowy.
  Pole "website" jest ukryte w formularzu. Użytkownik go nie wypełnia,
  ale boty często wpisują tam treść. W takim przypadku udajemy sukces,
  żeby nie podpowiadać botowi, że został wykryty.
*/
if ($website !== "") {
  echo json_encode([
    "success" => true,
    "message" => "Wiadomość została wysłana. Dziękujemy za kontakt."
  ]);
  exit;
}

$name = str_replace(["\r", "\n"], " ", $name);
$email = str_replace(["\r", "\n"], " ", $email);
$phone = str_replace(["\r", "\n"], " ", $phone);
$company = str_replace(["\r", "\n"], " ", $company);

if ($name === "" || $email === "" || $message === "") {
  echo json_encode([
    "success" => false,
    "message" => "Uzupełnij wymagane pola: imię i nazwisko, e-mail oraz wiadomość."
  ]);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo json_encode([
    "success" => false,
    "message" => "Podaj poprawny adres e-mail."
  ]);
  exit;
}

function text_length($value) {
  return function_exists("mb_strlen") ? mb_strlen($value, "UTF-8") : strlen($value);
}

if (text_length($name) > 120) {
  echo json_encode([
    "success" => false,
    "message" => "Pole imię i nazwisko jest zbyt długie."
  ]);
  exit;
}

if (text_length($company) > 160) {
  echo json_encode([
    "success" => false,
    "message" => "Pole firma jest zbyt długie."
  ]);
  exit;
}

if (text_length($phone) > 40) {
  echo json_encode([
    "success" => false,
    "message" => "Pole telefon jest zbyt długie."
  ]);
  exit;
}

$messageLength = text_length($message);

if ($messageLength < 5) {
  echo json_encode([
    "success" => false,
    "message" => "Wiadomość jest zbyt krótka."
  ]);
  exit;
}

if ($messageLength > 5000) {
  echo json_encode([
    "success" => false,
    "message" => "Wiadomość jest zbyt długa. Skróć ją i spróbuj ponownie."
  ]);
  exit;
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

$replyToName = addslashes($name);

$headers = "From: Serwokontrol <" . $from . ">\r\n";
$headers .= "Reply-To: \"" . $replyToName . "\" <" . $email . ">\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$sent = mail($to, $subject, $emailBody, $headers);

if ($sent) {
  echo json_encode([
    "success" => true,
    "message" => "Wiadomość została wysłana. Dziękujemy za kontakt."
  ]);
  exit;
}

error_log("Serwokontrol contact form: mail() failed for " . $email);

echo json_encode([
  "success" => false,
  "message" => "Nie udało się wysłać wiadomości. Spróbuj ponownie później lub skontaktuj się telefonicznie."
]);
exit;
