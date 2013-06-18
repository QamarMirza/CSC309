var previousSelectedShape; // keep track of previously selected shape
var shapes = []; // array to keep track of all shapes
var mouseDown = false; // keep track of whether the mouse is down
var select = false; // keep track of whether any shape has been selected or not

$(function() {
	// setup canvas
	canvas = $("#drawingCanvas"); // this returns a jQuery object
	canvas.mousedown(function(event) {
		canvasMouseDown(event);
	});
	canvas.mouseup(function(event) {
		canvasMouseUpOut(event);
	});
	canvas.mouseout(function(event) {
		canvasMouseUpOut(event);
	});
	canvasElement = canvas[0] // canvas[0] is the actual HTML DOM element for our drawing canvas
	context = canvasElement.getContext("2d");
	
	// get reference to select dropdowns
	shapeSelect = $("#shapeSelect")[0];
	colourSelect = $("#colourSelect")[0];
	outlineSelect = $("#colourOutline")[0];
	
	colourSelect.onchange = changeColour;
	outlineSelect.onchange = changeColour;
});

function canvasMouseDown(event) {
	if (event.button === 0) {
		$(canvas).bind('mousemove', function(event) {
			canvasMouseMove(event);
		});
	}
	
	// Get the canvas click coordinates.
	var clickX = event.pageX - canvasElement.offsetLeft;
	var clickY = event.pageY - canvasElement.offsetTop;
	
	// Look for the clicked shape
	for (var i=shapes.length-1; i>=0; i--) {
		var shape = shapes[i];
		if (shape.testHit(clickX,clickY)) {
			if (previousSelectedShape != null) { 
				previousSelectedShape.isSelected = false;
			}
			shape.isSelected = true;
			console.log("hit");
			previousSelectedShape = shape;
			drawShapes();
			select = true;
			return;
		}
	}
	select = false;
	mouseDown = true;
}

function canvasMouseMove(event) {
	var clickX = event.pageX - canvas[0].offsetLeft;
	var clickY = event.pageY - canvas[0].offsetTop;
	if (mouseDown) {
		console.log("adding shape");
		addShape(clickX, clickY);
		mouseDown = false;
	} else if (!select) {
		console.log("updating shape");
		var shape = shapes[shapes.length-1];
		shape.update(shape.x1, shape.y1, clickX, clickY);
	}
	drawShapes();
}

function canvasMouseUpOut(event) {
	$(canvas).unbind('mousemove');
}

function addShape(x, y) {
	var shape = shapeSelect.value;
	if (shape === "line") {
		// make line object at initial mousedown position
		var line = new Line(x, y, x, y);
		shapes.push(line);
	} else if (shape === "rectangle") {
		// make rectangle object at initial mousedown position
		var rectangle = new Rectangle(x, y, x, y);
		shapes.push(rectangle);
	} else {
		// make circle object at initial mousedown position
		var circle = new Circle(x,y, x, y);
		shapes.push(circle);
	}		
}

function Line(x1, y1, x2, y2) {
	this.colour = getColour();
	this.update(x1, y1, x2, y2);
	this.isSelected = false; // initially false
	this.lineWidth = 10;
	this.draw = function() {
		context.beginPath();
		context.lineWidth = this.lineWidth;
		context.moveTo(this.x1, this.y1);
		context.lineTo(this.x2, this.y2);
		context.strokeStyle = this.colour;
		if (this.isSelected) {
			context.lineWidth = 5;
		} else {
			context.lineWidth = 2;
		}
		context.stroke();
	};
}

Line.prototype.testHit = function(x, y) {
	if (this.x1 < this.x2) {
		var minX = this.x1, maxX = this.x2;
	} else {
		var minX = this.x2, maxX = this.x1;
	}
	if (this.y1 < this.y2) {
		var minY = this.y1, maxY = this.y2;
	} else {
		var minY = this.y2, maxY = this.y1;
	}
	var precision = this.lineWidth / 2;
	var checkX = (x >= minX - precision) && (x <= maxX + precision); // check if x-coor within bound 
	var checkY = (y >= minY - precision) && (y <= maxY + precision); // check if y-coor within bound
	var m = -1 * (this.y2 - this.y1) / (this.x2 - this.x1);	// slope is reversed since y is reversed
	var b = this.y1 - m * this.x1;	// y-intercept
	// returns true iff point within bounds and satisfies line eq with += precision
	return (checkX && checkY && Math.abs(y - m * x - b) <= precision);
};

Line.prototype.update = function (x1, y1, x2, y2) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
};

function Rectangle(x1, y1, x2, y2) {
	this.colour = getColour();
	this.outlineColour = getOutline();
	this.update(x1, y1, x2, y2);
	this.isSelected = false;

	this.draw = function() {
		// Draw the rectangle.
		context.globalAlpha = 0.85;
		context.beginPath();
		context.rect(this.x1, this.y1, this.x2, this.y2);
		context.fillStyle = this.colour;
		context.strokeStyle = this.outlineColour;

		if (this.isSelected) {
			context.lineWidth = 5;
		} else {
			context.lineWidth = 2;
		}
		context.fill();
		context.stroke();
	};
}

Rectangle.prototype.testHit = function(x,y) {
	//done
	if (this.x2 < 0){
		if (this.y2 < 0){ // if box is drawn bottom right to top left
			if (this.y2 < 0){ // box is drawn bototom left to top right
				if (this.x1 > x && this.x1+this.x2 < x && this.y1 > y && this.y1+this.y2 < y){ 
						return true;
				}
				return false;
			}
		} else { // x >0, box is drawn top right to bottom left
			if (this.y2 > 0){ // box is drawn bototom left to top right
				if (this.x1 > x && this.x1+this.x2 < x && this.y1 < y && this.y1+this.y2 > y) {
						return true;
				}
				return false;
			}
		}
	} else { // x > 0
		if (this.y2 < 0){ // box is drawn bototom left to top right
			if (this.x1 < x && this.x1+this.x2 > x && this.y1 > y && this.y1+this.y2 < y) {
					return true;
			}
			return false;
		} else { // y > 0, box is drawn top left to bottom right 
			if (this.x1 < x && this.x1+this.x2 > x && this.y1 < y && this.y1+this.y2 > y) {
				return true;
			}
			return false;
		}
	}
};

Rectangle.prototype.update = function (x1, y1, x2, y2) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2-this.x1;
	this.y2 = y2-this.y1 ;
};

function Circle(x1,y1, x2, y2) {
	this.colour = getColour();
	this.outlineColour = getOutline();
	this.update(x1, y1, x2, y2);
	this.isSelected = false;

	this.draw = function() {
		// Draw the circle.
		context.globalAlpha = 0.85;
		context.beginPath();
		context.arc(this.x1, this.y1, this.radius, 0, Math.PI*2);
		context.fillStyle = this.colour;
		context.strokeStyle = this.outlineColour;

		if (this.isSelected) {
			context.lineWidth = 5;
		} else {
			context.lineWidth = 2;
		} 
		context.fill();
		context.stroke(); 
	};
}

Circle.prototype.testHit = function(x,y) {
	if (Math.sqrt(Math.pow(this.x1 - x,2) + Math.pow(this.y1 -y,2)) <= this.radius){
		return true;
	}
	return false;
};

Circle.prototype.update = function(x1, y1, x2, y2) {
	this.x1 = x1;
	this.y1 = y1;
	this.radius = Math.sqrt(Math.pow(x2 - this.x1, 2) + Math.pow(y2-this.y1, 2));
};

function drawShapes() {
	// Clear the canvasElement.
	context.clearRect(0, 0, canvasElement.width, canvasElement.height);

	console.log(shapes);
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

function eraseShape() {
	if (select){
		shapes.splice(shapes.indexOf(previousSelectedShape),1);
		previousSelectedShape = null;
		drawShapes();
		select = false;
	}
}

function changeColour() {
	if (select) {
		for (var i=shapes.length-1; i>=0; i--) {
		var shape = shapes[i];
			if (shape.isSelected) {
				shape.colour = getColour();
				shape.outlineColour = getOutline();
				drawShapes();
				return;
			}
		}
	}
}

function getColour() {
	return colourSelect.value;
}

function getOutline() {
	return outlineSelect.value;
}