var previousSelectedShape; // keep track of previously selected shape
var shapes = []; // array to keep track of all shapes
var mouseDown = false; // keep track of whether the mouse is down
var anySelected = false; // keep track of whether any shape has been selected or not
var copy = false;
var newShape;
var defaultOutlineWidth = 3;
var tags = ["CANVAS", "BUTTON", "DIV", "INPUT", "SPAN"];
var resize = false;
var offsetX, offsetY // used for moving shapes
var resizeChange = false;

$(function() {
	// setup canvas
	canvas = $("#drawingCanvas"); // this returns a jQuery object
	canvas.mousedown(function(event) {
		canvasMouseDown(event);
	});
	canvas.mouseup(function(event) {
		mouseUpOut(event);
	});
	canvas.mousemove(function(event) {
		canvasMouseMove(event);
	});

	canvasElement = canvas[0] // canvas[0] is the actual HTML DOM element for our drawing canvas
	context = canvasElement.getContext("2d");
	
	// attach mouse events to entire document as well
	$(window).mouseup(function(event) {
		mouseUpOut(event);
	});

	$(window).mousedown(function(event) {
		// check for what we clicked, ignore if we clicked any element that matches a value in tags
		if ($.inArray(event.target.tagName, tags) === -1) {
			anySelected = false;
			if (previousSelectedShape) {
				previousSelectedShape.isSelected = false;
				previousSelectedShape = null;
			}
			drawShapes();
		}
	});
	
	// when the simple slider changes update shape width if any is selected
	$("[data-slider]").bind("slider:ready slider:changed", function (event, data) { updateWidth(data.value); });
		
	// set a colour palette for fill and outline using spectrum, a jQuery plugin
	$("#fillSelect").spectrum({
		color: "red",
		showInput: true,
		className: "colour-spectrum",
		showInitial: true,
		showPalette: true,
		showSelectionPalette: true,
		maxPaletteSize: 10,
		preferredFormat: "hex",
		change: changeColour,
		palette: [
			["#000000", "#434343", "#666666", "#999999", "#b7b7b7", "#cccccc", "#d9d9d9", "#efefef", "#f3f3f3", "#ffffff"],
			["#980000", "#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#4a86e8", "#0000ff", "#9900ff", "#ff00ff"],
			["#e6b8af", "#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d9ead3", "#c9daf8", "#cfe2f3", "#d9d2e9", "#ead1dc"],
			["#dd7e6b", "#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#a4c2f4", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
			["#cc4125", "#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6d9eeb", "#6fa8dc", "#8e7cc3", "#c27ba0"],
			["#a61c00", "#cc0000", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3c78d8", "#3d85c6", "#674ea7", "#a64d79"],
			["#85200c", "#990000", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#1155cc", "#0b5394", "#351c75", "#741b47"],
			["#5b0f00", "#660000", "#783f04", "#7f6000", "#274e13", "#0c343d", "#1c4587", "#073763", "#20124d", "#4c1130"]
		]
	});
	
	// jQuery plugin colour pallet for selecting the colourOutline
	$("#outlineSelect").spectrum({
		color: "black",
		showInput: true,
		className: "colour-spectrum",
		showInitial: true,
		showPalette: true,
		showSelectionPalette: true,
		maxPaletteSize: 10,
		preferredFormat: "hex",
		change: changeColour,
		palette: [
			["#000000", "#434343", "#666666", "#999999", "#b7b7b7", "#cccccc", "#d9d9d9", "#efefef", "#f3f3f3", "#ffffff"],
			["#980000", "#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#4a86e8", "#0000ff", "#9900ff", "#ff00ff"],
			["#e6b8af", "#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d9ead3", "#c9daf8", "#cfe2f3", "#d9d2e9", "#ead1dc"],
			["#dd7e6b", "#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#a4c2f4", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
			["#cc4125", "#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6d9eeb", "#6fa8dc", "#8e7cc3", "#c27ba0"],
			["#a61c00", "#cc0000", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3c78d8", "#3d85c6", "#674ea7", "#a64d79"],
			["#85200c", "#990000", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#1155cc", "#0b5394", "#351c75", "#741b47"],
			["#5b0f00", "#660000", "#783f04", "#7f6000", "#274e13", "#0c343d", "#1c4587", "#073763", "#20124d", "#4c1130"]
		]
	});
	
	// get reference to selectors
	shapeSelect = $("#shapeSelect")[0];
	fillSelect = $("#fillSelect")[0];
	outlineSelect = $("#outlineSelect")[0];
	
	// attach onchange events to the selectors
	fillSelect.onchange = changeColour;
	outlineSelect.onchange = changeColour;
});

/*
	function for mouselistener for onmousedown.
*/
function canvasMouseDown(event) {
	// Get the canvas click coordinates.
	var mouseX = event.pageX - canvasElement.offsetLeft;
	var mouseY = event.pageY - canvasElement.offsetTop;
	copy = false;
	resize = false;
	anySelected = false;
	
	mouseDown = true;
	if (event.button === 0) {
		$(canvas).bind('mousemove', function(event) {
			canvasMouseMove(event);
		});
	}
	
	// Look for the clicked shape
	for (var i=shapes.length-1; i>=0; i--) {
		var shape = shapes[i];
		if (shape.testHit(mouseX,mouseY)) {
			if (previousSelectedShape != null) { 
				previousSelectedShape.isSelected = false;
			}
			shape.isSelected = true;
			anySelected = true;
			previousSelectedShape = shape;
			offsetX = mouseX - shape.x1;
			offsetY = mouseY - shape.y1;
			drawShapes();
			return;
		} else {
			shape.isSelected = false;
		}
	}
	drawShapes();
}

/*	
	function for the mousemove listener for the canvas.
	depending on which state the website is in (ie. resizeing a shape or intial drawing of a shape)
	it will update shapes accordingly
*/
function canvasMouseMove(event) {
	var mouseX = event.pageX - canvas[0].offsetLeft;
	var mouseY = event.pageY - canvas[0].offsetTop;
	if (mouseDown && anySelected && !resize) {
		// move shape
		moveShape(mouseX, mouseY);
	} else if (mouseDown && !resize) {
		// add shape
		addShape(mouseX, mouseY);
		mouseDown = false;
	} else if (anySelected && resize && !resizeChange) {
		// resize shape
		var shape = previousSelectedShape;
		if (shape.testHit(mouseX+10, mouseY+10) || shape.testHit(mouseX+10, mouseY-10) || shape.testHit(mouseX-10, mouseY+10) || shape.testHit(mouseX-10, mouseY-10)) {
			shape.update(shape.x1, shape.y1, mouseX, mouseY);
			drawShapes();
			resizeChange = true;
		}
	} else if ((!anySelected && !resize) || resizeChange) {
		// update shape
		if (resizeChange){
			var shape = previousSelectedShape;
		} else {
			var shape = shapes[shapes.length-1];
		}
		if (shape) {
			shape.update(shape.x1, shape.y1, mouseX, mouseY);
		}
	}
	drawShapes();
}

function mouseUpOut(event) {
	$(canvas).unbind('mousemove');
}

/*
	when the mouse clicks on a fresh peice of canvas and moves the mouse we
	intiate a shape being created depending on where the drop down label is 
	selected to, then push it onto the shape stack
*/
function addShape(x, y) {
	var shape = shapeSelect.value;
	resizeChange = false;
	if (shape === "line") {
		// make line object at initial mousedown position
		var line = new Line(x, y, x, y);
		shapes.push(line);
	} else if (shape === "rectangle") {
		// make rectangle object at initial mousedown position
		var rectangle = new Rectangle(x, y, x, y);
		shapes.push(rectangle);
	} else if (shape === "circle") {
		// make circle object at initial mousedown position
		var circle = new Circle(x, y, x, y);
		shapes.push(circle);
	}
}

/*
	when a shape that is selected and is clicked on and drag we call this function
	to update where it is moved to by calculating the offset from the mouse	
*/
function moveShape(x, y) {
	var shape = previousSelectedShape;
	if (shape instanceof Circle || shape instanceof Rectangle) {
		shape.x1 = x - offsetX;
		shape.y1 = y - offsetY;
	} else {
		var diffX = shape.x2 - shape.x1;
		var diffY = shape.y2 - shape.y1;
		shape.x1 = x - offsetX;
		shape.y1 = y - offsetY;
		shape.x2 = shape.x1 + diffX;
		shape.y2 = shape.y1 + diffY;
	}
	drawShapes();		
}

/*
	when a shape is selected and the copy/paste button is pressed this function gets called.
	depending on which type of shape is selected and needs to be copied, need to create a 
	new object and set it's values to the same as the shape selected and then reposition it
	in the centre of the canvas.
*/
function copyShape() {
	if (anySelected) {
		copy = true;
		var shape = previousSelectedShape;
		if (shape instanceof Circle) {
			//this.radius = Math.sqrt(Math.pow(x2 - this.x1, 2) + Math.pow(y2-this.y1, 2));
			// how the radius is calculated
			newShape = new Circle(shape.x1, shape.y1, shape.radius , shape.radius);
			newShape.fillColour = shape.fillColour;
			newShape.outlineColour = shape.outlineColour;
			newShape.outlineWidth = shape.outlineWidth;
			newShape.isSelected = false;
			newShape.x1 = 250;
			newShape.y1 = 200;
		} else if (shape instanceof Rectangle) {
			newShape = new Rectangle(shape.x1, shape.y1, shape.x2 + shape.x1, shape.y2 + shape.y1);
			newShape.outlineColour = shape.outlineColour;
			newShape.fillColour = shape.fillColour;
			newShape.outlineWidth = shape.outlineWidth;
			newShape.isSelected = false;
			newShape.x1 = 250;
			newShape.y1 = 200;
		} else {
			newShape = new Line(shape.x1, shape.y1, shape.x2, shape.y2);
			newShape.fillColour = shape.fillColour;
			newShape.outlineColour = shape.outlineColour;
			newShape.outlineWidth = shape.outlineWidth;
			newShape.isSelected = false;

			var diffX = shape.x2 - shape.x1;
			var diffY = shape.y2 - shape.y1;
			newShape.x1 = 250;
			newShape.y1 = 200;
			newShape.x2 = newShape.x1 + diffX;
			newShape.y2 = newShape.y1 + diffY;
		}
		shapes.push(newShape);
		shape.isSelected = false;
		previousSelectedShape = null;
		anySelected = false;
		copy = false;
		drawShapes();
	}
}

function drawShapes() {
	// Clear the canvasElement.
	context.clearRect(0, 0, canvasElement.width, canvasElement.height);

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

/*
	if a shape is selected, this function gets called 
	and erases that shape from the shapes array and redraws
*/
function eraseShape() {
	if (anySelected) {
		shapes.splice(shapes.indexOf(previousSelectedShape), 1);
		previousSelectedShape = null;
		drawShapes();
		anySelected = false;
	}
}
/*
	function get's called when slider value changes on which ever shape is selected
*/
function updateWidth(w) {
	if (anySelected) {
		var shape = previousSelectedShape;
		shape.outlineWidth = w;
		drawShapes();
	}
}

function changeColour() {
	if (anySelected) { // if a shape is selected then change it's values
		var shape = previousSelectedShape;
		shape.fillColour = getFillColour();
		shape.outlineColour = getOutlineColour();
		drawShapes();
	}
}

function getFillColour() {
	return fillSelect.value;
}

function getOutlineColour() {
	return outlineSelect.value;
}

/*
	function used to create the shape of the line object. Initialize fill colour, update it's coordinates, 
	set object details to a default value and create a custom draw function.
*/
function Line(x1, y1, x2, y2) {
	this.fillColour = getFillColour();
	this.update(x1, y1, x2, y2);
	this.isSelected = false; // initially false
	this.outlineWidth = defaultOutlineWidth;
	this.outlineColour = getOutlineColour();

	this.draw = function() {
		context.beginPath();
		context.lineWidth = this.lineWidth;
		context.moveTo(this.x1, this.y1);
		context.lineTo(this.x2, this.y2);
		context.strokeStyle = this.outlineColour;
		if (this.isSelected) {
			context.lineWidth = this.outlineWidth + 3;
		} else {
			context.lineWidth = this.outlineWidth;
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
	var xPrecision = this.outlineWidth / 2;
	var yPrecision = this.outlineWidth;
	var checkX = (x >= minX - xPrecision) && (x <= maxX + xPrecision); // check if x-coor within bound += some precision
	var checkY = (y >= minY - yPrecision) && (y <= maxY + yPrecision); // check if y-coor within bound += some precision
	if (this.x1 === this.x2 || this.y1 === this.y2) { // case for if lines are completely horizontal or vertical
		return checkX && checkY;
	}
	
	var m = (this.y2 - this.y1) / (this.x2 - this.x1);
	var b = this.y1 - m * this.x1;	// y-intercept
	
	// returns true iff point within bounds and satisfies line eq with += some precision, need diff cases depending on slope
	var invertM = 1/m;
	var value = y - m * x - b;
	var vPrecision = this.outlineWidth / 2;
	if (invertM < 0) {
		if (invertM <= -0.5) {
			return (checkX && checkY && (0.5 - vPrecision <= value) && (value <= 5 + vPrecision));
		} else if (invertM <= -0.4) {
			return (checkX && checkY && (-0.5 - vPrecision <= value) && (value <= 11 + vPrecision));
		} else if (invertM <= -0.3) {
			return (checkX && checkY && (-1 - vPrecision <= value) && (value <= 13 + vPrecision));
		} else if (invertM <= -0.2) {
			return (checkX && checkY && (-4 - vPrecision <= value) && (value <= 15 + vPrecision));
		} else if (invertM <= -0.1) {
			return (checkX && checkY && (-8 - vPrecision <= value) && (value <= 48 + vPrecision));
		} else if (invertM <= -0.05) {
			return (checkX && checkY && (-12 - vPrecision <= value) && (value <= 150 + vPrecision));
		} else {
			return (checkX && checkY && (-20 - vPrecision <= value) && (value <= 275 + vPrecision));
		}
	} else {
		if (invertM >= 0.5) {
			return (checkX && checkY && (-0.3 - vPrecision <= value) && (value <= 2 + vPrecision));
		} else if (invertM >= 0.4) {
			return (checkX && checkY && (-6 - vPrecision <= value) && (value <= 3 + vPrecision));
		} else if (invertM >= 0.3) {
			return (checkX && checkY && (-10 - vPrecision <= value) && (value <= 4.5 + vPrecision));
		} else if (invertM >= 0.2) {
			return (checkX && checkY && (-13 - vPrecision <= value) && (value <= 6 + vPrecision));
		} else if (invertM >= 0.1) {
			return (checkX && checkY && (-25 - vPrecision <= value) && (value <= 8 + vPrecision));
		} else if (invertM >= 0.05) {
			return (checkX && checkY && (-55 - vPrecision <= value) && (value <= 12 + vPrecision));
		} else {
			return (checkX && checkY && (-150 - vPrecision <= value) && (value <= 25 + vPrecision));
		}
	}
};

/*
	update the two end points of the line object
*/
Line.prototype.update = function (x1, y1, x2, y2) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
};

/*
	This is the object created for the rectangle shape. we define it's point of origin and then offset values
	as well as it's initial colour outline and width and fill colour.
*/
function Rectangle(x1, y1, x2, y2) {
	this.fillColour = getFillColour();
	this.outlineColour = getOutlineColour();
	this.update(x1, y1, x2, y2);
	this.outlineWidth = defaultOutlineWidth;
	this.isSelected = false;
	this.draw = function() {
		// Draw the rectangle.
		context.globalAlpha = 0.85;
		context.beginPath();
		context.rect(this.x1, this.y1, this.x2, this.y2);
		context.fillStyle = this.fillColour;
		context.strokeStyle = this.outlineColour;
		if (this.isSelected) {
			context.lineWidth = this.outlineWidth + 3;
		} else {
			context.lineWidth = this.outlineWidth;
		}
		context.fill();
		context.stroke();
	};
}

Rectangle.prototype.testHit = function(x,y) {
	var precision;
		if (this.outlineWidth <= 5) {
		var precision = this.outlineWidth + 2;
	} else if (this.outlineWidth <= 10) {
		var precision = this.outlineWidth / 1.15;
	} else if  (this.outlineWidth <= 15) {
		var precision = this.outlineWidth / 1.5;
	} else{
		var precision = this.outlineWidth /1.8;
	} 

	if (this.x2 < 0) {
		if (this.y2 < 0) { // if box is drawn bottom right to top left
			if (this.y2 < 0) { 
				if (this.x1  + precision> x && this.x1+this.x2 - precision < x && this.y1 + precision > y && this.y1+this.y2 - precision < y) { 
					return true;
				}
				return false;
			}
		} else { // x >0, box is drawn top right to bottom left
			if (this.y2 > 0) { 
				if (this.x1 +precision > x && this.x1+this.x2  - precision< x && this.y1  - precision< y && this.y1+this.y2 + precision > y) {
					return true;
				}
				return false;
			}
		}
	} else { // x > 0
		if (this.y2 < 0) { // box is drawn bottom left to top right
			if (this.x1 - precision< x && this.x1+this.x2 +precision> x && this.y1  + precision> y && this.y1+this.y2 - precision< y) {
				return true;
			}
			return false;
		} else { // y > 0, box is drawn top left to bottom right 
			if (this.x1 - precision < x && this.x1+this.x2  + precision> x && this.y1 - precision < y && this.y1+this.y2 + precision > y) {
				return true;
			}
			return false;
		}
	}
};

Rectangle.prototype.update = function (x1, y1, x2, y2) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2-this.x1; // offset value. distance between where shape begins and where mouse is
	this.y2 = y2-this.y1;
};

function Circle(x1, y1, x2, y2) {
	this.fillColour = getFillColour();
	this.outlineColour = getOutlineColour();
	this.update(x1, y1, x2, y2);
	this.isSelected = false;
	this.outlineWidth = defaultOutlineWidth;
	this.draw = function() {
		// Draw the circle.
		context.globalAlpha = 0.85;
		context.beginPath();
		context.arc(this.x1, this.y1, this.radius, 0, Math.PI*2);
		context.fillStyle = this.fillColour;
		context.strokeStyle = this.outlineColour;
		if (this.isSelected) {
			context.lineWidth = this.outlineWidth + 3;
		} else {
			context.lineWidth = this.outlineWidth;
		} 
		context.fill();
		context.stroke(); 
	};
}

Circle.prototype.testHit = function(x,y) { // check if mouse click is within radius distance of circle center
	if (this.outlineWidth <= 5) {
		var precision = this.outlineWidth;
	} else if (this.outlineWidth <= 15) {
		var precision = this.outlineWidth / 1.25;
	} else {
		var precision = this.outlineWidth / 1.75;
	}
	if (Math.sqrt(Math.pow(this.x1 - x, 2) + Math.pow(this.y1 -y, 2)) <= this.radius + precision) {
		return true;
	}
	return false;
};

Circle.prototype.update = function(x1, y1, x2, y2) {
	this.x1 = x1;
	this.y1 = y1;
	if (copy) { // if copy/paste button has been pressed
		this.radius = x2; // x2=y2=radius then
	} else{
		 // first time drawing shape, update according to mouse position
		this.radius = Math.sqrt(Math.pow(x2 - this.x1, 2) + Math.pow(y2-this.y1, 2));
	}
};

function resizeShape() {
	resize = true; // to know that the resize button is clicked
	resizeChange = false;	// used as a check in canvasdraw so that it only snaps to the mouse when the mouse
						 	// is near the shape. ie: when mouse comes back onto canvas, selected shape doesn't 
							// snap right to it immediately
	$(canvas).bind('mousemove', function(event) {
		canvasMouseMove(event);
	});

}