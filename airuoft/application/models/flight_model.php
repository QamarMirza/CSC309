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
	
	function availableFlights($date, $campus){
		/*$query = $this->db->query("select c1.name as 'from', c2.name as 'to', t.time, f.date, f.available
								   from flight f, timetable t, campus c1, campus c2
								   where f.date = $date and
								         t.leavingfrom = $campus and
								         f.available > 0;");
	*/
		$query = $this->db->query("select date 
								   from flight f
								   where f.date = DATE($date);");
		return $query; 
	}
}
?>