<?php

class ticket_model extends CI_Model {
    function availableSeats($flightid){
        $query = $this->db->query("select seat
                                   from ticket t
                                   where t.flight_id = '$flightid'");
    
        return $query;
    }

    function get_ticket(){
        $query = $this->db->query("select distinct first, last, creditcardnumber, creditcardexpiration, flight_id, seat from ticket");
        return $query;
    }

    function insertTicket($first, $last, $creditcard, $creditcardexpr, $flight_id, $seat) {
        $this->db->query("insert into ticket (first, last, creditcardnumber, creditcardexpiration, flight_id, seat) 
                          values ('$first', '$last', '$creditcard', '$creditcardexpr', $flight_id, $seat)");
    }
}

?>