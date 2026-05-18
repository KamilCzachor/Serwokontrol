<?php
header("Content-Type: application/json; charset=UTF-8");

/*
  PRODUKCYJNA WERSJA send-mail.php

  Ten plik odbiera dane z formularza kontaktowego
  i wysyła wiadomość na adres firmowy.
*/

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

/*
  Zabezpieczenie pól jednowierszowych.
  Wiadomości nie czyścimy z nowych linii, bo użytkownik może pisać dłuższy tekst.
*/
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

$messageLength = function_exists("mb_strlen")
  ? mb_strlen($message, "UTF-8")
  : strlen($message);

if ($messageLength < 5) {
  echo json_encode([
    "success" => false,
    "message" => "Wiadomość jest zbyt krótka."
  ]);
  exit;
}

/*
  ADRES DOCELOWY — tutaj wpisz adres, na który mają przychodzić wiadomości.
*/
$to = "adres@email.com";

/*
  ADRES NADAWCY — najlepiej adres z tej samej domeny co strona.
  Przykład:
  formularz@serwokontrol.pl

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

$headers = "From: Serwokontrol <" . $from . ">\r\n";
$headers .= "Reply-To: " . $name . " <" . $email . ">\r\n";
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

echo json_encode([
  "success" => false,
  "message" => "Nie udało się wysłać wiadomości. Spróbuj ponownie później lub skontaktuj się telefonicznie."
]);
exit;