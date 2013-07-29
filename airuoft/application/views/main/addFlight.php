<!DOCTYPE html>
<html>
<head>
	<h2>Select a Flight</h2>
	<link href="<?php echo base_url();?>css/addFlight.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
	<script type='text/javascript'>
		$(function() {
			$("#datepicker").datepicker({ minDate: +1, maxDate: "+14D" });
			$.datepicker.setDefaults( {dateFormat: "yy-mm-dd"});
		});
	</script>
</head>
<body>
	<?php
	echo anchor('','Back') . "<br /><br />";
	echo validation_errors(); // looks at main controller/then function
	echo form_open('main/availableFlights');
	?>

	<table>
		<tr>
			<td class='radio'><?php echo form_radio("campus", "1", TRUE); ?> </td>
			<td class='radio'><?php echo form_label ("St. George", "campus"); ?> </td>
		</tr>
		<tr>
			<td class='radio'><?php echo form_radio("campus", "2", FALSE); ?></td>
			<td class='radio'><?php echo form_label ("Mississauga", "campus"); ?></td>
		</tr>
	</table>
	
	<br />
	<div>Pick a date:</div> 
	<?php
	$data = array('id' => 'datepicker', 'name' => 'date', 'readonly' => 'readonly'); // same as <input type="text" id="datepicker" /> 
	echo form_input($data, '', "required"); 
	echo form_error('datepicker');
	echo form_submit('add', 'Check Date');
	echo form_close();
	?>
</body>
</html>