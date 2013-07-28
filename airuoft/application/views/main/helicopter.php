<!DOCTYPE html>
<html>
<head>
	<style>
		#container {
			width: 250px;
			position: relative;
		}
		.seatBox {
			width: 20px;
			height: 20px;
			border-style: solid;
			border-width: 3px;
			position: absolute;
			top: 70px;
		}
		#seat1 {
			left: 70px;
		}
		#seat2 {
			left: 110px;
		}
		#seat3 {
			left: 150px;
		}
		.unavailable {
			background-color: yellow;
		}
		.available {
			background-color: white;
		}
		.selected {
			background-color: green;
		}
		form {
			margin-left: 85px;
		}
	</style>
	<h1>Choose a seat yo</h1>
	<script src="<?php echo base_url();?>js/jQuery/jquery-1.10.1.js"></script>
	<script type="text/javascript">
		$(function() {
			var canvas = $("#drawingCanvas")[0];
			var context = canvas.getContext('2d');
			
			context.save(); // save state
			context.translate(canvas.width / 2, canvas.height / 2); // translate context
			context.scale(2, 1); // scale context horizontally
			
			// draw circle which will be stretched into an oval
			context.beginPath();
			context.arc(0, 0, 50, 0, 2 * Math.PI, false);
			
			// restore state
			context.restore();
			
			// styles
			context.lineWidth = 3;
			context.strokeStyle = 'black';
			context.stroke();
			
			var unavailableSeats = <?php echo json_encode($seats); ?>;
			console.log(unavailableSeats);
			$.each(unavailableSeats, function(index, seat) {
				console.log(index + ": " + seat);
			});
			
			/* there is a known issue of class selector not working because of prototype.js
			   so attach event to each seatBox individually
			*/
			$("#seat1").click(function() {
				$('[name=seat]').val($(this)[0].title);
				$(this).addClass("selected");
				$("#seat2").removeClass("selected");
				$("#seat3").removeClass("selected");
				var myClass = $(this).attr("class");
				console.log(myClass);
			});
			$("#seat2").click(function() {
				$('[name=seat]').val($(this)[0].title);
				$(this).addClass("selected");
				$("#seat1").removeClass("selected");
				$("#seat3").removeClass("selected");
				var myClass = $(this).attr("class");
				console.log(myClass);
			});
			$("#seat3").click(function() {
				$('[name=seat]').val($(this)[0].title);
				$(this).addClass("selected");
				$("#seat1").removeClass("selected");
				$("#seat2").removeClass("selected");
				var myClass = $(this).attr("class");
				console.log(myClass);
			});
		});
	</script>
</head>
<body>
	<?php
	echo anchor('','Back') . "<br />";
	?>
	
	<div id="container">
		<canvas id="drawingCanvas" width="250" height="150"></canvas>
		<div id="seat1" class="seatBox" title="1"></div>
		<div id="seat2" class="seatBox" title="2"></div>
		<div id="seat3" class="seatBox" title="3"></div>
	</div>
	
	<?php
	echo form_open('main/ticketUser');
	echo form_hidden('seat', '', 'required');
	echo form_submit('submit', 'Take Seat');
	?>
</body>
</html>