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
    	<script type="text/javascript" src="<?php  base_url()?>js/arcade/battle.js"></script>
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
    	echo form_submit('submit', 'Login');
        echo "<p>" . anchor('account/newForm','Create Account') . "</p>";
        echo "<p>" . anchor('account/recoverPasswordForm','Recover Password') . "</p>";
        echo form_close();
        ?>

    	 <canvas id="myCanvas" width="200" height="200" />

    </body>
</html>
