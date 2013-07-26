 <?php
echo anchor('','Back') . "<br />";


//And if the $site variable is not empty we echo it's content by using the generate method of the table class / library


    $headers = array("From", "To",  "Time", "Date", "Available", "FlightID", " ");
    

    echo "<table>";
    foreach($headers as $header) {
        echo "<th>$header</th>";
    }
    // Use result, one of the mysql result functions must be used
    // See also mysql_result(), mysql_fetch_array(), mysql_fetch_row(), etc.
	foreach ($flights->result() as $row){
        echo "<tr>";
        echo "<td>" . $row->from . "</td><td>" . $row->to . "</td><td>" . $row->time . "</td><td>" . $row->date . "</td><td>" . $row->available . "</td><td>" . $row->flightid . "</td><td>" 
        . anchor("main/SeatSelect->$row->flightid", 'Check Seats')  . "</td>"; 
        
        echo "</tr>";
    }
    echo "</table>";

?>

