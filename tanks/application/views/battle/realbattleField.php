<!DOCTYPE html>
<html>
<head>
	<script src="http://code.jquery.com/jquery-1.8.3.js"></script>
	<script src="<?= base_url() ?>/js/jquery.timers.js"></script>
	<script>
		var otherUser = <?php echo json_encode($otherUser); ?>;
		var user = <?php echo json_encode($user); ?>;
		//var otherUser = "<?= $otherUser->login ?>";
		//var user = "<?= $user->login ?>";
		var status = "<?= $status ?>";
        player1 = null;
        player2 = null;
        var keys = {};
        var gameover = false;
        var myId = parseInt("<?= $user->id ?>"); // for testing right now
        var otherId = parseInt("<?= $otherUser->id ?>"); // for testing right now
        var hit = false;
        var reset = false;
        var fire_once = false;
        
		$(function(){
			$('body').everyTime(2000, function(){
			    if (status == 'waiting') {
					$.getJSON('<?= base_url() ?>arcade/checkInvitation',function(data, text, jqZHR){
						if (data && data.status =='rejected') {
							alert("Sorry, your invitation to battle was declined!");
							//window.location.href = '<?= base_url() ?>arcade/index';
						}
						if (data && data.status =='accepted') {
							status = 'battling';
							$('#status').html('Battling ' + otherUser.login);
						}
					});
				}
			});

	        // setup canvas
   	        canvas = $("#drawingCanvas"); // this returns a jQuery object
            canvas.everyTime(1000, function() {
                var url = "<?= base_url() ?>combat/getCoordinates";
				$.getJSON(url, function (data, text, jqXHR){
					if (data && data.status =='success') {
                        //console.log(data);
                        if (!player2) {
                            player2 = new Tank(parseInt(data.x1), parseInt(data.y1), 50, 50, parseInt(data.angle), otherId);
                            player2.shot = parseInt(data.shot);
                            player2.hit = parseInt(data.hit);
                            player2.tankBody.fillColor = "beige";
                            player2.tankBody.strokeColor = "green";
                            player2.turret.fillColor = "beige";
                            player2.turret.strokeColor = "green";
                            player2.cannon.fillColor = "green";
                            player2.draw();

                            player1 = new Tank(parseInt(data.y1), parseInt(data.x1), 50, 50, 360 - parseInt(data.angle), myId);
                            player1.shot = parseInt(data.shot);
                            player1.hit = parseInt(data.hit);
                            player1.tankBody.fillColor = "beige";
                            player1.tankBody.strokeColor = "blue";
                            player1.turret.fillColor = "beige";
                            player1.turret.strokeColor = "blue";
                            player1.cannon.fillColor = "blue";
                            player1.draw();
                            
                            setInterval(function(){
                                gameLoop();
                            }, 50);
                        } else {
                            player2.tankBody.x1 = parseInt(data.x1);
                            player2.tankBody.y1 = parseInt(data.y1);
                            player2.turret.x1 = parseInt(data.x2);
                            player2.turret.y1 = parseInt(data.y2);
                            player2.turret.angle = toRad(parseInt(data.angle));
                            player2.cannon.x1 = parseInt(data.x1) + 25;
                            player2.cannon.y1 = parseInt(data.y1) + 25;
                            player2.shot = parseInt(data.shot);
                            player2.hit = parseInt(data.hit);
                        }
					}
				});
            });
	        canvasElement = canvas[0]; // canvas[0] is the actual HTML DOM element for our drawing canvas
	        context = canvasElement.getContext("2d");
    
	        // attach key events to entire document
	        $(window).keydown(function(event) {
                keys[event.keyCode] = true;
            });

            $(window).keyup(function(event) {
                delete keys[event.keyCode];
            });

            // variable to hold request
			$('form').submit(function(event){
                // abort any pending request
                if (request) {
                    request.abort();
                }

				var url = "<?= base_url() ?>combat/postCoordinates";
				var data = {
				    "x1": player1.tankBody.x1,
		            "y1": player1.tankBody.y1,
		            "x2": player1.turret.x1,
		            "y2": player1.turret.y1,
		            "angle": toDeg(player1.turret.angle),
		            "shot": player1.shot,
		            "hit": player1.hit
		        }
                
                // fire off the request to /form.php
				request = $.ajax({
                    url: url,
                    data: data,
                    success: function(data){
                        console.log("succeededdd");
                    },
                    error: function(){
                        console.log("faileddd");
                    },
                    type: 'POST'
                });
				return false;
			});
            //initTanks();
            if (player1 && player2) {
                $('[type=submit]').trigger('click');
                $('form').everyTime(500, function() {
                    $('[type=submit]').trigger('click');
                    console.log("postin");
                });
                setInterval(function(){
                    gameLoop();
                }, 40);
            }
		});

        function gameLoop() {
            // Clear the canvas with some shadow effect for movement
            context.fillStyle = "rgba(255, 255, 255, .5)";
	        context.fillRect(0, 0, canvasElement.width, canvasElement.height);
            if (!hit) {
                if (myId === player1.id) {
                    if (keys[37]) {
		                if (player1.tankBody.x1 > 0) {
                        	player1.tankBody.x1 -=1;
                        	player1.turret.x1 -=1;
                            if (!player1.cannon.inMotion){
                            	player1.cannon.x1 -=1;
                    		}
                    	}
                    }
                    if (keys[38]){
                        if (player1.tankBody.y1 > 0){
                            player1.tankBody.y1 -=1;
                            player1.turret.y1 -=1;
                            if (!player1.cannon.inMotion){
                            	player1.cannon.y1 -=1;
                            }
                    	}
                    }
                    if (keys[39]){
                        if (player1.tankBody.w + player1.tankBody.x1 < canvas[0].width){
                            player1.tankBody.x1 +=1;
                            player1.turret.x1 +=1;
                            if (!player1.cannon.inMotion){
                            	player1.cannon.x1 +=1;
                            }
                    	}
                    }
                    if (keys[40]){
                        if (player1.tankBody.h + player1.tankBody.y1 < canvas[0].height){
                        	player1.tankBody.y1 +=1;
                        	player1.turret.y1 +=1;
                        	if (!player1.cannon.inMotion){
                        		player1.cannon.y1 +=1;
                        	}
                        }
                    }
                    if (keys[65]){
                        player1.turret.angle -= 0.1;
                    }
                    if (keys[68]){
                        player1.turret.angle += 0.1;
                    }
                    if (keys[32]){
                    	if (!player1.cannon.inMotion){
                    		player1.cannon.inMotion = true;
                            reset = false;
                            cannon_angle = player1.turret.angle;
                            player1.fire();
                        }
                    }
                    console.log(player1.turret.angle);
                } else {
                    if (keys[37]){
	                    if (player2.tankBody.x1 > 0){
                        	player2.tankBody.x1 -=1;
                        	player2.turret.x1 -=1;
	                        if (!player2.cannon.inMotion){
	                        	player2.cannon.x1 -=1;
	                        }
                    	}
                    }
                    if (keys[38]){
                        if (player2.tankBody.y1 > 0){
                        	player2.tankBody.y1 -=1;
                        	player2.turret.y1 -=1;
	                    	if (!player2.cannon.inMotion){
	                    		player2.cannon.y1 -=1;
	                    	}
	                    }
                    }
                    if (keys[39]){
                        if (player2.tankBody.w + player2.tankBody.x1 < canvas[0].width){
                        	player2.tankBody.x1 +=1;
                        	player2.turret.x1 +=1;
	                        if (!player1.cannon.inMotion){
	                       		player2.cannon.x1 +=1;
	                       	}
	                    }
                    }
                    if (keys[40]){
                        if (player2.tankBody.h + player2.tankBody.y1 < canvas[0].height){
                        	player2.tankBody.y1 +=1;
                        	player2.turret.y1 +=1;
	                        if (!player2.cannon.inMotion){
	                            player2.cannon.y1 +=1;
	                        }
	                    }
                    }
                }
                player1.draw();
                player2.draw();
                //checkCollision();
                if (player1 && player2) {
                    //$('[type=submit]').trigger('click');
                }
            }

            // redraw/reposition your object here
            // also redraw/animate any objects not controlled by the user
            if (!hit){
            	//setTimeout(gameLoop, 50);
	        }
        }

        function initTanks() {
	        // Clear the canvasElement.
	        context.clearRect(0, 0, canvasElement.width, canvasElement.height);

	        // draw tank positioned for player1
	        player1 = new Tank(0, 150, 50, 50, 0, myId);
            player1.tankBody.fillColor = "beige";
            player1.tankBody.strokeColor = "blue";
            player1.turret.fillColor = "beige";
            player1.turret.strokeColor = "blue";
            player1.cannon.fillColor = "blue";
	        player1.draw();

	        // draw tank positioned for player2
	        //player2 = new Tank(150, 0, 50, 50, 270, otherId);
            //player2.tankBody.fillColor = "beige";
            //player2.tankBody.strokeColor = "green";
            //player2.turret.fillColor = "beige";
            //player2.turret.strokeColor = "green";
            //player2.cannon.fillColor = "green";
	        //player2.draw();
        }

        /*
	        This is the Tank object. Its made up of a TankBody and a Turret
        */
        function Tank(x1, y1, w, h, angle, id) {
            this.id = id;
            this.tankBody = new TankBody(x1, y1, w, h);
            var centerX = x1 + w / 2;
            var centerY = y1 + h / 2;
            this.turret = new Turret(centerX-8, centerY-17, w/3, h/1.5, angle);
            this.cannon = new Cannon(centerX, centerY);
            this.draw = function() {
                this.tankBody.draw();
                this.turret.draw();
                this.cannon.draw();
            }
            var thisTank = this;
            this.fire = function() {
    	        context.save();
    	        context.translate(thisTank.cannon.x1 + thisTank.cannon.radius/2, thisTank.cannon.y1 + thisTank.cannon.h/2); // new point of origin
    	        thisTank.cannon.x1 -= Math.cos(cannon_angle + Math.PI/2);
    	        thisTank.cannon.y1 -= Math.sin(cannon_angle + Math.PI/2);
    	        context.restore();
    	        //thisTank.tankBody.testHit();
    	        if (!reset){
    	            setTimeout(thisTank.fire, 20);
    	        }
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
            this.h = h;
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
        TankBody.prototype.testHit = function() {
            /* check if cannon hit tank */
	        if ((player1.cannon.x1 - player1.cannon.radius <= player2.tankBody.x1 + player2.tankBody.w) && (player1.cannon.x1 + player1.cannon.radius>= player2.tankBody.x1)){
		        if ((player1.cannon.y1 - player1.cannon.radius <= player2.tankBody.y1 + player2.tankBody.h) && (player1.cannon.y1 + player1.cannon.radius >= player2.tankBody.y1)){
			        console.log('hhhhhhittttttttttttttttt');
                    //window.location.href = '<?= base_url() ?>arcade/index';
		        }
	        }

            /* check if cannon out of bound */
	        if ((player1.cannon.x1 - player1.cannon.radius <= 0) || (player1.cannon.x1 + player1.cannon.radius>= canvas[0].width)){
		        console.log('out on x');
		        // reset to tank
		            var centerX = player1.tankBody.x1 + player1.tankBody.w / 2;
            		var centerY = player1.tankBody.y1 + player1.tankBody.h / 2;
			        player1.cannon.x1 = centerX;
			        player1.cannon.y1 = centerY;
			        reset = true;
            		player1.cannon.inMotion = false;
	        }
	
	        if ((player1.cannon.y1 - player1.cannon.radius <= 0) || (player1.cannon.y1 + player1.cannon.radius >= canvas[0].height)){
		        console.log('out on y');
		        // reset to tank
	            var centerX = player1.tankBody.x1 + player1.tankBody.w / 2;
        		var centerY = player1.tankBody.y1 + player1.tankBody.h / 2;
		        player1.cannon.x1 = centerX;
		        player1.cannon.y1 = centerY;
		        reset = true;
		        player1.cannon.inMotion = false;
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
            this.h = h;
            this.inMotion = false;
            //this.angle = angle;
	        this.angle = toRad(angle); // this is the initial angle upon construction
	        this.outlineWidth = 2;
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
        function Cannon(x1, y1) {
	        this.x1 = x1;
	        this.y1 = y1;
	        this.radius = 5;
	        this.outlineWidth = 2;
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

        function toRad(deg) {
            return deg * Math.PI / 180;
        }
        function toDeg(rad) {
            return rad * 180 / Math.PI;
        }
	</script>
</head> 
<body>  
	<h1>Battle Field</h1>

	<div>
    	Hello <?= $user->fullName() ?>  <?= anchor('account/logout','(Logout)') ?>  <?= anchor('account/updatePasswordForm','(Change Password)') ?>
	</div>
	
	<div id='status'>
	<?php 
		if ($status == "battling")
			echo "Battling " . $otherUser->login;
		else
			echo "Wating on " . $otherUser->login;
	?>
	</div>
	
    <?php 
	    echo form_open();
        echo form_submit('Send','Send');
	    echo form_close();
    ?>

    <canvas id="drawingCanvas" width="200" height="200"></canvas>
</body>
</html>
