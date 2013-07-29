<!DOCTYPE html>
<html>
<head>

	<h1>Select a Flight</h1>
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
	<link href="<?php echo base_url();?>css/addFlight.css" rel="stylesheet" type="text/css" />
	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	<script src="<?php echo base_url();?>/js/addFlight.js" type='text/javascript'></script>

</head>
<body>
	<?php
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

	<p> Date: </p> 
	<?php
		$data = array('id' => 'datepicker', 'name' => 'date', 'readonly' => 'readonly'); // same as <input type="text" id="datepicker" /> 
		echo form_input($data, '', "required"); 
		echo form_error('datepicker');
		echo form_submit('add', 'Check Date');
		echo form_close();
	?>
</body>
</html>