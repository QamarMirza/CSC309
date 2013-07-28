<!DOCTYPE html>
<html>
<head>
	<style>
		#container {
			width: 350px;
			position: relative;
		}
		.seatBox {
			width: 20px;
			height: 20px;
			border-style: solid;
			border-width: 3px;
			position: absolute;
			top: 80px;
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
		.seatBox {
			background-color: white;
		}
		.selected {
			background-color: green;
		}
		form {
			margin-left: 85px;
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
			
			// body - draw circle which will be stretched into an oval
			context.beginPath();
			context.arc(-25, 15, 50, 0, 2 * Math.PI, false);
			
			// restore state and add styles
			context.restore();
			context.lineWidth = 3;
			context.strokeStyle = 'black';
			context.stroke();
			context.fillStyle = 'red';
			context.fill();
			
			/* draw the lines */
			context.lineWidth = 2;
			context.beginPath();
			context.moveTo(125, 40);
			context.lineTo(125, 25);
			context.stroke();
			
			context.beginPath();
			context.moveTo(50, 10);
			context.lineTo(200, 40);
			context.stroke();
			
			context.beginPath();
			context.moveTo(50, 10);
			context.lineTo(200, 40);
			context.stroke();
			
			context.beginPath();
			context.moveTo(200, 10);
			context.lineTo(50, 40);
			context.stroke();
			
			context.beginPath();
			context.moveTo(225, 85);
			context.lineTo(325, 85);
			context.stroke();
			
			context.beginPath();
			context.moveTo(325, 85);
			context.lineTo(325, 65);
			context.stroke();
			
			/* initialize the seat boxes and their status */
			var seat1 = $("#seat1");
			var seat2 = $("#seat2");
			var seat3 = $("#seat3");
			var seatField = $('[name=seat]');
			var seat = seatField.val();
			if (seat === 1) {
				seat1.addClass("selected");
			} else if (seat === 2) {
				seat2.addClass("selected");
			} else if (seat === 3) {
				seat3.addClass("selected");
			} else {
				console.log("no seat selected");
			}
			
			var unavailableSeats = <?php echo json_encode($seats); ?>;
			console.log(unavailableSeats);
			$.each(unavailableSeats, function(index, seat) {
				if (seat === 1) {
					seat1.addClass("unavailable");
				} else if (seat === 2) {
					seat2.addClass("unavailable");
				} else if (seat === 3) {
					seat3.addClass("unavailable");
				} else {
					console.log("what");
				}
			});
			
			/* there is a known issue of class selector not working because of prototype.js
			   so attach event to each seatBox individually
			*/
			var seatField = $('[name=seat]');
			seat1.click(function() {
				if (!seat1.hasClass('unavailable')) {
					seatField.val($(this)[0].title);
					$(this).addClass("selected");
					seat2.removeClass("selected");
					seat3.removeClass("selected");
					var myClass = $(this).attr("class");
					console.log(myClass);
				} else {
					console.log("avail?");
				}
			});
			seat2.click(function() {
				if (!seat2.hasClass('unavailable')) {
					seatField.val($(this)[0].title);
					$(this).addClass("selected");
					seat1.removeClass("selected");
					seat3.removeClass("selected");
					var myClass = $(this).attr("class");
					console.log(myClass);
				} else {
					console.log("avail?");
				}
			});
			seat3.click(function() {
				if (!seat3.hasClass('unavailable')) {
					seatField.val($(this)[0].title);
					$(this).addClass("selected");
					seat1.removeClass("selected");
					seat2.removeClass("selected");
					var myClass = $(this).attr("class");
					console.log(myClass);
				} else {
					console.log("avail?");
				}
			});
		});
		
		function checkSeat() {
			$(function() {
				var seatField = $('[name=seat]');
				console.log(seatField.val());
				if (seatField.val() === "") {
					$('[name=submit]')[0].setCustomValidity("Please choose a seat");
					return false;
				} else {
					$('[name=submit]')[0].setCustomValidity(""); // all is well, clear error message
					return true;
				}
			});
		}
		
	</script>
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