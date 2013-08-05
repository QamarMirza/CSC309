<!DOCTYPE html>

<html>
<head>
	<style>
		input {
			display: block;
		}
		canvas {
            border: 2px solid;
        }
	</style>
	<script src="http://code.jquery.com/jquery-latest.js"></script>
	<script type="text/javascript" src="<?php echo base_url();?>js/arcade/battle.js"></script>
	<script>
		var time;
		var start_time;
		var now_time;
		var loginAttempts = <?= $_SESSION['loginAttempts']?>;
		$(function() {
			remaining = <?= $_SESSION['remaining'] ?>;
			date = new Date();
			start_time = Math.floor(date.getTime()/1000); // time since januar 1970? lol
			delay = Math.pow(2,loginAttempts); // time is in seconds
		});

		function checktime() {
			$(function() {
				now = new Date();
				now_time = Math.floor(now.getTime()/1000); 
				var remaining = delay - (now_time - start_time); //recalculate time remaining
				console.log(remaining);
				var r = $('[name=remaining]'); // update time remaining
				r.val(remaining);					
				if (remaining > 0 && loginAttempts > 0){
					//alert("You still have " + remaining + " seconds left before you can try again.");
					return false;
				} else if (remaining <= 0 && loginAttempts>=0){	
					return false;
				}
				return false;
			});
		}
	</script>
</head> 
<body>  
	<h1>Login</h1>

    <?php 
	    if (isset($errorMsg)) {
		    echo "<p>" . $errorMsg . "</p>";
	    }
	    echo form_open('account/login');
	    echo form_label('Username');
	    echo form_error('username');
	    echo form_input('username',set_value('username'),"required");
	    echo form_label('Password'); 
	    echo form_error('password');
	    echo form_password('password','',"required");
		echo form_submit('submit', 'Login', 'onClick=" return checktime();"');
	    
	    echo form_hidden('remaining', set_value('remaining'));
	    
	    echo "<p>" . anchor('account/newForm','Create Account') . "</p>";
	    echo "<p>" . anchor('account/recoverPasswordForm','Recover Password') . "</p>";
    ?>

    <canvas id="drawingCanvas" width="200" height="200"></canvas>

	<?php
		//$onclick = array('onclick' => "document.getElementById('captcha').src = '/tanks/securimage/securimage_show.php?' + Math.random(); return false;");
		//echo anchor('', "[ Different Image ]", $onclick);
			echo form_close();
	?>	
</body>
</html>
