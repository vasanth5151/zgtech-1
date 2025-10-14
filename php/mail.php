<?php
include 'db.php';
$smtp_email_address='';
$smtp_email_address_password='';
$sql = "SELECT * FROM email_settings WHERE id='1'";
$result = $conn->query($sql);
while($row = $result->fetch_assoc())
{
    $smtp_email_address=base64_decode($row["email"]);
    $smtp_email_address_password=base64_decode($row["password"]);
}
?>