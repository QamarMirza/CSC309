<!DOCTYPE html>
<html>
<head>
	<h1>Choose a seat</h1>
	<script src="<?php echo base_url();?>css/helicopter.css"></script>
	<script src="<?php echo base_url();?>js/jQuery/jquery-1.10.1.js"></script>
	<script src="<?php echo base_url();?>js/helicopter.js"></script>
</head>
<body>
	<?php
	echo anchor('','Back') . "<br />";

	if (isset($errno)){
		echo "<p> DB: Error: ($errno) $errmsg</p>";
	}
	
	?>
	
	<div id="container">
		<canvas id="drawingCanvas" width="350" height="150"></canvas>
		<div id="seat1" class="seatBox" title="1"></div>
		<div id="seat2" class="seatBox" title="2"></div>
		<div id="seat3" class="seatBox" title="3"></div>
	</div>
	
	<?php
	echo form_open('main/ticketUser');
	echo form_hidden('seat', set_value('seat'));
	echo form_submit('submit', 'Take Seat', 'onClick="return checkSeat()"');
	?>
</body>
</html>