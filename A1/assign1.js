/*

function circleTest () {}
function lineTest () {}
function rectangleTest () {}

*/

var previousSelectedShape;
var shapes = [];

window.onload = function() {
    canvas = document.getElementById("drawingCanvas");
    context = canvas.getContext("2d");
    canvas.addEventListener('click', canvasClick);
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

function Line(){
    /* this.x = event.pageX - canvas.offsetLeft;
    this.y = event.pageY - canvas.offsetTop;
    this.x1 = this.x + 10;
    this.y1 = this.y + 10;
    */
    this.context = canvas.getContext("2d");
    this.colour = "#ff0000"; // RED
    this.draw = function (){
        this.context.beginPath()
        this.context.lineWidth = 1;

        this.context.moveTo(100, 150);
            this.context.lineTo(450, 50);
            this.context.strokeStyle = "#ff0000"; // FIXME: COLOUR DOESN'T CHANGE
            this.context.stroke();
    };
}

function addLine(event) {
    var line = new Line();
    shapes.push(line);
    drawShapes();
}

function Circle(event) {
    /*this.check = false;
    this.x = event.pageX- canvas.offsetLeft;
    this.y = event.pageY- canvas.offsetTop;
    var x1 = event.pageX- canvas.offsetLeft;
    var y1 = event.pageY- canvas.offsetTop;
    */
        this.context = canvas.getContext("2d");

    this.radius = 10; //Math.pow(this.x-x1, 2) + Math.pow(this.y - y1, 2);
    this.color = "black";
    this.fill = "yellow";
    
    this.draw = function () {
        // Draw the circle.
        this.check = true;
        this.context.globalAlpha = 0.85; /*transparency level */
        this.context.beginPath();
        this.context.arc(100, 100, this.radius, 0, Math.PI*2);
        this.context.fillStyle = this.fill;
        this.context.strokeStyle = this.color;
        this.context.lineWidth = 1;

/*
        if (this.isSelected) {
          this.context.lineWidth = 5;
        }
        else {
          this.context.lineWidth = 1;
        }*/
        this.context.fill();
        this.context.stroke();
    };

}

function addCircle(event) {
    var circle = new Circle();
    console.log(circle);
    shapes.push(circle);
    drawShapes();
}
function Rectangle() {
    this.color = "blue";
    this.fillStyle = "yellow";
    this.lineWidth = "7";
        this.context = canvas.getContext("2d");
  
    this.draw = function() {
        this.context.beginPath();
        this.context.rect(188, 50, 200, 100);
        this.context.fillStyle = 'yellow';
        this.context.fill();
        this.context.lineWidth = 7;
        this.context.strokeStyle = 'black';
        this.context.stroke();
    };
}
function addRectangle(event) {
    var rectangle = new Rectangle();
     console.log(rectangle);
    shapes.push(rectangle);
    drawShapes();
}

function clearCanvas(event) {
	//FIXME: implement this method
}

function writeMessage(canvas, message) {
	context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
}

function canvasClick(event) {
    // Get the canvas click coordinates.
   	var clickX = event.pageX - canvas.offsetLeft;
   	var clickY = event.pageY - canvas.offsetTop;
    var message = 'Mouse position: ' + clickX + ',' + clickY;
    writeMessage(canvas, message);
	
	/*
    // Look for the clicked circle.
    for(var i=shapes.length-1; i>=0; i--) {
    	var shape = shapes[i];

	    if (shape.testHit(clickX,clickY)) {
	    	if (previousSelectedShape != null){ 
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
