<?php
include 'mail.php';
//error_reporting(-1);
//ini_set('display_errors', 1);
use PHPMailer\PHPMailer\PHPMailer;
require_once 'phpmailer/Exception.php';
require_once 'phpmailer/PHPMailer.php';
require_once 'phpmailer/SMTP.php';
//$alert = '';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $phone = $_POST['mobile'];
    $email = $_POST['email'];
    $purpose=$_POST['purpose'];
    $comments=$_POST['comments'];
    $time=time();

     //echo $name.$phone.$email.$purpose.$comments;exit;
    
        // Check connection
        /*if ($conn->connect_error) {
          die("Connection failed: " . $conn->connect_error);
        }*/

        $sql = "INSERT INTO tbl_contact (name,mobile,email,purpose,comments,created)
              VALUES ('".$name."','".$phone."','".$email."','".$purpose."','".$comments."','".$time."')";
        //echo $sql; exit;
        $conn->query($sql);
        /*if ($conn->query($sql) === TRUE) {
          echo "New record created successfully";
        } else {
          echo "Error: " . $sql . "<br>" . $conn->error;
        }*/
        $conn->close();
    try {
        $mail = new PHPMailer(true);
        $mail->IsSMTP();
        $mail->CharSet = 'UTF-8';
        $mail->Host       = "smtp.gmail.com"; // SMTP server example
        //$mail->SMTPDebug  = 2;                     // enables SMTP debug information (for testing)
        $mail->SMTPAuth   = true;                  // enable SMTP authentication
        $mail->SMTPSecure = 'tls';
        $mail->Port     = 587;                  // set the SMTP port for the GMAIL server
        $mail->Username = $smtp_email_address;
        $mail->Password = $smtp_email_address_password;        // SMTP account password example
        $mail->isHTML(true);
        $mail->setFrom($email, $name);
        $mail->addReplyTo($email, $name);
        $mail->addAddress($smtp_email_address);
	//$mail->addReplyTo('', '');
	//$mail->addCC('');
        $mail->Subject = 'Lead From - Zero Gravity Technologies';
        $mail->Body = '<table><tr class="color-white">
                <th class="text-center">Name</th>
                <td class="text-center">'.$name.'</td>
              </tr>  
              <tr class="color-white">
                <th class="text-center">Mobile</th>
                <td class="text-center">'.$phone.'</td>
              </tr>  
              <tr class="color-white">
                <th class="text-center">Email</th>
                <td class="text-center">'.$email.'</td>
              </tr>  
              <tr class="color-white">
                <th class="text-center">Purpose</th>
                <td class="text-center">'.$purpose.'</td>
              </tr>  
              <tr class="color-white">
                <th class="text-center">Comments</th>
                <td class="text-center">'.$comments.'</td>
              </tr>  </table>';
        //$mail->Body = 'test';
        if($mail->send()){
            $alert = '<div class="alert-success"><span>Message Sent! Thank you for contacting us.</span></div>';
        }
        else {
            $alert = '<div class="alert-error"><span>Mail Not Send.</span></div>';
        }
    } catch (Exception $e) {
        $alert = '<div class="alert-error"><span>' . $e->getMessage() . '</span></div>';
    }
	echo $alert;
}
else{
	$redirect_page='../contact.html';
echo '<script type="text/javascript">window.location = "'.$redirect_page.'";</script>';
}
?>