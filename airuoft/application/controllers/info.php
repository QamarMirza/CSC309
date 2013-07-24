<?php

class ticket extends CI_Controller {
    
    function __construct() {
    	// Call the Controller constructor
    	parent::__construct();
    }

    function setFirstName($first){
        $this->FirstName = $first;
    }

    function setLastName($last){
        $this->LastName = $last
    }

    function setCreditCard($CreditCardnum){
        $this->CreditCard = $CreditCardnum;
    }

    function setCreditCardExpir($CreditCardExpiry){
        $this->CreditCardEx = $CreditCardExpiry;
    }

    function setFlight_Id($id){
        $this->flight_id = $id;
    }

    function setSeat($seat_id){
        $this->seat = $seat_id;
    }

    function register(){


    }

}

?>