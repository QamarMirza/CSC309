var previousSelectedShape; // keep track of previously selected shape
var shapes = []; // array to keep track of all shapes
var mouseDown = false; // keep track of whether the mouse is down
var anySelected = false; // keep track of whether any shape has been selected or not
var copy = false;
var newShape;
var defaultOutlineWidth = 3;
var tags = ["CANVAS", "BUTTON", "DIV", "INPUT", "SPAN"];

$(function() {
	// setup canvas
	canvas = $("#drawingCanvas"); // this returns a jQuery object
	canvas.mousedown(function(event) {
		canvasMouseDown(event);
	});
	canvas.mouseup(function(event) {
		mouseUpOut(event);
	});
	canvasElement = canvas[0] // canvas[0] is the actual HTML DOM element for our drawing canvas
	context = canvasElement.getContext("2d");
	
	// attach mouse events to entire document as well
	$(window).mouseup(function(event) {
		mouseUpOut(event);
	});

	$(window).mousedown(function(event) {
		console.log(event.target);
		// check for what we clicked, ignore if we clicked any element that matches a value in tags
		if ($.inArray(event.target.tagName, tags) === -1) {
			anySelected = false;
			if (previousSelectedShape) {
				previousSelectedShape.isSelected = false;
			}
			drawShapes();
		}
	});

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

function canvasMouseDown(event) {
	// Get the canvas click coordinates.
	var clickX = event.pageX - canvasElement.offsetLeft;
	var clickY = event.pageY - canvasElement.offsetTop;
	copy = false;
	anySelected = false;
	
	// Look for the clicked shape
	for (var i=shapes.length-1; i>=0; i--) {
		var shape = shapes[i];
		if (shape.testHit(clickX,clickY)) {
			if (previousSelectedShape != null) { 
				previousSelectedShape.isSelected = false;
			}
			shape.isSelected = true;
			anySelected = true;
			console.log("hit");
			previousSelectedShape = shape;
			drawShapes();
			return;
		} else {
			shape.isSelected = false;
		}
	}
	drawShapes();
	mouseDown = true;
	if (event.button === 0) {
		$(canvas).bind('mousemove', function(event) {
			canvasMouseMove(event);
		});
	}
}

function canvasMouseMove(event) {
	var clickX = event.pageX - canvas[0].offsetLeft;
	var clickY = event.pageY - canvas[0].offsetTop;
	if (mouseDown) {
		console.log("adding shape");
		addShape(clickX, clickY);
		mouseDown = false;
	} else if (!anySelected) {
		//console.log("updating shape");
		var shape = shapes[shapes.length-1];
		shape.update(shape.x1, shape.y1, clickX, clickY);
	}
	drawShapes();
}

function mouseUpOut(event) {
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
	this.fillColour = getFillColour();
	this.update(x1, y1, x2, y2);
	this.isSelected = false; // initially false
	this.outlineWidth = defaultOutlineWidth;
	this.draw = function() {
		context.beginPath();
		context.lineWidth = this.lineWidth;
		context.moveTo(this.x1, this.y1);
		context.lineTo(this.x2, this.y2);
		context.strokeStyle = this.fillColour;
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
	var checkX = (x >= minX - xPrecision) && (x <= maxX + xPrecision); // check if x-coor within bound 
	var checkY = (y >= minY - yPrecision) && (y <= maxY + yPrecision); // check if y-coor within bound
	var m = (this.y2 - this.y1) / (this.x2 - this.x1);
	var b = this.y1 - m * this.x1;	// y-intercept
	// returns true iff point within bounds and satisfies line eq with += precision
	return (checkX && checkY && Math.abs(y - m * x - b) <= yPrecision * 2);
};

Line.prototype.update = function (x1, y1, x2, y2) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
};

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

Circle.prototype.testHit = function(x,y) {
	if (Math.sqrt(Math.pow(this.x1 - x,2) + Math.pow(this.y1 -y,2)) <= this.radius){
		return true;
	}
	return false;
};

Circle.prototype.update = function(x1, y1, x2, y2) {
	this.x1 = x1;
	this.y1 = y1;
	if ((copy)) {
		this.radius = x2; // x2=y2=radius then
	} else{
		this.radius = Math.sqrt(Math.pow(x2 - this.x1, 2) + Math.pow(y2-this.y1, 2));
	}
};

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

function eraseShape() {
	if (anySelected) {
		shapes.splice(shapes.indexOf(previousSelectedShape), 1);
		previousSelectedShape = null;
		drawShapes();
		anySelected = false;
	}
}

function changeColour() {
	if (anySelected) {
		for (var i=shapes.length-1; i>=0; i--) {
			var shape = shapes[i];
			if (shape.isSelected) {
				shape.fillColour = getFillColour();
				shape.outlineColour = getOutlineColour();
				drawShapes();
				return;
			}
		}
	}
}

function getFillColour() {
	return fillSelect.value;
}

function getOutlineColour() {
	return outlineSelect.value;
}

function copyShape() {
	if (anySelected) {
		copy = true;
		for (var i=shapes.length-1; i>=0; i--) {
			var shape = shapes[i];
			if (shape.isSelected){
				if (shape instanceof Circle) {
					//this.radius = Math.sqrt(Math.pow(x2 - this.x1, 2) + Math.pow(y2-this.y1, 2));
					// how the radius is calculated
					newShape = new Circle(shape.x1, shape.y1, shape.radius , shape.radius);
					newShape.fillColour = shape.fillColour;
					newShape.outlineColour = shape.outlineColour;
					newShape.outlineWidth = shape.outlineWidth;
				} else if (shape instanceof Rectangle){ // this one works
					newShape = new Rectangle(shape.x1, shape.y1, shape.x2+shape.x1, shape.y2+shape.y1);
					newShape.outlineColour = shape.outlineColour;
					newShape.fillColour = shape.fillColour;
					newShape.outlineWidth = shape.outlineWidth;

				} else {
					newShape = new Line(shape.x1, shape.y1, shape.x2, shape.y2);
					newShape.fillColour = shape.fillColour;
					newShape.outlineColour = shape.outlineColour;
					newShape.outlineWidth = shape.outlineWidth;
				}
				shapes.push(newShape);
				console.log(newShape);
				shapes[shapes.length-1].x1 += 100;
				shape.isSelected = false;
				copy = false;
				drawShapes();
				return;
			}
		}
	}
}


function increaseOutline() {
	if (anySelected) {
		for (var i=shapes.length-1; i>=0; i--) {
			var shape = shapes[i];
			if (shape.isSelected) {
				shape.outlineWidth += 1;
				drawShapes();
				return;
			}		
		}
	}
}

function decreaseOutline() {
	if (anySelected) {
		for (var i=shapes.length-1; i>=0; i--) {
			var shape = shapes[i];
			if (shape.isSelected) {
				if (shape.outlineWidth < 1) {
					//FIXME: 0 or 1?
					//TODO: disable button instead of alert.
					alert ("Can't have linewidth of -1!");
				} else {
					shape.outlineWidth += -1;
					drawShapes();
				}
				return;		
			}
		}
	}
}

function move() {
	
}
