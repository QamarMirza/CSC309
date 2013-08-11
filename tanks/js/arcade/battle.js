var players = 2;
var player1;
var player2;
var keys = {};
var gameover = false;
var id = 1; // for testing right now
var hit = false;

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

function checkCollision(){
	if (player2.tankBody.y1 + player2.tankBody.h >= player1.tankBody.y1){
		if (((player2.tankBody.x1<=player1.tankBody.x1 + player1.tankBody.w) && (player1.tankBody.x1 <=  player2.tankBody.x1 + player2.tankBody.w)) 
			|| 
			((player1.tankBody.x1<=player2.tankBody.x1 + player2.tankBody.w) && (player2.tankBody.x1 <=  player1.tankBody.x1 + player1.tankBody.w)) ){
			console.log('HHHHHHHIIIIITTT');
			window.location = "account/loginForm";
			hit =true;
		}
	}
}

function gameLoop() {
    // Clear the canvas with some shadow effect for movement
    context.fillStyle = "rgba(255, 255, 255, .5)";
	context.fillRect(0, 0, canvasElement.width, canvasElement.height);
    if (!hit) {
        if (id === 1) {
            if (keys[37]){
			    if (player1.tankBody.x1 > 0){
                player1.tankBody.x1 -=1;
                player1.turret.x1 -=1;
                player1.cannon.x1 -=1;
            	}
            }
            if (keys[38]){
	            if (player1.tankBody.y1 > 0){
                player1.tankBody.y1 -=1;
                player1.turret.y1 -=1;
                player1.cannon.y1 -=1;
            	}
            }
            if (keys[39]){
	            if (player1.tankBody.w + player1.tankBody.x1 < canvas[0].width){
                player1.tankBody.x1 +=1;
                player1.turret.x1 +=1;
                player1.cannon.x1 +=1;
            	}
            }
            if (keys[40]){
	            if (player1.tankBody.h + player1.tankBody.y1 < canvas[0].height){
                	player1.tankBody.y1 +=1;
                	player1.turret.y1 +=1;
                	player1.cannon.y1 +=1;
                }
            }
            if (keys[65]){
                player1.turret.angle -= 0.1;
            }
            if (keys[68]){
                player1.turret.angle += 0.1;
            }
            if (keys[32]){
                console.log("FIRE IN THE HOLE");
                player1.fire();
            }
        } else {
            if (keys[37]){
		        if (player2.tankBody.x1 > 0){
                	player2.tankBody.x1 -=1;
                	player2.turret.x1 -=1;
		            player2.cannon.x1 -=1;
            	}
	        }
            if (keys[38]){
	            if (player2.tankBody.y1 > 0){
                	player2.tankBody.y1 -=1;
                	player2.turret.y1 -=1;
		        	player2.cannon.y1 -=1;
		        }
            }
            if (keys[39]){
	            if (player2.tankBody.w + player2.tankBody.x1 < canvas[0].width){
                	player2.tankBody.x1 +=1;
                	player2.turret.x1 +=1;
		            player2.cannon.x1 +=1;
		        }
            }
            if (keys[40]){
	            if (player2.tankBody.h +player2.tankBody.y1 < canvas[0].height ){
                	player2.tankBody.y1 +=1;
                	player2.turret.y1 +=1;
		                player2.cannon.y1 +=1;
		        }
            }
        }
    }
    player1.draw();
    player2.draw();
        
    // send coordinates to database of player1 
    /*
    var url = "<?= base_url()?>/account/updateCoordinates";
    var player = $(this).serializedArray();
    var arg = "json="+json.stringify(player);
    $.ajax({
    	url : url,
    	data : arg,
    	type: post
    });
    */
    checkCollision();

    // redraw/reposition your object here
    // also redraw/animate any objects not controlled by the user
    if (!hit){
    	setTimeout(gameLoop, 25);
	}
}

function initTanks() {
	// Clear the canvasElement.
	context.clearRect(0, 0, canvasElement.width, canvasElement.height);

	// draw tank positioned for player1
	player1 = new Tank(0, 150, 50, 50, 0);
    player1.tankBody.fillColor = "beige";
    player1.tankBody.strokeColor = "blue";
    player1.turret.fillColor = "beige";
    player1.turret.strokeColor = "blue";
    player1.cannon.fillColor = "blue";
	player1.draw();

	// draw tank positioned for player2
	player2 = new Tank(150, 0, 50, 50, 270);
    player2.tankBody.fillColor = "beige";
    player2.tankBody.strokeColor = "green";
    player2.turret.fillColor = "beige";
    player2.turret.strokeColor = "green";
    player2.cannon.fillColor = "green";
	player2.draw();
}

/*
	This is the Tank object. Its made up of a TankBody and a Turret
*/
function Tank(x1, y1, w, h, angle) {
    this.tankBody = new TankBody(x1, y1, w, h);
    var centerX = x1 + w / 2;
    var centerY = y1 + h / 2;
    this.turret = new Turret(centerX-8.5, centerY-17, w/3, h/1.5, angle);
    this.cannon = new Cannon(centerX, centerY);
    this.draw = function() {
        this.tankBody.draw();
        this.turret.draw();
        this.cannon.draw();
    }
    var thisTank = this;
    this.fire = function() {
        var angle = thisTank.turret.angle;
        context.save();
        
        thisTank.cannon.x1 += 5;
        thisTank.cannon.y1 -= 5;

        context.restore();
    	setTimeout(thisTank.fire, 25);
    }
}

/*
	This is the TankBody object.
	We define it's point of origin and then offset values with keyboard
*/
function TankBody(x1, y1, w, h) {
    this.x1 = x1;
    this.y1 = y1;
    this.w = w;
    this.h = h,
	this.outlineWidth = 3;
	this.draw = function() {
		// Draw the rectangle.
		context.beginPath();
		context.rect(this.x1, this.y1, this.w, this.h);
		context.fillStyle = this.fillColor;
		context.strokeStyle = this.strokeColor;
		context.fill();
		context.stroke();
	};
}

//FIXME: has to be changed
TankBody.prototype.testHit = function(x1, y1) {
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

	if (this.w < 0) {
		if (this.h < 0) { // if box is drawn bottom right to top left
			if (this.h < 0) { 
				if (this.x1  + precision> x1 && this.x1+this.w - precision < x1 && this.y1 + precision > y1 && this.y1+this.h - precision < y1) { 
					return true;
				}
				return false;
			}
		} else { // x1 >0, box is drawn top right to bottom left
			if (this.h > 0) { 
				if (this.x1 +precision > x1 && this.x1+this.w  - precision< x1 && this.y1  - precision< y1 && this.y1+this.h + precision > y1) {
					return true;
				}
				return false;
			}
		}
	} else { // x1 > 0
		if (this.h < 0) { // box is drawn bottom left to top right
			if (this.x1 - precision< x1 && this.x1+this.w +precision> x1 && this.y1  + precision> y1 && this.y1+this.h - precision< y1) {
				return true;
			}
			return false;
		} else { // y > 0, box is drawn top left to bottom right 
			if (this.x1 - precision < x1 && this.x1+this.w  + precision> x1 && this.y1 - precision < y1 && this.y1+this.h + precision > y1) {
				return true;
			}
			return false;
		}
	}
};

/*
	This is the Turret object
	We define it's point of origin and then offset values as the tank moves
*/
function Turret(x1, y1, w, h, angle) {
    this.x1 = x1;
    this.y1 = y1;
    this.w = w;
    this.h = h,
    //this.angle = angle;
	this.angle = angle * Math.PI / 180; // this is the initial angle upon construction
	this.outlineWidth = 2
	this.draw = function() {
		// Draw the turret
		context.save(); // saves the coordinate system
		
		context.translate(this.x1 + this.w/2, this.y1 + this.h/2); // new point of origin
        context.rotate(this.angle); // rotate around the center point

        // main turret
		context.beginPath();
		context.rect(-1*(this.w/2), -1*(this.h/2), this.w, this.h);
		context.fillStyle = this.fillColor;
		context.strokeStyle = this.strokeColor;
		context.fill();
		context.stroke();

		// draw an extra line to indicate bottom end of turret
        context.beginPath();
        context.rect(-1*(this.w/2), -1*(this.h/2 - 22), this.w , 1);
		context.stroke();
		
		context.restore(); // restores the coordinate system back to (0,0)
	};
}

/*
	This is the Cannon object
	We define it's point of origin and then offset values with keyboard
*/
function Cannon(x1, y1, angle) {
	this.x1 = x1;
	this.y1 = y1;
	this.angle = angle * Math.PI / 180; // this is the initial angle upon construction
	this.radius = 5
	this.outlineWidth = 2
	this.draw = function() {
		// Draw the cannon
		context.beginPath();
		context.arc(this.x1, this.y1, this.radius, 0, Math.PI*2);
		context.fillStyle = this.fillColor;
		context.strokeStyle = "black";
		context.fill();
		context.stroke();
	};
}

