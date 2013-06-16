var previousSelectedShape; // keep track of previously selected shape
var shapes = []; // array to keep track of all shapes
var isActive = false; // keep track of whether we're drawing

window.onload = function() {
	// get reference to shapes select dropdown
	shapeSelect = document.getElementById("shapeSelect");
	colourSelect = document.getElementById("colourSelect")
	
	// setup canvas
	canvas = document.getElementById("drawingCanvas");
	context = canvas.getContext("2d");
	canvas.onmousedown = canvasMouseDown;
	canvas.onmouseup = canvasMouseUpOut;
	canvas.onmouseout = canvasMouseUpOut;
	canvas.onmousemove = canvasMouseMove
};

function canvasMouseUpOut(event) {
	isActive = false;
}

function canvasMouseMove(event) {
	var clickX = event.pageX - canvas.offsetLeft;
	var clickY = event.pageY - canvas.offsetTop;
	//var shape = shapes[shapes.length-1];
	if (isActive) {
		//shape.update(shape.x1, shape.x2, clickX, clickY);
		shapes[shapes.length-1].update(shapes[shapes.length-1].x1, shapes[shapes.length-1].y1, clickX, clickY);
	}
	drawShapes();
}

function canvasMouseDown(event) {
	isActive = true;

	// Get the canvas click coordinates.
	var clickX = event.pageX - canvas.offsetLeft;
	var clickY = event.pageY - canvas.offsetTop;
	addShape(clickX, clickY);
	drawShapes();
	
	/*
	// Look for the clicked shape
	for (var i=shapes.length-1; i>=0; i--) {
		var shape = shapes[i];
		if (shape.testHit(clickX,clickY)) {
			if (previousSelectedShape != null) { 
				previousSelectedShape.isSelected = false;
			}
			shape.isSelected = true;
			previousSelectedShape = shape;
			drawShapes();
			return;
		}
	}*/
}

function addShape(x, y) {
	var shape = shapeSelect.value;
	console.log(shape);
	if (shape === "line") {
		// make line object at initial mousedown position
		var line = new Line(x, y, x, y);
		shapes.push(line);
		console.log(line instanceof Line);
	} else if (shape === "rectangle") {
		// make rectangle at initial mousedown position
		
	} else { //circle
		
	}
}

function Line(x1, y1, x2, y2) {
	this.colour = getColour();
	this.update(x1, y1, x2, y2);
	this.draw = function () {
		context.beginPath()
		context.lineWidth = 2;
		context.moveTo(this.x1, this.y1);
		context.lineTo(this.x2, this.y2);
		context.strokeStyle = this.colour;
		context.stroke();
	};
}

Line.prototype.update = function (x1, y1, x2, y2) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
};

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

function getColour() {
	return colourSelect.value;
}