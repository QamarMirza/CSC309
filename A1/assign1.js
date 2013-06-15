var previousSelectedShape;
var shapes = []; // array to keep track of all shapes

window.onload = function() {
	// get reference to shapes select dropdown
	shapeSelect = document.getElementById("shapes");
	
	// setup canvas
	canvas = document.getElementById("drawingCanvas");
	context = canvas.getContext("2d");
	canvas.onmousedown = canvasMouseDown;
};

function canvasMouseDown(event) {
	// Get the canvas click coordinates.
	var clickX = event.pageX - canvas.offsetLeft;
	var clickY = event.pageY - canvas.offsetTop;
	addShape(clickX, clickY);
	drawShapes();
}

function canvasMouseDown(event) {
	// Get the canvas click coordinates.
	var clickX = event.pageX - canvas.offsetLeft;
	var clickY = event.pageY - canvas.offsetTop;
	addShape(clickX, clickY);
	drawShapes();
	
	
	/*
	// Look for the clicked circle.
	for(var i=shapes.length-1; i>=0; i--) {
		var shape = shapes[i];

		if (shape.testHit(clickX,clickY)) {
			if (previousSelectedShape != null) { 
				previousSelectedShape.setSelected(false);
			}
			previousSelectedShape = shape;
			shape.setSelected(true);
			drawShapes();
			return;
		}
	}
	*/
}

function addShape(x, y) {
	var shape = shapeSelect.value;
	console.log(shape);
	if (shape === "line") {
		// make line object at initial mousedown position
		var line = new Line(x, y, x, y);
		shapes.push(line);
	} else if (shape === "rectangle") {
		//make 
	} else { //circle
		
	}
}

function Line(x1, y1, x2, y2) {
	this.colour = "#ff0000"; // RED
	this.draw = function () {
		context.beginPath()
		context.lineWidth = 2;
		context.moveTo(x1, y1);
		context.lineTo(x2, x2);
		context.strokeStyle = this.colour;
		context.stroke();
	};
}

function drawShapes() {
	// Clear the canvas.
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Go through all the shapes.
	for (var i=0; i<shapes.length; i++) {
		var shape = shapes[i];
		shape.draw();
	}
}

function clearCanvas(event) {
	// Remove all the shapes.
	shapes = [];

	// Update the display.
	drawShapes();
}
