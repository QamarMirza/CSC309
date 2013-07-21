<!DOCTYPE html>
<html>
	<head>
		<style>
			input {
				display: block;
			}
			input:valid{
				color: green;
			}
			input:invalid{
				color: red;
			}
		</style>
		<script src="http://code.jquery.com/jquery-latest.js"></script>
		<script> </script>
	</head> 
	<body>  
		
		<h1>Select a Flight</h1>

		<?php 
		    echo validation_errors(); 
						// looks at main controller/then function
			echo form_open('main/checkDate');
			echo form_label("Day:");
			echo form_input('day', set_value('setDay'), "required id='day';");
			echo form_label("Month:");
			echo form_input('month', set_value('setMonth'), "required id='month' ");
			echo form_label("Year: ");
			echo form_input('year', set_value('setYear'), "required id='year' " );

			echo form_submit('Check Date', 'checkDate');
			echo form_close();

		    // pick a date: July 29 2013
		    // check if date is valid

		    // pick a flight
		    // pick a seat

		?>
	</body>

</html>