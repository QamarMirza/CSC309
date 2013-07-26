<!DOCTYPE html>
<html>
<head>
	<style>
		#container {
			width: 250px;
			position: relative;
		}
		#seat1 {
			width: 15px;
			height: 15px;
			position: absolute; 
			top: 100px;
			left: 70px;
			border-style: solid;
			border-width: 3px;
		}
		#seat2 {
			width: 15px;
			height: 15px;
			position: absolute;
			top: 100px;
			left: 110px;
			border-style: solid;
			border-width: 3px;
		}
		#seat3 {
			width: 15px;
			height: 15px;
			position: absolute;
			top: 100px;
			left: 150px;
			border-style: solid;
			border-width: 3px;
		}
	</style>
	<h1>Choose a seat yo</h1>
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
	<script>
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
		});
	</script>
</head>
<body>
	<?php
	echo anchor('','Back') . "<br />";
	
	if (!empty($seats)) { 
		echo $this->table->generate($seats); 
	}
	?>
	<div id="container">
		<canvas id="drawingCanvas" width="250" height="200"></canvas>
		<div id="seat1"></div>
		<div id="seat2"></div>
		<div id="seat3"></div>
	</div>
</body>
</html>