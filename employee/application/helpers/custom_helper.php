<?php
defined('BASEPATH') OR exit('No direct script access allowed');
if(!function_exists('get_val'))
{
	function get_val($get,$wr,$tbl)
	{
		$CI=get_instance();
		$CI->load->model('UDM');
		return $CI->UDM->get_val($get,$wr,$tbl);
	}
}
if(!function_exists('usertype'))
{
	function usertype($type='')
	{
		$CI=get_instance();
		if($type=='username')
		{
			return base64_decode(get_val('fld_name',array('fld_id'=>$CI->session->userdata('nexs_zgaccounts_admin')),'tbl_users'));
		}
		else if($type=='name')
		{
			$eid=get_val('fld_ecode',array('fld_id'=>$CI->session->userdata('nexs_zgaccounts_admin')),'tbl_users');
			return get_val('name',array('id'=>$eid),'employee');	
		}
		else if($type=='type')
		{
			$type=get_val('fld_type',array('fld_id'=>$CI->session->userdata('nexs_zgaccounts_admin')),'tbl_users');
			return get_val('fld_name',array('fld_id'=>$type),'tbl_designation');	
		}
		else if($type=='typeid')
		{
			return get_val('fld_type',array('fld_id'=>$CI->session->userdata('nexs_zgaccounts_admin')),'tbl_users');
		}
		else
		{
			return $CI->session->userdata('nexs_zgaccounts_admin');
		}
		return $status[$type];
	}
}
if(!function_exists('status'))
{
	function status($id)
	{
		$status=array(''=>'','1'=>'<span class="badge-text badge-text-small success">Active</span>','0'=>'<span class="badge-text badge-text-small danger">In-Active</span>');
		return $status[$id];
	}
}
if(!function_exists('obcbtype'))
{
	function obcbtype($id)
	{
		$status=array(''=>'',"0"=>'Opening Balance',"1"=>'Closing Balance');
		return $status[$id];
	}
}
if(!function_exists('recover_password_mail'))
{
	function recover_password_mail($name,$email,$password,$type)
	{
		$data['name']=$name;
		$data['email']=$email;
		$data['password']=$password;
		$data['type']=$type;
		$CI=get_instance();
		$CI->load->library('phpmailer_lib');
        $mail = $CI->phpmailer_lib->load();
		$mail->Encoding="base64";
        $mail->isSMTP();
        $mail->Host     = "smtp.gmail.com";
        $mail->SMTPAuth = true;
        $mail->Username = 'muthu@nexusglobalsolutions.com';
        $mail->Password = 'nexuspassword';
        $mail->SMTPSecure = 'tls';
        $mail->Port     = 587;
        $mail->setFrom('no-reply@nexusglobalsolutions.com', get_val('fld_name',array('fld_id'=>'1'),'tbl_setting'));
        $mail->addAddress($email,base64_decode($name));
        $mail->Subject = 'Recover '.get_val('fld_name',array('fld_id'=>'1'),'tbl_setting').' Account Password';
        $mail->isHTML(true);
        $mailContent = $CI->load->view('email_password',$data,true);
        $mail->Body = $mailContent;
       	if(!$mail->send())
		{
            return '1';
        }
		else
		{
            return '2';
        }
	}
}
if(!function_exists('inr_currency_format'))
{
	function inr_currency_format($num)
	{
		$explrestunits = "" ;
      	if(strlen($num)>3)
		{
        	$lastthree = substr($num, strlen($num)-3, strlen($num));
        	$restunits = substr($num, 0, strlen($num)-3); // extracts the last three digits
          	$restunits = (strlen($restunits)%2 == 1)?"0".$restunits:$restunits; // explodes the remaining digits in 2's formats, adds a zero in the beginning to maintain the 2's grouping.
          	$expunit = str_split($restunits, 2);
          	for($i=0; $i<sizeof($expunit); $i++)
			{
            	// creates each of the 2's group and adds a comma to the end
              	if($i==0)
              	{
                	$explrestunits .= (int)$expunit[$i].","; // if is first value , convert into integer
              	}
				else
				{
                	$explrestunits .= $expunit[$i].",";
              	}
          	}
          	$thecash = $explrestunits.$lastthree;
      	}
		else
		{
        	$thecash = $num;
      	}
     	return $thecash;
	}
}
if(!function_exists('month_array'))
{
	function month_array($val)
	{
		$month=array(''=>'','00'=>'','01'=>'January','02'=>'February','03'=>'March','04'=>'April','05'=>'May','06'=>'June','07'=>'July','08'=>'August','09'=>'September','10'=>'October','11'=>'November','12'=>'December');
		return $month[$val];
	}
}
if(!function_exists('month_array_NTN'))
{
	function month_array_NTN($val)
	{
		$month=array(''=>'','jan'=>'1','feb'=>'2','mar'=>'3','apr'=>'4','may'=>'5','jun'=>'6','jul'=>'7','aug'=>'8','sep'=>'9','oct'=>'10','nov'=>'11','dec'=>'12');
		return $month[$val];
	}
}
if(!function_exists('account_deposit'))
{
	function account_deposit($val)
	{
		$array=array(''=>'','0'=>'Credit/Deposit','1'=>'Debit/Withdraw');
		return $array[$val];
	}
}
if(!function_exists('vendor_type'))
{
	function vendor_type($val)
	{
		$array=array(''=>'','0'=>'Pre-Production Vendor','1'=>'Post-Production Vendor');
		return $array[$val];
	}
}
if(!function_exists('travel_purpose'))
{
	function travel_purpose($val)
	{
		$array=array(''=>'','0'=>'Shoot or Event','1'=>'Company Purpose','2'=>'Client Purpose');
		return $array[$val];
	}
}
if(!function_exists('travel_particular'))
{
	function travel_particular($val)
	{
		$array=array(''=>'','0'=>'Travel','1'=>'Stay');
		return $array[$val];
	}
}
if(!function_exists('expense_type'))
{
	function expense_type($val)
	{
		$array=array(''=>'','0'=>'Taken Care by company','1'=>'Client Reimbursement','2'=>'Taken Care by client');
		return $array[$val];
	}
}
if(!function_exists('suspense_debit_status'))
{
	function suspense_debit_status($id)
	{
		$status=array(''=>'','0'=>'<span class="badge-text badge-text-small info">Debit</span>','1'=>'<span class="badge-text badge-text-small success">Credit</span>');
		return $status[$id];
	}
}
if(!function_exists('credit_entry_others'))
{
	function credit_entry_others($id)
	{
		$status=array(''=>'','1'=>'Client','2'=>'Creditor');
		return $status[$id];
	}
}
if(!function_exists('obcb_match'))
{
	function obcb_match($id)
	{
		$status=array(''=>'','0'=>'No','1'=>'Yes');
		return $status[$id];
	}
}
if(!function_exists('obcb_match_label'))
{
	function obcb_match_label($id)
	{
		$status=array(''=>'','0'=>'<span class="badge-text badge-text-small danger">Not-Matched</span>','1'=>'<span class="badge-text badge-text-small success">Matched</span>');
		return $status[$id];
	}
}
if(!function_exists('cheque_status'))
{
	function cheque_status($id)
	{
		$status=array(''=>'','0'=>'<span class="badge-text badge-text-small info">Pending</span>','1'=>'<span class="badge-text badge-text-small success">Approved</span>');
		return $status[$id];
	}
}
if(!function_exists('customer_detail_status'))
{
	function customer_detail_status($id)
	{
		$status=array(''=>'','0'=>'<span class="badge-text badge-text-small info">Pending</span>','1'=>'<span class="badge-text badge-text-small primary" style="background-color:#FFA500; border-color:#FFA500;">Re-Sent</span>','2'=>'<span class="badge-text badge-text-small success">Submitted</span>');
		return $status[$id];
	}
}
if(!function_exists('cheque_entryType'))
{
	function cheque_entryType($id)
	{
		$status=array(''=>'','1'=>'Cheque','2'=>'Bank Transfer');
		return $status[$id];
	}
}
if(!function_exists('employee_payments'))
{
	function employee_payments($id)
	{
		$status=array(''=>'','0'=>'Salary','1'=>'Incentive');
		return $status[$id];
	}
}
if(!function_exists('employee_advance'))
{
	function employee_advance($id)
	{
		$status=array(''=>'','0'=>'Next Month','1'=>'Terms');
		return $status[$id];
	}
}
if(!function_exists('payment_due_status'))
{
	function payment_due_status($id)
	{
		$status=array(''=>'','0'=>'<span class="badge-text badge-text-small danger">Over Due</span>','1'=>'<span class="badge-text badge-text-small info">Due</span>','2'=>'<span class="badge-text badge-text-small success">Paid</span>','3'=>'<span class="badge-text badge-text-small info">Partialy Paid</span>');
		return $status[$id];
	}
}
if(!function_exists('sadvance_status'))
{
	function sadvance_status($id)
	{
		$status=array(''=>'','0'=>'<span class="badge-text badge-text-small info">Un-Paid</span>','1'=>'<span class="badge-text badge-text-small success">Paid</span>');
		return $status[$id];
	}
}
if(!function_exists('dateDiffInDays'))
{
	function dateDiffInDays($fdate,$tdate)  
	{
		$diff=$fdate-$tdate;
		return abs(round($diff/86400)); 
	}
}
if(!function_exists('amount_in_words'))
{
	function amount_in_words($number)
	{
		$no = floor($number);
	   	$point = round($number - $no, 2) * 100;
	   	$hundred = null;
	   	$digits_1 = strlen($no);
	   	$i = 0;
	   	$str = array();
	   	$words = array('0'=>'','1'=>'one','2'=>'two','3'=>'three','4'=>'four','5'=>'five','6'=>'six','7'=>'seven','8'=>'eight','9'=>'nine','10'=>'ten','11'=>'eleven','12'=>'twelve','13'=>'thirteen','14'=>'fourteen','15'=>'fifteen','16'=>'sixteen','17'=>'seventeen','18'=>'eighteen','19'=>'nineteen','20'=>'twenty','21'=>'twenty one','22'=>'twenty two','23'=>'twenty three','24'=>'twenty four','25'=>'twenty five','26'=>'twenty six','27'=>'twenty seven','28'=>'twenty eight','29'=>'twenty nine','30'=>'thirty','31'=>'thirty one','32'=>'thirty two','33'=>'thirty three','34'=>'thirty four','35'=>'thirty five','36'=>'thirty six','37'=>'thirty seven','38'=>'thirty eight','39'=>'thirty nine','40'=>'forty','41'=>'forty one','42'=>'forty two','43'=>'forty three','44'=>'forty four','45'=>'forty five','46'=>'forty six','47'=>'forty seven','48'=>'forty eight','49'=>'forty nine','50'=>'fifty','51'=>'fifty one','52'=>'fifty two','53'=>'fifty three','54'=>'fifty four','55'=>'fifty five','56'=>'fifty six','57'=>'fifty seven','58'=>'fifty eight','59'=>'fifty nine','60'=>'sixty','61'=>'sixty one','62'=>'sixty two','63'=>'sixty three','64'=>'sixty four','65'=>'sixty five','66'=>'sixty six','67'=>'sixty seven','68'=>'sixty eight','69'=>'sixty nine','70'=>'seventy','71'=>'seventy one','72'=>'seventy two','73'=>'seventy three','74'=>'seventy four','75'=>'seventy five','76'=>'seventy six','77'=>'seventy seven','78'=>'seventy eight','79'=>'seventy nine','80'=>'eighty','81'=>'eighty one','82'=>'eighty two','83'=>'eighty three','84'=>'eighty four','85'=>'eighty five','86'=>'eighty six','87'=>'eighty seven','88'=>'eighty eight','89'=>'eighty nine','90'=>'ninety','91'=>'ninety one','92'=>'ninety two','93'=>'ninety three','94'=>'ninety four','95'=>'ninety five','96'=>'ninety six','97'=>'ninety seven','98'=>'ninety eight','99'=>'ninety nine');
	   	$digits = array('', 'hundred', 'thousand', 'lakh', 'crore');
	   	while ($i < $digits_1) {
			$divider = ($i == 2) ? 10 : 100;
		 	$number = floor($no % $divider);
		 	$no = floor($no / $divider);
		 	$i += ($divider == 10) ? 1 : 2;
		 	if ($number) {
				$plural = (($counter = count($str)) && $number > 9) ? 's' : null;
				$hundred = ($counter == 1 && $str[0]) ? ' and ' : null;
				$str [] = ($number < 21) ? $words[$number] .
					" " . $digits[$counter] . $plural . " " . $hundred
					:
					$words[floor($number / 10) * 10]
					. " " . $words[$number % 10] . " "
					. $digits[$counter] . $plural . " " . $hundred;

		 	} else $str[] = null;
	  	}
	  	$str = array_reverse($str);
	  	$result = implode('', $str);
		if($point!='')
		{
	  		$points = ($point) ?
			$words[$point] : '';
	  		return $result . " and " . $points . " paise";
		}
		else
		{
			return $result. ' only';
		}
	}
}
if(!function_exists('getRandomCodeNumeric'))
{
	function getRandomCodeNumeric($length = 4)
	{
		$characters='0123456789';
		$string='';
		for($i=0;$i<$length;$i++) {
			$string.=$characters[mt_rand(0,strlen($characters)-1)];
		}
		return $string;
	}
}
if(!function_exists('send_sms'))
{
	function send_sms($mob,$msg)
	{
		//$api_url='http://bhashsms.com/api/sendmsg.php?user=ZGFOTO&pass=654321&sender=ZGFOTO&phone='.$mob.'&text='.urlencode($msg).'&priority=ndnd&stype=normal';
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $api_url);
		curl_setopt($ch, CURLOPT_FAILONERROR, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ch, CURLOPT_MAXREDIRS,5);
		curl_exec($ch);
		if (curl_error($ch)) {
			$error_msg = curl_error($ch);
		}
		curl_close($ch);
	}
}
if(!function_exists('send_email'))
{
	function send_email($name,$subject,$email,$msg)
	{
		//$branch=select('branch','email_settings')
		$CI=get_instance();
		$CI->load->library('phpmailer_lib');
        $mail = $CI->phpmailer_lib->load();
		$mail->Encoding="base64";
        $mail->isSMTP();
        $mail->Host     = "smtp.gmail.com";
        $mail->SMTPAuth = true;
        $mail->Username = 'Sales.cbe@zerogravityphotography.in';
        $mail->Password = 'ZG@jvk1425';
        $mail->SMTPSecure = 'tls';
        $mail->Port     = 587;
        $mail->setFrom('sales.cbe@zerogravityphotography.in', get_val('fld_name',array('fld_id'=>'1'),'tbl_setting'));
        $mail->addAddress($email,$name);
        $mail->Subject = $subject;
        $mail->isHTML(true);
        $mail->Body = $msg;
       //	$mail->send();
       	/*/if(!$mail->send()) 
		{
		    return "Mailer Error: " . $mail->ErrorInfo;
		} 
		else 
		{
		    return "Message has been sent successfully";
		}*/
	}
}
if(!function_exists('send_email_un'))
{
	function send_email_un($name,$subject,$email,$msg,$branchid)
	{
		$branchName=get_val('fld_name',array('fld_id'=>$branchid),'tbl_branch');
		$branchEmail=get_val('fld_email',array('fld_id'=>$branchid),'tbl_branch');
		$companyId=get_val('company',array('fld_id'=>$branchid),'tbl_branch');
		$companyName=get_val('fld_name',array('fld_id'=>$companyId),'tbl_company');		
		$branchUser=base64_decode(get_val('email',array('branch'=>$branchid),'email_settings'));
		$branchPassword=base64_decode(get_val('password',array('branch'=>$branchid),'email_settings'));
		$CI=get_instance();
		$CI->load->library('phpmailer_lib');
        $mail = $CI->phpmailer_lib->load();
		$mail->Encoding="base64";
		$mail->isSMTP();
        $mail->Host     = "smtp.gmail.com";
        $mail->SMTPAuth = true;
        $mail->Username = $branchUser;
        $mail->Password = $branchPassword;
        $mail->SMTPSecure = 'tls';
        $mail->Port     = 587;
        $mail->setFrom($branchEmail, $branchName.' - '.$companyName);
		$mail->addAddress($email,$name);
		$mail->addReplyTo($branchEmail, $branchName.' - '.$companyName);
		$mail->isHTML(true);
		$mail->Subject = $subject;
		$mail->Body = $msg;
		//$mail->send();
		/*if(!$mail->send()) 
		{
		    return "Mailer Error: " . $mail->ErrorInfo;
		} 
		else 
		{
		    return "Message has been sent successfully";
		}*/
	}
}
if(!function_exists('send_mail_temp'))
{
	function send_mail_temp($name,$email,$title,$mailbody,$list='')
	{
		$data['user_name']=$name;
		$data['email_title']=$title;
		$data['mailbody']=$mailbody;
		$data['list']=$list;
		$CI=get_instance();
		$CI->load->library('phpmailer_lib');
        $mail = $CI->phpmailer_lib->load();
		$mail->Encoding="base64";
        $mail->isSMTP();
        $mail->Host     = "smtp.gmail.com";
        $mail->SMTPAuth = true;
        $mail->Username = 'info@zerogravity.photography';
        $mail->Password = 'Zerogr@v!ty#123';
        $mail->SMTPSecure = 'tls';
        $mail->Port     = 587;
        $mail->setFrom('info@zerogravity.photography', 'Zero Gravity Photography');
        $mail->addAddress($email,$name);
        $mail->Subject = $title;
        $mail->isHTML(true);
		$mailContent = $CI->load->view('email_template/order_mail',$data,true);
		$mail->Body = $mailContent;
       /* if(!$mail->send())
		{
            return '1';
        }
		else
		{
            return '2';
        }*/
	}
}
if(!function_exists('send_mail_client_ledger'))
{
	function send_mail_client_ledger($name,$email,$title,$mailbody,$href,$company,$branchid)
	{
		$branchName=get_val('fld_name',array('fld_id'=>$branchid),'tbl_branch');
		$branchEmail=get_val('fld_email',array('fld_id'=>$branchid),'tbl_branch');
		$companyId=get_val('company',array('fld_id'=>$branchid),'tbl_branch');
		$companyName=get_val('fld_name',array('fld_id'=>$companyId),'tbl_company');		
		$branchUser=base64_decode(get_val('email',array('branch'=>$branchid),'email_settings'));
		$branchPassword=base64_decode(get_val('password',array('branch'=>$branchid),'email_settings'));
		$data['user_name']=$name;
		$data['email_title']=$title;
		$data['mailbody']=$mailbody;
		$data['href']=$href;
		$data['company']=$company;
		$CI=get_instance();
		$CI->load->library('phpmailer_lib');
        $mail = $CI->phpmailer_lib->load();
		$mail->Encoding="base64";
        $mail->isSMTP();
        $mail->Host     = "smtp.gmail.com";
        $mail->SMTPAuth = true;
        $mail->Username = $branchUser;
        $mail->Password = $branchPassword;
        $mail->SMTPSecure = 'tls';
        $mail->Port     = 587;
        $mail->setFrom($branchEmail, $branchName.' - '.$companyName);
		$mail->addAddress($email,$name);
		$mail->addReplyTo($branchEmail, $branchName.' - '.$companyName);
        $mail->Subject = $title;
        $mail->isHTML(true);
		$mailContent = $CI->load->view('email_template/order_mail_client_ledger',$data,true);
		$mail->Body = $mailContent;
        /*if(!$mail->send())
		{
            return '1';
        }
		else
		{
            return '2';
        }*/
	}
}
?>