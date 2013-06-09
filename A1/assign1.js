/*assign1 javascript file*/
/*

function AddRectangle() {}
function ClearCanvas(){}
function CircleTest () {} 
function LineTest () {} 
function RectangleTest () {}  

*/
var previousSelectedShape;
var shapes = [];

function drawShapes() {
  // Clear the canvas.
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Go through all the shapes.
  for(var i=0; i<shapes.length; i++) {
    var shape = shapes[i];
    shape.draw();
  }
}

window.onload = function() {
    var canvas = document.getElementById("drawingCanvas");
    var context = canvas.getContext("2d");
};

function AddLine(event){
    this.x = event.pageX - canvas.offsetLeft;
    this.y = event.pageY - canvas.offsetTop;

}

function AddCircle(event){
    this.check = false;
    this.x = event.pageX- canvas.offsetLeft;
    this.y = event.pageY- canvas.offsetTop;
    var x1 = event.pageX- canvas.offsetLeft;
    var y1 = event.pageY- canvas.offsetTop;
    this.radius = pow(this.x-x1, 2) + pow(this.y - y1, 2);
    this.colour = "white";


    /*this.border = border;*/
    this.context = canvas.getContext("2d");
    this.draw = function () {
        // Draw the circle.
        this.check = true;
        this.context.globalAlpha = 0.85; /*transparency level */
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        this.context.fillStyle = this.color;
        
        /*this.context.strokeStyle = "black";

        if (this.isSelected) {
          this.context.lineWidth = 5;
        }
        else {
          this.context.lineWidth = 1;
        }
        this.context.fill();
        this.context.stroke(); */
    };
}


function canvasClick(event) {
    // Get the canvas click coordinates.
   var clickX = event.pageX - canvas.offsetLeft;
   var clickY = event.pageY - canvas.offsetTop;
   if (this.check == true) { /* means we're drawing the circle first, not selecting */}
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
}
