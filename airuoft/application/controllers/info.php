<?php

class ticket extends CI_Controller {
    
    function __construct() {
    	// Call the Controller constructor
    	parent::__construct();
    }

    function setFirstName($first){
        $this->first = $first;
    }

    function setLastName($last){
        $this->last = $last
    }

    function setCreditCard($CreditCardnum){
        $this->CCnum = $CreditCardnum;
    }

    function setCreditCardExpir($CreditCardExpiry){
        $this->CCexp = $CreditCardExpiry;
    }

    function setFlight_Id($id){
        $this->flight_id = $id;
    }

    function setSeat($seat_id){
        $this->seat = $seat_id;
    }

    function buyTicket($seat_id, $flight_id){
        $this->load->model('flight_model');
        $seat ;
        $this->flight_model->buy();
        $data['main'] = 'main/print';
        $this->load->view('template', $data);
    }

}

?>