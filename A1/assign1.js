var previousSelectedShape ; // keep track of previously selected shape
var shapes = []; // array to keep track of all shapes
var isActive = false; // keep track of whether we're drawing
var select = false; // keep track of whether any shape has been selected or not
window.onload = function() {
	// get reference to shapes select dropdown
	shapeSelect = document.getElementById("shapeSelect");
	colourSelect = document.getElementById("colourSelect");
	outlineSelect = document.getElementById("colourOutline");
	// setup canvas
	canvas = document.getElementById("drawingCanvas");
	context = canvas.getContext("2d");
	canvas.onmousedown = canvasMouseDown;
	canvas.onmouseup = canvasMouseUpOut;
	canvas.onmouseout = canvasMouseUpOut;
	canvas.onmousemove = canvasMouseMove
	colourSelect.onchange = changeColour;
	outlineSelect.onchange = changeColour;
};

function canvasMouseUpOut(event) {
	isActive = false;
	
}	

function changeColour(){
if (select){
		for (var i=shapes.length-1; i>=0; i--) {
		var shape = shapes[i];
			if (shape.isSelected){
				shape.colour = getColour();
				shape.strokeStyle = getOutline();
				drawShapes();
				return;
			}

		}
	}
}

function canvasMouseMove(event) {
	var clickX = event.pageX - canvas.offsetLeft;
	var clickY = event.pageY - canvas.offsetTop;
	//var shape = shapes[shapes.length-1];
	if (isActive && !select) {
		//shape.update(shape.x1, shape.x2, clickX, clickY);
		shapes[shapes.length-1].update(shapes[shapes.length-1].x1, shapes[shapes.length-1].y1, clickX, clickY);
	}
	drawShapes();
}

function canvasMouseDown(event) {
	isActive = true;
	var clickX = event.pageX - canvas.offsetLeft;
	var clickY = event.pageY - canvas.offsetTop;
	// Get the canvas click coordinates.

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
			select = true;
			return;
		}
	}
		select = false;
		addShape(clickX, clickY);
		drawShapes();
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
		var rectangle = new Rectangle(x, y, x, y);
		shapes.push(rectangle);
		console.log (rectangle instanceof Rectangle);
	} else { //circle
		var circle = new Circle(x,y, x, y);
		shapes.push(circle);
		console.log(circle instanceof Circle);
	}		
}


function Circle(x1,y1, x2, y2) {
	this.colour = getColour();
	this.update(x1, y1, x2, y2);
	this.isSelected = false;
	this.draw = function () {
    // Draw the circle.
    context.globalAlpha = 0.85;
    context.beginPath();
    context.arc(this.x1, this.y1, this.radius, 0, Math.PI*2);
    context.fillStyle = this.colour;
    context.strokeStyle = "black";

    if (this.isSelected) {
    	context.lineWidth = 5;
    }
    else {
    	context.lineWidth = 1;
    } 
    context.fill();
    context.stroke(); 
	};
}

Circle.prototype.testHit = function(x,y){
	if (Math.sqrt(Math.pow(this.x1 - x,2) + Math.pow(this.y1 -y,2)) <= this.radius){
		return true;
	}
	return false;
};


Rectangle.prototype.testHit = function(x,y){
	if (this.x1 < x && this.x1+this.x2 > x && this.y1 < y && this.y1+this.y2 > y) 
		return true;
	return false;
};



Circle.prototype.update = function(x1,y1, x2, y2) {
	this.x1 = x1;
	this.y1 = y1;
	this.radius = Math.sqrt(Math.pow(x2 - this.x1, 2) + Math.pow(y2-this.y1, 2));
};

function Rectangle(x1, y1, x2, y2) {
	this.colour = getColour();
	this.update(x1, y1, x2, y2);
	context.strokeStyle = "black";
	this.isSelected =false;
	this.draw = function () {
    // Draw the circle.
   		context.globalAlpha = 0.85;
    	context.beginPath();
    	context.rect(this.x1, this.y1, this.x2, this.y2);
    	context.fillStyle = this.colour;
   		if (this.isSelected) {
    		context.lineWidth = 5;
    	}
    	else {
    		context.lineWidth = 1;
    	}
    	context.fill();
    	context.stroke(); 
  };
}

Rectangle.prototype.update = function (x1, y1, x2, y2) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2-this.x1;
	this.y2 = y2-this.y1 ;
};

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
function eraseShape(){
	if (select){
		shapes.splice(shapes.indexOf(previousSelectedShape),1);
		previousSelectedShape = null;
		drawShapes();
		select = false;
	}
}

function getColour() {
	return colourSelect.value;
}

function getOutline(){
	return outlineSelect.value;
}