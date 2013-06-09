

// This function stores the details for a single shape.
function Shape(canvas) {
	if (canvas) {
		this.context = canvas.getContext("2d");
		this.x = randomFromTo(0, canvas.width);
		this.y = randomFromTo(0, canvas.height);
	}
}

Shape.prototype.getColor = function () { 
	if (this.color == undefined) {
		var colors = ["green", "blue", "red", "yellow", "magenta", "orange", "brown", "purple", "pink"];
		this.color = colors[randomFromTo(0, 8)];
	}
	return this.color; 
};


Shape.prototype.selected = false;
Shape.prototype.setSelected = function(value) { this.selected = value;}
Shape.prototype.isSelected = function() { return this.selected;}

function Circle(canvas) {
	Shape.call(this,canvas);
	this.radius = randomFromTo(10, 60);
}

Circle.prototype = new Shape(); // clone(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.draw = function () {
    // Draw the circle.
    this.context.globalAlpha = 0.85;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    this.context.fillStyle = this.getColor();
    this.context.strokeStyle = "black";

    if (this.isSelected()) {
    	this.context.lineWidth = 5;
    }
    else {
    	this.context.lineWidth = 1;
    }
    this.context.fill();
    this.context.stroke(); 
  };

Circle.prototype.testHit = function(testX,testY) {
	var distanceFromCenter = Math.sqrt(Math.pow(this.x - testX, 2) + Math.pow(this.y - testY, 2));
	if (distanceFromCenter <= this.radius) 
		return true;
	return false;
};

function Square(canvas) {
	Shape.call(this,canvas);
	this.side = randomFromTo(10, 60);
}

Square.prototype = new Shape(); // clone(Shape.prototype);
Square.prototype.constructor = Square;

Square.prototype.draw = function () {
    // Draw the circle.
    this.context.globalAlpha = 0.85;
    this.context.beginPath();
    this.context.rect(this.x, this.y, this.side, this.side);
    this.context.fillStyle = this.getColor();
    this.context.strokeStyle = "black";

    if (this.isSelected()) {
    	this.context.lineWidth = 5;
    }
    else {
    	this.context.lineWidth = 1;
    }
    this.context.fill();
    this.context.stroke(); 
  };

Square.prototype.testHit = function(testX,testY) {
	if (this.x < testX && this.x+this.side > testX &&
		this.y < testY && this.y+this.side > testY) 
		return true;
	return false;
};



// This array hold all the circles on the canvas.
var shapes = [];

var canvas;
var context;

window.onload = function() {
  canvas = document.getElementById("canvas");
  canvas.onmousedown = canvasClick;
  context = canvas.getContext("2d");

  // fixes a bug in Firefox.  Otherwise changes to the canvas don't render
  // until the window is redrawn
  context.stroke();
};

function addRandomShape() {

  // Create the new shape.
	
  var types = [Circle, Square];
  var shape = new types[randomFromTo(0,1)](canvas);
  
  // Store it in the array.
  shapes.push(shape);

  // Redraw the canvas.
  drawShapes();
}

function clearCanvas() {
  // Remove all the circles.
  shapes = [];

  // Update the display.
  drawShapes();
}


function drawShapes() {
  // Clear the canvas.
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Go through all the shapes.
  for(var i=0; i<shapes.length; i++) {
    var shape = shapes[i];
    shape.draw();
  }
}

var previousSelectedShape;

function canvasClick(e) {
  // Get the canvas click coordinates.
  var clickX = e.pageX - canvas.offsetLeft;
  var clickY = e.pageY - canvas.offsetTop;

  // Look for the clicked circle.
  for(var i=shapes.length-1; i>=0; i--) {
    var shape = shapes[i];

    if (shape.testHit(clickX,clickY)) {
      if (previousSelectedShape != null) previousSelectedShape.setSelected(false);
      previousSelectedShape = shape;

      shape.setSelected(true);

      drawShapes();
      return;
    }
  }
}

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}
