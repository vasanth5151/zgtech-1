<?php
include 'mail.php';
use PHPMailer\PHPMailer\PHPMailer;
require_once 'phpmailer/Exception.php';
require_once 'phpmailer/PHPMailer.php';
require_once 'phpmailer/SMTP.php';
$redirect_page='../careers.html';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
   
    $target_dir ='../admin/uploads/career/resume/'.time().'/';

    if(!is_dir($target_dir)){
        mkdir($target_dir, 0777, TRUE);
    }
    $file_name = $_FILES['resume']['name'];
    $file_size = $_FILES['resume']['size'];
    $file_tmp = $_FILES['resume']['tmp_name'];
    $file_type = $_FILES['resume']['type'];
    //$file_ext=strtolower(end(explode('.',$_FILES['resume']['name'])));
    move_uploaded_file($file_tmp,$target_dir.$file_name);
    $insert_file=str_replace ('../admin/','',$target_dir.$file_name);
    $first = $_POST['first'];
    $last = $_POST['last'];
    $phone = $_POST['phone'];
    $email = $_POST['mail'];
    $gender = $_POST['gender'];
    $dob = str_replace('/','-',$_POST['dob']);
    $experience = $_POST['experience'];
    $qualification = $_POST['qualification'];
    $previous_employer = $_POST['previous_employer'];
    $current_ctc = $_POST['current_ctc'];
    $expected_ctc = $_POST['expected_ctc'];
    $specialization = $_POST['specialization'];
    $skill = $_POST['skill'];
    $time=time();
    //insert form data
    $sql = "INSERT INTO tbl_career (first, last, phone,mail,gender,dob,experience,qualification,previous_employer,current_ctc,expected_ctc,specialization,skill,resume,created)
          VALUES ('".$first."','".$last."','".$phone."','".$email."','".$gender."','".$dob."','".$experience."','".$qualification."','".$previous_employer."','".$current_ctc."','".$expected_ctc."','".$specialization."','".$skill."','".$insert_file."','".$time."')";
    //echo $sql;
    $conn->query($sql);
    
    try {
        $mail = new PHPMailer(true);
        $mail->IsSMTP();
        $mail->CharSet = 'UTF-8';
        $mail->Host       = "smtp.gmail.com";; // SMTP server example
        //$mail->SMTPDebug  = 2;                     // enables SMTP debug information (for testing)
        $mail->SMTPAuth   = true;                  // enable SMTP authentication
        $mail->SMTPSecure = 'tls';
        $mail->Port     = 587;                  // set the SMTP port for the GMAIL server
        $mail->Username = $smtp_email_address;
        $mail->Password = $smtp_email_address_password;
        $mail->isHTML(true);
        $mail->setFrom($smtp_email_address);
        //$mail->addReplyTo($email, $name);
        $mail->addAddress($smtp_email_address);
        $mail->addReplyTo($email, $first);
        $mail->addAttachment($target_dir.$file_name,'resume');
        //$mail->addCC('sangavikumar213@gmail.com');
    $mail->Subject = 'Career';
    $mail->Body = '<table><tr class="color-white">
    <th class="text-center">First Name</th>
    <td class="text-center">'.$first.'</td>
    </tr>  
    <tr class="color-white">
    <th class="text-center">Last Name</th>
    <td class="text-center">'.$last.'</td>
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
    <th class="text-center">Gender</th>
    <td class="text-center">'.$gender.'</td>
    </tr>
    <tr class="color-white">
    <th class="text-center">DOB</th>
    <td class="text-center">'.$dob.'</td>
    </tr>
    <tr class="color-white">
    <th class="text-center">Experience</th>
    <td class="text-center">'.$experience.'</td>
    </tr>
    <tr class="color-white">
    <th class="text-center">Qualification</th>
    <td class="text-center">'.$qualification.'</td>
    </tr>
    <tr class="color-white">
    <th class="text-center">Previous Employer</th>
    <td class="text-center">'.$previous_employer.'</td>
    </tr>
    <tr class="color-white">
    <th class="text-center">Current CTC</th>
    <td class="text-center">'.$current_ctc.'</td>
    </tr>
    <tr class="color-white">
    <th class="text-center">Expected CTC</th>
    <td class="text-center">'.$expected_ctc.'</td>
    </tr>
    <tr class="color-white">
    <th class="text-center">Specialization</th>
    <td class="text-center">'.$specialization.'</td>
    </tr>
    <tr class="color-white">
    <th class="text-center">Key Skill</th>
    <td class="text-center">'.$skill.'</td>
    </tr>
    </table>';
    if($mail->send()){
     //$alert = '<div class="alert-success"><span>Message Sent! Thank you for contacting us.</span></div>';
     $redirect_page='../careers.html?sucess=true';
    }
    else {
      //$alert = '<div class="alert-error"><span>Mail Not Send.</span></div>';
      $redirect_page='../careers.html?sucess=false';
    }
  } catch (Exception $e) {
    //$alert = '<div class="alert-error"><span>' . $e->getMessage() . '</span></div>';
    $redirect_page='../careers.html?sucess=false';
  }    
}
echo '<script type="text/javascript">window.location = "'.$redirect_page.'";</script>';
?>


