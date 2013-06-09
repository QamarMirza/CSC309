// This function stores the details for a single circle.
function Circle(canvas,x, y, radius, color) {
  this.context = canvas.getContext("2d");

  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.isSelected = false;
  
  this.draw = function () {
    // Draw the circle.
    this.context.globalAlpha = 0.85;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    this.context.fillStyle = this.color;
    this.context.strokeStyle = "black";

    if (this.isSelected) {
    	this.context.lineWidth = 5;
    }
    else {
    	this.context.lineWidth = 1;
    }
    this.context.fill();
    this.context.stroke(); 
  };

  this.testHit = function(testX,testY) {
	var distanceFromCenter = Math.sqrt(Math.pow(this.x - testX, 2) + Math.pow(this.y - testY, 2));
	if (distanceFromCenter <= this.radius) 
		return true;
	return false;
  };
}

// This array hold all the circles on the canvas.
var shapes = [];

var canvas;
var context;

window.onload = function() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  canvas.onmousedown = canvasClick;

  // fixes a bug in Firefox.  Otherwise changes to the canvas don't render
  // until the window is redrawn
  context.stroke();
};

function addRandomShape() {
  // Give the shape a random size and position.
  var radius = randomFromTo(10, 60);
  var x = randomFromTo(0, canvas.width);
  var y = randomFromTo(0, canvas.height);

  // Give the shape a random color.
  var colors = ["green", "blue", "red", "yellow", "magenta", "orange", "brown", "purple", "pink"];
  var color = colors[randomFromTo(0, 8)];

  // Create the new circle.
  var circle = new Circle(canvas, x, y, radius, color);

  // Store it in the array.
  shapes.push(circle);

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
      if (previousSelectedShape != null) previousSelectedShape.isSelected = false;
      previousSelectedShape = shape;

      shape.isSelected = true;

      drawShapes();
      return;
    }
  }
}

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}
