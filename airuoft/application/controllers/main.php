<?php

class Main extends CI_Controller {

    function __construct() {
    	// Call the Controller constructor
    	parent::__construct();
    }
        
    function index() {
	    	$data['main']='main/index';
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
    


    function populate() {
	    $this->load->model('flight_model');
	    $this->flight_model->populate();
	    
	    //Then we redirect to the index page again
	    redirect('', 'refresh');
    }
    
    function delete() {
    	$this->load->model('flight_model');    	 
    	$this->flight_model->delete();
    	 
    	//Then we redirect to the index page again
    	redirect('', 'refresh');  
    }
 	
 	function addFlight() {
    	$data['main'] = 'main/addFlight'; // calls controller
    	$this->load->library('form_validation');
    	$this->load->view('template', $data);
    }
/* ---------------------------------------------------------------------------------------- */
 
    function availableFlights(){
    	$this->load->Library('table');
    	$this->load->model('flight_model');
    	$date = $_REQUEST['date'];
    	$campus = $_REQUEST['campus'];
	    date_default_timezone_set("america/toronto");
  		$date = date_create($date);
  		$date = date_format($date, "Y-m-d");
  		//$date = (string)$date;
    	$flights = $this->flight_model->availableFlights($date, $campus);

		if ($flights->num_rows() > 0){
			//Prepare the array that will contain the data
			$table = array();	
			$table[] = array('Date');
		   foreach ($flights->result() as $row){
				//This time we are not only adding a new link, but, in the third parameter of the anchor function we are adding an onclick behaviour to ask the user if he/she really wants to delete the record.
				$table[] = array($row->date);
		   }
			//Next step is to place our created array into a new array variable, one that we are sending to the view.
			$data['flights'] = $table; 		   
		}
		//Now we are prepared to call the view, passing all the necessary variables inside the $data array
		$data['main']='main/flights';
		$this->load->view('template', $data);
    }
   
    // USER ADDS THEIR INFORMATION
    function addUser() {
    	$data['main'] = 'main/addUser';
    	$this->load->library('form_validation');
    	$this->load->view('template', $data);
    }
}