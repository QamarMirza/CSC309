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
	
	function availableFlights(){
		$query = $this->db->query("select c1.name as 'from', c2.name as 'to', t.time, f.date, f.available
								   from flight f, timetable t, campus c1, campus c2
								   where f.timetable_id = t.id and
								         t.leavingfrom = c1.id and
								         t.goingto = c2.id and
								         f.available > 0;");

		return $query; 
	}

	function check_date($day, $month, $year){
	// - YYYY/MM/DD
	$date = $year."/".$month."/".$day;

	}
}