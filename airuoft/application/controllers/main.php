<?php

class Main extends CI_Controller {

	function __construct() {
		// Call the Controller constructor
		parent::__construct();

		session_start();
	}

	function index() {
		$data['main']='main/index';
		$this->load->view('template', $data);
	}
	
	function admin(){
		$data['main']='main/admin.php';
		$this->load->view('template', $data);
	}

	function showFlights() {
		//First we load the library and the model
		$this->load->library('table');
		$this->load->model('flight_model');
		//Then we call our model's get_flights function
		$flights = $this->flight_model->get_flights();
		//If it returns some results we continue
		if ($flights->num_rows() > 0){
			//Prepare the array that will contain the data
			$table = array();	
			$table[] = array('From','To','Time','Date','Available');
			foreach ($flights->result() as $row){
				//This time we are not only adding a new link, but, in the third parameter of the anchor function we are adding an onclick behaviour to ask the user if he/she really wants to delete the record.
				$table[] = array($row->from,$row->to,$row->time,$row->date,$row->available);
			}
			//Next step is to place our created array into a new array variable, one that we are sending to the view.
			$data['flights'] = $table; 		   
		}
		//Now we are prepared to call the view, passing all the necessary variables inside the $data array
		$data['main']='main/flights';
		$this->load->view('template', $data);
    }

    function allTickets(){
		$this->load->library('table');
		$this->load->model('flight_model');
		$this->load->model('ticket_model');
		$ticket = $this->ticket_model->get_ticket();
		//If it returns some results we continue
		if ($ticket->num_rows() > 0){
			//Prepare the array that will contain the data
			$table = array();	
			$table[] = array('Flight Date', 'Seat Number','First Name','Last Name','Credit Card Number','Credit Expiry');

			foreach ($ticket->result() as $row){
				$date = $this->ticket_model->get_date($row->flight_id);
				foreach($date->result() as $d) {
					$table[] = array($d->date, $row->seat, $row->first, $row->last, $row->creditcardnumber, $row->creditcardexpiration);
				}
			}
			
			//Next step is to place our created array into a new array variable, one that we are sending to the view.
			$data['flights'] = $table;
		}
		if (isset($_SESSION['errno'])){
			$data['errmsg'] = $_SESSION['errormsg'];
			$data['errno'] = $_SESSION['errno'];
			unset($_SESSION['errmsg']);
			unset($_SESSION['errno']);
		}

		//Now we are prepared to call the view, passing all the necessary variables inside the $data array
		$data['main']='main/flights';
		$this->load->view('template', $data);
	}

	function populate() {
		$this->load->model('flight_model');
		$this->flight_model->populate();
		
		//Then we redirect to the index page again
		$data['main']='main/admin';
		$this->load->view('template', $data);	}
	
	function delete() {
		$this->load->model('flight_model');    	 
		$this->flight_model->delete();
		 
		//Then we redirect to the index page again
		redirect('', 'refresh');  
	}
	
 	function deleteAll() {
		$this->load->model('flight_model');    	 
		$this->flight_model->deleteAll();
		 
		//Then we redirect to the index page again
		$data['main']='main/admin';
		$this->load->view('template', $data);
	}
 	function addFlight() {
		$data['main'] = 'main/addFlight'; // set the main view to addFlight.php
		$this->load->library('form_validation');
		$this->load->view('template', $data);
	}
/* ---------------------------------------------------------------------------------------- */
 
	function availableFlights(){
		$this->load->Library('table');
		$this->load->model('flight_model');
		
		// add validation to check if campus isset and have value?
		$campus = $_REQUEST['campus'];
		date_default_timezone_set("UTC");
		$date = $_REQUEST['date'];
		$_SESSION['date'] = $date;

		$flights = $this->flight_model->getAvailableFlights($date, $campus);
		if ($flights->num_rows() > 0){
			//Prepare the array that will contain the data
			$table = array();	
			$table[] = array('From','To','Time','Date','Available', '');
			foreach ($flights->result() as $row){
				//This time we are not only adding a new link, but, in the third parameter of the anchor function we are adding an onclick behaviour to ask the user if he/she really wants to delete the record.
				$table[] = array($row->from,$row->to,$row->time,$row->date,$row->available, anchor("main/seatSelect/$row->flightid", 'Check Seats'));
			}
			//Next step is to place our created array into a new array variable, one that we are sending to the view.
			$data['flights'] = $table;
		}

		if (isset($_SESSION['errno'])){
			$data['errmsg'] = $_SESSION['errormsg'];
			$data['errno'] = $_SESSION['errno'];
			unset($_SESSION['errmsg']);
			unset($_SESSION['errno']);
		}

		//Now we are prepared to call the view, passing all the necessary variables inside the $data array
		$data['main']='main/flights';
		$this->load->view('template', $data);
	}

	function seatSelect($flight_id) {
		$_SESSION['flight_id'] = $flight_id;
		$this->load->model('ticket_model');
		$seats = $this->ticket_model->availableSeats($flight_id);
		$unavailableSeats = array();
		if ($seats->num_rows() > 0) {
			foreach($seats->result() as $row) {
				echo $row->seat;
				$unavailableSeats[] = $row->seat;
			}
		}

		if (isset($_SESSION['errno'])){
			$data['errmsg'] = $_SESSION['errormsg'];
			$data['errno'] = $_SESSION['errno'];
			unset($_SESSION['errmsg']);
			unset($_SESSION['errno']);
		}

		$data['unavailableSeats'] = $unavailableSeats;
		$data['main'] = 'main/helicopter';
		$this->load->view('template', $data);
	}
	
	function ticketUser() {
		if ($seat = $this->input->get_post('seat')) {
			echo $seat;
			$_SESSION['seat'] = $seat;
		} else {
			echo "nooooooooooooooooooooooooooobody";
		}
		$data['main'] = 'main/ticketUser';
		$this->load->library('form_validation');
		$this->load->view('template', $data);
	}
	
	function buyTicket() {
		if (isset($_SESSION['flight_id']) && isset($_SESSION['seat'])) {
			$first = $_REQUEST["firstName"];
			$last = $_REQUEST["lastName"];
			$creditcard = $_REQUEST["creditCard"];
			$creditcardexpr = $_REQUEST["creditCardExpr"];
			$flight_id = $_SESSION['flight_id'];
			$seat = $_SESSION['seat'];
			echo $flight_id . " " . $seat;
	        $this->load->model('flight_model');
	        $this->load->model('ticket_model');
	        
	        $this->db->trans_begin();
	        $this->flight_model->updateAvailability($flight_id);  // update values in flight table (-1 available) and insert ticket into ticket table
	        $this->ticket_model->insertTicket($first, $last, $creditcard, $creditcardexpr, $flight_id, $seat);
	        if ($this->db->trans_status() == FALSE) {
				$_SESSION['errmsg'] = $this->db->_errormessage();
				$_SESSION['errno'] = $this->db->_errornumber();
				$this->db->rollback();
				redirect('main/buyTicket', 'refresh');
	        } else {
	        	$this->db->trans_commit();
		  		$date = $this->flight_model->get_date($flight_id);
		        $data['first'] = $first;
		        $data['last'] = $last;
		        $data['creditcard'] = $creditcard;
		        $data['creditcardexpr'] = $creditcardexpr;
		        $data['flight_id'] = $flight_id;
		        $data['seat'] = $seat;
		        $data['date'] = $_SESSION['date'];
		        $data['main'] = 'main/printSummary';
		        $this->load->view('template', $data);
	        }
		}
    }

	function printSummary() {
		$data['main'] = 'main/printSummary';
		$this->load->view('template', $data);
	}
	
}