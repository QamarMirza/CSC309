var previousSelectedShape;
var shapes = []; // array to keep track of all shapes
var isActive = false;

window.onload = function() {
	// get reference to shapes select dropdown
	shapeSelect = document.getElementById("shapes");
	
	// setup canvas
	canvas = document.getElementById("drawingCanvas");
	context = canvas.getContext("2d");
	canvas.onmousedown = canvasMouseDown;
	canvas.onmouseup = canvasMouseUp;
	canvas.onmousemove = canvasMouseMove
};
function canvasMouseUp(event) {
	isActive = false;
}
function canvasMouseMove(event) {
	var clickX = event.pageX - canvas.offsetLeft;
	var clickY = event.pageY - canvas.offsetTop;
	if (isActive) {
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
		console.log(line instanceof Line);
		shapes.push(line);
	} else if (shape === "rectangle") {
		//make 
	} else { //circle
		
	}
}

function Line(x1, y1, x2, y2) {
	this.colour = "#ff0000"; // RED
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
Line.prototype.update = function (x1, y1, x2, y2){
	console.log("hi");
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
