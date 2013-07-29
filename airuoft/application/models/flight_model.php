<?php
class Flight_model extends CI_Model {

	function get_flights() {
		$query = $this->db->query("select c1.name as 'from', c2.name as 'to', t.time, f.date, f.available
								   from flight f, timetable t, campus c1, campus c2
								   where f.timetable_id = t.id and
								         t.leavingfrom = c1.id and
								         t.goingto = c2.id;");
		return $query;	
	}  

	function populate() {
		for ($i=1; $i < 15; $i++) {
			for ($j=1; $j < 9; $j++) {
				$this->db->query("insert into flight (timetable_id, date, available) 
						          values ($j,adddate(current_date(), interval $i day),3)");
			}
		}
	}

	function delete() {
		$this->db->query("delete from flight");
	}
	
	function deleteAll() {
		$this->delete();
		$this->db->query("delete from ticket");
	}

	function getAvailableFlights($date, $campus){
		date_default_timezone_set('UTC');
		$query = $this->db->query("select c1.name as 'from', c2.name as 'to', t.time, f.date, f.available, f.id as 'flightid'				   
								   from flight f, timetable t, campus c1, campus c2
								   where f.timetable_id = t.id and
										 t.leavingfrom = c1.id and
										 t.goingto = c2.id and
										 t.leavingfrom = '$campus' and
										 DATE(f.date) = '$date' and
										 f.available > '0';"); 
		return $query;
	}

	function get_date($flight_id){
		$query= $this->db->query("select date
								  from flight f 
								  where f.id = '$flight_id' ;");
		return $query;
	}

	function updateAvailability($flight_id){
		$this->db->query("update flight
						   SET available = case
						   when available > 0 then available-1 
						   end 
						   where flight.id = $flight_id ;");
	}

}
?>