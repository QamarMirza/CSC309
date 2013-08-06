var players = 2;
var player1;
var player2;
var offsetX, offsetY; // used for moving tanks
var mx = 0;
var my = 0;
var keys = {};
var gameover = false;
var id = 1; // for testing right now

$(function() {
	// setup canvas
	canvas = $("#drawingCanvas"); // this returns a jQuery object
	canvasElement = canvas[0]; // canvas[0] is the actual HTML DOM element for our drawing canvas
	context = canvasElement.getContext("2d");

	// attach key events to entire document
	$(window).keydown(function(event) {
        keys[event.keyCode] = true;
    });

    $(window).keyup(function(event) {
        delete keys[event.keyCode];
    });

	initTanks();

	//while (!gameover) {
        gameLoop();
    //}
});

function gameLoop() {
    if (id === 1) {
        if (keys[37]){
            player1.tankBody.x1 -=1;
            player1.tankBody.x2 -=1;
        }
        if (keys[38]){
            player1.tankBody.y1 -=1;
            player1.tankBody.y2 -=1;
        }
        if (keys[39]){
            player1.tankBody.x1 +=1;
            player1.tankBody.x2 +=1;
        }
        if (keys[40]){
            player1.tankBody.y1 +=1;
            player1.tankBody.y2 +=1;
        }
        player1.tankBody.draw();
    } else {
        if (keys[37]){
            player1.tankBody.x1 -=1;
            player1.tankBody.x2 -=1;
        }
        if (keys[38]){
            player1.tankBody.y1 -=1;
            player1.tankBody.y2 -=1;
        }
        if (keys[39]){
            player1.tankBody.x1 +=1;
            player1.tankBody.x2 +=1;
        }
        if (keys[40]){
            player1.tankBody.y1 +=1;
            player1.tankBody.y2 +=1;
        }
        //player2.tankBody.draw();
    }

    // redraw/reposition your object here
    // also redraw/animate any objects not controlled by the user
    
    setTimeout(gameLoop, 20);
}

/*
function keydownHandler(event){
    //console.log('keycode: '+ event.keyCode);
    if (event.keyCode === 37) { // left
        mx = -2;
        my = 0;
    } else if (event.keyCode === 38) { // up
        mx = 0;
        my = -2;
    } else if (event.keyCode === 39) { // right
        mx = 2;
        my = 0;
    } else if (event.keyCode === 40) { // down
        mx = 0;
        my = 2;
    }
};
*/

function initTanks() {
	// Clear the canvasElement.
	context.clearRect(0, 0, canvasElement.width, canvasElement.height);

	// draw tank positioned for player number
	player1 = new Tank(0, 150, 50, 200);
    player1.tankBody.fillColor = "beige";
    player1.tankBody.strokeColor = "blue";
    player1.turret.fillColor = "beige";
    player1.turret.strokeColor = "blue";
	player1.draw();
	
	player2 = new Tank(150, 0, 200, 50);
    player2.tankBody.fillColor = "beige";
    player2.tankBody.strokeColor = "green";
    player2.turret.fillColor = "beige";
    player2.turret.strokeColor = "green";
	player2.draw();
}

/*
	This is the Tank object. Its made up of a TankBody and a Turret
*/
function Tank(x1, y1, x2, y2, id) {
    this.id = id;
    this.tankBody = new TankBody(x1, y1, x2, y2);
    var centerX = x1 + (x2 - x1) / 2;
    var centerY = y1 + (y2 - y1) / 2;
    this.turret = new Turret(centerX-8, centerY-8, x2/1.5, y2/1.5);
    this.cannon = new Cannon(centerX, centerY, x2, y2);
    this.draw = function(){
        this.tankBody.draw();
        this.turret.draw();
        this.cannon.draw();
    }
}

/*
	This is the TankBody object.
	We define it's point of origin and then offset values with keyboard
*/
function TankBody(x1, y1, x2, y2) {
    this.update(x1, y1, x2, y2);
	this.outlineWidth = 3;
	this.draw = function() {
		// Draw the rectangle.
		context.globalAlpha = 0.85;
		context.beginPath();
		context.rect(this.x1, this.y1, this.x2, this.y2);
		context.fillStyle = this.fillColor;
		context.strokeStyle = this.strokeColor;
		context.fill();
		context.stroke();
	};
}

TankBody.prototype.testHit = function(x, y) {
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

TankBody.prototype.update = function(x1, y1, x2, y2) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2-this.x1; // offset value. distance between where tank begins and where mouse is
	this.y2 = y2-this.y1;
};

/*
	This is the Turret object
	We define it's point of origin and then offset values with keyboard
*/
function Turret(x1, y1, x2, y2) {
	this.update(x1, y1, x2, y2);
	this.outlineWidth = 2
	this.isSelected = false;
	this.draw = function() {
		// Draw the turret
		context.globalAlpha = 0.85;
		context.beginPath();
		context.rect(this.x1, this.y1, this.x2, this.y2);
		context.fillStyle = this.fillColor;
		context.strokeStyle = this.strokeColor;
		context.fill();
		context.stroke();
	};
}

Turret.prototype.testHit = function(x,y) {
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

Turret.prototype.update = function (x1, y1, x2, y2) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2-this.x1; // offset value. distance between where tank begins and where mouse is
	this.y2 = y2-this.y1;
};

/*
	This is the Cannon object
	We define it's point of origin and then offset values with keyboard
*/
function Cannon(x1, y1, x2, y2) {
	this.update(x1, y1, x2, y2);
	this.outlineWidth = 2
	this.draw = function() {
		// Draw the circle.
		context.globalAlpha = 0.85;
		context.beginPath();
		context.arc(this.x1, this.y1, this.radius, 0, Math.PI*2);
		context.fillStyle = "black";
		context.strokeStyle = "black";
		context.fill();
		context.stroke(); 
	};
}

Cannon.prototype.testHit = function(x, y) {
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

Cannon.prototype.update = function(x1, y1, x2, y2) {
	this.x1 = x1;
	this.y1 = y1;
	this.radius = Math.sqrt(Math.pow(x2 - this.x1, 0.75) + Math.pow(y2-this.y1, 0.75));
};

