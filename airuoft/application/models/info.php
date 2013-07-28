<?php

class ticket extends CI_Model {
    
    public $first;
    public $last;
    public $creditcardnumber;
    public $creditcardexpiration;
    public $flight_id;
    public $seat;

    function setFirstName($first){
        $this->first = $first;
    }

    function setLastName($last){
        $this->last = $last;
    }

    function setCreditCard($CreditCardnum){
        $this->creditcardnumber = $CreditCardnum;
    }

    function setCreditCardExpir($CreditCardExpiry){
        $this->creditcardexpiration = $CreditCardExpiry;
    }

    function setFlight_Id($id){
        $this->flight_id = $id;
    }

    function setSeat($seat_id){
        $this->seat = $seat_id;
    }

    function availableSeats($flightid){
        $query = $this->db->query("select seat
                                   from ticket t
                                   where t.flight_id = '$flightid' ;");
    
        return $query;
    }

    function get_ticket(){
        $query = $this->db->query(" select *
                                    from ticket ;");
        return $query;
    }

    function addTicket($info){
        $this->db->query("insert ticket
                          values ('$info->first ', '$info->last ', 
                                  '$info->creditcardnumber ', '$info->creditcardexpiration ', 
                                  '$info->flight_id ', '$info->seat ');");
    }

}

?>