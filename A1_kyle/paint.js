//holds all the shapes on the canvas
var shapes = [];
//whether user is currently drawing/altering a shape
var penDown = false;
//index of shape currently being drawn/altered in shapes array
var currentShape = -1;
//most recently selected shape
var previousSelectedShape;
//representing the canvas element and the canvas context
var canvas;
var context;
//select elements
var shapeSelect;
var colourSelect;
//holds of copy of a selected shape
var copiedShape;

colours = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'black']

window.onload = function() {

	//fill in color dropdown list
	colourSelect = document.getElementById('fill');
	for (var i = 0; i < colours.length; i ++) {
		var option = document.createElement('option');
		option.text = colours[i]
		colourSelect.add(option);
	}
		
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    shapeSelect = document.getElementById('shapes');    
    
    canvas.onmousedown = canvasMouseDown;
    canvas.onmouseup = canvasMouseUp
    canvas.onmouseout = canvasMouseUp;
    canvas.onmousemove = canvasMouseMove;
    
    context.stroke();
};


// Line Functions
function Line(canvas, x1, y1, x2, y2, colour) {
    this.update(x1, y1, x2, y2);
    this.colour=colour;
    this.isSelected=false;  
}

Line.prototype.draw = function () {
    context.beginPath();
    context.moveTo(this.x1, this.y1);
    context.lineTo(this.x2, this.y2);
    context.strokeStyle=this.colour;
    context.closePath();
	
    if (this.isSelected) {
    	context.lineWidth = 5;
    } else {
    	context.lineWidth = 1;
    }
    context.stroke();
}

Line.prototype.update = function (x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
}

Line.prototype.testHit = function (x, y) { 

    //mouse pointer can be off by this many pixels
    var pad = 5;
    
    var minY = Math.min(this.y1, this.y2);
    var maxY = Math.max(this.y1, this.y2);
    
    if (this.x1 == this.x2)
        return (x == this.x1) && (y > minY) && (y < maxY);
    
    //interpolate line function, y = mx + b
    var m = (this.y2 - this.y1) / (this.x2 - this.x1);
    var b = this.y1 - (m * this.x1);
    
    console.log('\nline function: y=' + m + 'x + ' + b);
    console.log('testing hit at (' + x + ', ' + y + ') between (' +
					 this.x1 + ', ' + this.y1 + ') and (' + 
					 this.x2 + ', ' + this.y2 + ')' );
    console.log('mx + b = ' + (x * m + b));
    
    //test if (x,y) lies on the line
    return (Math.abs(y - (x * m + b)) < pad) && (y > minY) && (y < maxY);
}


//Box Functions
function Box(canvas, x1, y1, x2, y2, colour) { 
    this.update(x1, y1, x2, y2);
    this.colour = colour;
    this.selected = false;
}

Box.prototype.draw = function () {
    context.beginPath();
    context.moveTo(this.x1, this.y1);
    context.lineTo(this.x1, this.y2);
    context.lineTo(this.x2, this.y2);
    context.lineTo(this.x2, this.y1);
    context.closePath();
	
    context.globalAlpha = 0.85;
    context.fillStyle = this.colour;
	context.strokeStyle = 'black';
    context.fill();
    if (this.isSelected) {
    	context.lineWidth = 5;
    } else {
    	context.lineWidth = 1;
    }
    context.stroke();
}

Box.prototype.update = function (x1, y1, x2, y2) { 
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
}

Box.prototype.testHit = function (x, y) { 
    //make x1 the left edge, x2 the right egde, y1 the top, y2 the bottom
    [x1,x2] = (this.x1 < this.x2) ? [this.x1, this.x2] : [this.x2, this.x1];
    [y1,y2] = (this.y1 < this.y2) ? [this.y1, this.y2] : [this.y2, this.y1];
    
    return (x >= x1 && x <= x2) && (y >= y1 && y <= y2);
}


//Circle Functions
function Circle(canvas,x, y, radius, colour) {
  this.update(x, y, radius);
  this.colour = colour;
  this.isSelected = false;
}

Circle.prototype.draw = function () {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
	
	context.globalAlpha = 0.85;
    context.fillStyle = this.colour;
    context.strokeStyle = 'black';

    if (this.isSelected) {
    	context.lineWidth = 5;
    } else {
    	context.lineWidth = 1;
    }
    context.fill();
    context.closePath();
    context.stroke(); 
  }

Circle.prototype.update = function (x, y, radius) { 
    this.x = x;
    this.y = y;
    this.radius = radius;
}

Circle.prototype.testHit = function(testX,testY) {
    var distanceFromCenter =
		Math.sqrt(Math.pow(this.x - testX, 2) +Math.pow(this.y - testY, 2));
    if (distanceFromCenter <= this.radius) 
        return true;
    return false;
}


//creates a starting shape and adds it to shape array
function addShape(baseX, baseY) {
    var shape = shapeSelect.options[shapeSelect.selectedIndex].value;
	var colour = colourSelect.options[colourSelect.selectedIndex].value;
	
    if (shape === 'line') {
        shapes.push(new Line(canvas, baseX, baseY, baseX, baseY, colour));
    }  else if (shape === 'box') {
        shapes.push(new Box(canvas, baseX, baseY, baseX, baseY, colour));
    } else {
        shapes.push(new Circle(canvas, baseX, baseY, 0, colour));
    }
}

//redraw every shape
function drawShapes() {
  // Clear the canvas.
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Go through all the shapes.
  for(var i=0; i<shapes.length; i++) {
    var shape = shapes[i];
    shape.draw();
  }
}

//delete every shape and erase them from the canvas
function clearCanvas() {
    // Remove all the shapes.
    shapes = [];

    currentShape = -1;
   
    // Update the display.
    drawShapes();
}

function copyShape() {
	copiedShape = previousSelectedShape;
}

function pasteShape() {
	
}

//remove selected shape from canvas
function eraseShape() {
    if (!previousSelectedShape) return;
    
    shapes.splice(shapes.indexOf(previousSelectedShape), 1);
    previousSelectedShape = null;
    
    drawShapes();
}

function canvasMouseDown(event) {
    var clickX = event.pageX - canvas.offsetLeft;
    var clickY = event.pageY - canvas.offsetTop;
    
    //if cursor is touching a shape, that shape is selected
    for(var i=shapes.length-1; i>=0; i--) {
        var shape = shapes[i];
        if (shape.testHit(clickX,clickY)) {
            if (previousSelectedShape) 
                previousSelectedShape.isSelected = false;
            previousSelectedShape = shape;
            shape.isSelected = true;
            
            //move shape to end of list, so it will render on top of other shapes
            shapes.splice(shapes.indexOf(shape), 1)
            shapes.push(shape);
            
            drawShapes();
            return;
        }
    }   
    //if no shape was selected, start a new shape
    penDown = true;
    addShape(clickX, clickY);
    currentShape = shapes.length - 1; 
}

function canvasMouseUp(event) {
    penDown = false;
}

function canvasMouseMove(event) {
    if (!penDown)
        return;
        
    var shape = shapes[currentShape];
    var newX = event.pageX - canvas.offsetLeft;
    var newY = event.pageY - canvas.offsetTop;
    
    if (shapeSelect.options[shapeSelect.selectedIndex].value == 'circle') {
        var newRad =
			Math.sqrt(Math.pow(shape.x - newX, 2) + Math.pow(shape.y - newY, 2));
        shape.update(shape.x, shape.y, newRad);
    } else {
        shape.update(shape.x1, shape.y1, newX, newY);
   }
    
    drawShapes();
}