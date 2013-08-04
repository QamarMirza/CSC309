<!DOCTYPE html>

<html>
	<head>
		<style>
			input {
				display: block;
			}
		</style>
	</head> 
<body>  
	<h1>Login</h1>

    <?php 
	    if (isset($errorMsg)) {
		    echo "<p>" . $errorMsg . "</p>";
	    }
	    echo form_open('account/login/captcha_code');
	    echo form_label('Username');
	    echo form_error('username');
	    echo form_input('username',set_value('username'),"required");
	    echo form_label('Password'); 
	    echo form_error('password');
	    echo form_password('password','',"required");
	    echo form_submit('submit', 'Login');
	    echo "<p>" . anchor('account/newForm','Create Account') . "</p>";
	    echo "<p>" . anchor('account/recoverPasswordForm','Recover Password') . "</p>";
    ?>

    <img id="captcha" src="/tanks/securimage/securimage_show.php" alt="CAPTCHA Image" />
    <input type="text" name="captcha_code" size="10" maxlength="6" />

    <?php
        $onclick = array('onclick' => "document.getElementById('captcha').src = '/tanks/securimage/securimage_show.php?' + Math.random(); return false;");
        echo anchor('', "[ Different Image ]", $onclick);
	    echo form_close();
    ?>	
</body>
</html>
