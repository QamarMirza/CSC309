<?php

class Combat extends CI_Controller {
     
    function __construct() {
    		// Call the Controller constructor
	    	parent::__construct();
	    	session_start();
    }
        
    public function _remap($method, $params = array()) {
	    	// enforce access control to protected functions	
    		
    		if (!isset($_SESSION['user']))
   			redirect('account/loginForm', 'refresh'); //Then we redirect to the index page again
 	    	
	    	return call_user_func_array(array($this, $method), $params);
    }
    
    
    function index() {
		$user = $_SESSION['user'];
    		    	
    	$this->load->model('user_model');
    	$this->load->model('invite_model');
    	$this->load->model('battle_model');
    	
    	$user = $this->user_model->get($user->login);

    	$invite = $this->invite_model->get($user->invite_id);
    	
    	if ($user->user_status_id == User::WAITING) {
    		$invite = $this->invite_model->get($user->invite_id);
    		$otherUser = $this->user_model->getFromId($invite->user2_id);
    	}
    	else if ($user->user_status_id == User::BATTLING) {
    		$battle = $this->battle_model->get($user->battle_id);
    		if ($battle->user1_id == $user->id)
    			$otherUser = $this->user_model->getFromId($battle->user2_id);
    		else
    			$otherUser = $this->user_model->getFromId($battle->user1_id);
    	}
    	
    	$data['user']=$user;
    	$data['otherUser']=$otherUser;
    	
    	switch($user->user_status_id) {
    		case User::BATTLING:	
    			$data['status'] = 'battling';
    			break;
    		case User::WAITING:
    			$data['status'] = 'waiting';
    			break;
    	}
    	
		$this->load->view('battle/realbattleField',$data);
    }

 	function postMsg() {
 		$this->load->library('form_validation');
 		$this->form_validation->set_rules('msg', 'Message', 'required');
 		
 		if ($this->form_validation->run() == TRUE) {
 			$this->load->model('user_model');
 			$this->load->model('battle_model');

 			$user = $_SESSION['user'];
 			 
 			$user = $this->user_model->getExclusive($user->login);
 			if ($user->user_status_id != User::BATTLING) {	
				$errormsg="Not in BATTLING state";
 				goto error;
 			}
 			
 			$battle = $this->battle_model->get($user->battle_id);			
 			
 			$msg = $this->input->post('msg');
 			
 			if ($battle->user1_id == $user->id)  {
 				$msg = $battle->u1_msg == ''? $msg :  $battle->u1_msg . "\n" . $msg;
 				$this->battle_model->updateMsgU1($battle->id, $msg);
 			}
 			else {
 				$msg = $battle->u2_msg == ''? $msg :  $battle->u2_msg . "\n" . $msg;
 				$this->battle_model->updateMsgU2($battle->id, $msg);
 			}
 				
 			echo json_encode(array('status'=>'success'));
 			 
 			return;
 		}
		
 		$errormsg="Missing argument";
 		
		error:
			echo json_encode(array('status'=>'failure','message'=>$errormsg));
 	}
 
	function getMsg() {
 		$this->load->model('user_model');
 		$this->load->model('battle_model');
 			
 		$user = $_SESSION['user'];
 		 
 		$user = $this->user_model->get($user->login);
 		if ($user->user_status_id != User::BATTLING) {	
 			$errormsg="Not in BATTLING state";
 			goto error;
 		}
 		// start transactional mode
 		$this->db->trans_begin();
 			
 		$battle = $this->battle_model->getExclusive($user->battle_id);			
 			
 		if ($battle->user1_id == $user->id) {
			$msg = $battle->u2_msg;
 			$this->battle_model->updateMsgU2($battle->id,"");
 		}
 		else {
 			$msg = $battle->u1_msg;
 			$this->battle_model->updateMsgU1($battle->id,"");
 		}

 		if ($this->db->trans_status() === FALSE) {
 			$errormsg = "Transaction error";
 			goto transactionerror;
 		}
 		
 		// if all went well commit changes
 		$this->db->trans_commit();

 		// send back the data
 		echo json_encode(array('status'=>'success','message'=>$msg));
		return;
		
		transactionerror:
		    $this->db->trans_rollback();
		
		error:
		    echo json_encode(array('status'=>'failure','message'=>$errormsg));
 	}

 	function postCoordinates() {
 		$this->load->model('user_model');
		$this->load->model('battle_model');

		$user = $_SESSION['user'];
 			 
		$user = $this->user_model->getExclusive($user->login);
		if ($user->user_status_id != User::BATTLING) {	
			$errormsg="Not in BATTLING state";
			goto error;
		}
		
		$battle = $this->battle_model->get($user->battle_id);			

        // get fields
        $x1 = intval($this->input->post('x1'));
        $y1 = intval($this->input->post('y1'));
        $x2 = intval($this->input->post('x2'));
        $y2 = intval($this->input->post('y2'));
        $angle = intval($this->input->post('angle'));
        $shot = $this->input->post('shot');
        $hit = intval($this->input->post('hit'));
        $win = 0;
		if ($battle->user1_id == $user->id) {
		    // update user1 coordinates
			$this->battle_model->updateU1($battle->id, $x1, $y1, $x2, $y2, $angle, $shot, $hit);
            if ($hit == 1) {
                $this->battle_model->updateStatus($battle->id, 2);
            }
		}
		else {
		    // update user2 coordinates
            $this->battle_model->updateU2($battle->id, $x1, $y1, $x2, $y2, $angle, $shot, $hit);
            if ($hit == 1) {
                $this->battle_model->updateStatus($battle->id, 3);
            }
		}

		echo json_encode(array('status'=>'success', 'win'=>$win));
		 
		return;
 		
		error:
			echo json_encode(array('status'=>'failure','message'=>$errormsg));
 	}

    function getCoordinates() {
 		$this->load->model('user_model');
 		$this->load->model('battle_model');
 			
 		$user = $_SESSION['user'];
 		 
 		$user = $this->user_model->get($user->login);
 		if ($user->user_status_id != User::BATTLING) {	
 			$errormsg="Not in BATTLING state";
 			goto error;
 		}
 		// start transactional mode
 		$this->db->trans_begin();
 			
 		$battle = $this->battle_model->getExclusive($user->battle_id);			
 			
 		if ($battle->user1_id == $user->id) {
			$x1 = $battle->u2_x1;
			$y1 = $battle->u2_y1;
			$x2 = $battle->u2_x2;
			$y2 = $battle->u2_y2;
	        $angle = $battle->u2_angle;
	        $shot = $battle->u2_shot;
	        $hit = $battle->u2_hit;
	
            
 			//$this->battle_model->updateU2($battle->id,"");
 		}
 		else {
			$x1 = $battle->u1_x1;
			$y1 = $battle->u1_y1;
			$x2 = $battle->u1_x2;
			$y2 = $battle->u1_y2;
	        $angle = $battle->u1_angle;
	        $shot = $battle->u1_shot;
	        $hit = $battle->u1_hit;

 			//$this->battle_model->updateU1($battle->id,"");
 		}

 		if ($this->db->trans_status() === FALSE) {
 			$errormsg = "Transaction error";
 			goto transactionerror;
 		}
 		
 		// if all went well commit changes
 		$this->db->trans_commit();
 		
 		echo json_encode(array('status'=>'success', 'x1'=>$x1,
 		                                            'y1'=>$y1,
 		                                            'x2'=>$x2,
 		                                            'y2'=>$y2,
 		                                            'angle'=>$angle,
 		                                            'shot'=>$shot,
 		                                            'hit'=>$hit));
		return;
		
		transactionerror:
		$this->db->trans_rollback();
		
		error:
		    echo json_encode(array('status'=>'failure','message'=>$errormsg));
 	}

 	function postBattleStatus() {
		$this->load->model('user_model');
		$this->load->model('battle_model');

		$user = $_SESSION['user'];
				 
		$user = $this->user_model->getExclusive($user->login);
		if ($user->user_status_id != User::BATTLING) {	
			$errormsg="Not in BATTLING state";
			goto error;
		}
		
		$battle = $this->battle_model->get($user->battle_id);			

		// get the fields
		$battle_status = $this->input->post('battle_status');
		
		$this->battle_model->updateStatus($battle->id, $battle_status);
				
		echo json_encode(array('status'=>'success'));
		 
		return;
			
		error:
			echo json_encode(array('status'=>'failure','message'=>$errormsg));
    }

 	function getBattleStatus(){
 		$this->load->model('user_model');
 		$this->load->model('battle_model');
 			
 		$user = $_SESSION['user'];
 		 
 		$user = $this->user_model->get($user->login);
 		if ($user->user_status_id != User::BATTLING) {	
 			$errormsg="Not in BATTLING state";
 			goto error;
 		}
 		// start transactional mode
 		$this->db->trans_begin();
 			
 		$battle = $this->battle_model->getExclusive($user->battle_id);			
 			
		$battle_status = $battle->battle_status_id;
		
 		if ($this->db->trans_status() === FALSE) {
 			$errormsg = "Transaction error";
 			goto transactionerror;
 		}
 		
 		// if all went well commit changes
 		$this->db->trans_commit();
 		
 		echo json_encode(array('status'=>'success', 'battle_status'=>$battle_status));
		return;
		
		transactionerror:
		$this->db->trans_rollback();
		
		error:
		echo json_encode(array('status'=>'failure','message'=>$errormsg));
 	}
}

