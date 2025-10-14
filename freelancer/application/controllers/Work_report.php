<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Work_report extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
	}
	public function index()
	{
		//
		if($this->input->post('send')!=NULL || !empty($this->input->post('send')))
		{
			//echo '<pre>'; print_r($_POST); exit;
			//$this->form_validation->set_rules('clientId', 'Client Name', 'required|trim|is_unique[reminder_frequence.clientId]',array('is_unique' => 'This Client is already exist.'));
				$tbl_value=array('date'=>strtotime(str_replace('/','-',$this->input->post('date'))),
					'employee'=>$this->input->post('employee'),					
					'project'=>$this->input->post('project'),					
					'descreption'=>$this->input->post('descreption'),					
					'from'=>$this->input->post('from'),					
					'to'=>$this->input->post('to'),					
					'total_hours'=>$this->input->post('total_hours'),					
					'status'=>$this->input->post('status'),					
					'created'=>time());
				
				//echo "<pre>";print_r($tbl_value);;echo "</pre>";
				//exit;
				$insId=$this->UDM->insert('work_report',$tbl_value);
				//$insId='';
				if($insId!='')
				{
					$this->session->set_userdata('true_message','Saved');
					redirect('work_report/');
				}
				else
				{
					$this->session->set_userdata('false_message','Please Try Again.');
					redirect('work_report/');
				}
		}//exit;
		
		$where=array('emp_type'=>'1');
		$data['employee']=$this->UDM->select_where_multi('*','employee',$where,'id','desc');
		$data['project']=$this->UDM->select('*','tbl_project','fld_id','desc');
		//$data['result']=$this->UDM->select('*','work_report','fld_id','desc');
		$data['title']='Work Report';
		$this->load->view('work_report/index',$data);
	}	
}
?>