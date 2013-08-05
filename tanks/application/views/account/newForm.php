<!DOCTYPE html>
<html>
<head>
	<style>
		input {
			display: block;
			clear: both;
		}
		label {
		    float: left;
            clear: both;
		}
		img {
            display: block;
            float: left;
            clear: both;
		}
		a {
            padding-left: 10px;
		    display: inline;
		}
		input[type=submit] {
            margin-top: 5px;
		}
	</style>
	<script src="http://code.jquery.com/jquery-latest.js"></script>
	<script>
		function checkPassword() {
			var p1 = $("#pass1"); 
			var p2 = $("#pass2");
			
			if (p1.val() == p2.val()) {
				p1.get(0).setCustomValidity("");  // All is well, clear error message
				return true;
			}	
			else	 {
				p1.get(0).setCustomValidity("Passwords do not match");
				return false;
			}
		}
	</script>
</head> 
<body>  
	<h1>New Account</h1>
    <?php
        if (isset($errorMsg)) {
		    echo "<p>" . $errorMsg . "</p>";
	    }
	    echo form_open('account/createNew/captcha_code');
	    echo form_label('Username'); 
	    echo form_error('username');
	    echo form_input('username',set_value('username'),"required");
	    echo form_label('Password'); 
	    echo form_error('password');
	    echo form_password('password','',"id='pass1' required");
	    echo form_label('Password Confirmation'); 
	    echo form_error('passconf');
	    echo form_password('passconf','',"id='pass2' required oninput='checkPassword();'");
	    echo form_label('First');
	    echo form_error('first');
	    echo form_input('first',set_value('first'),"required");
	    echo form_label('Last');
	    echo form_error('last');
	    echo form_input('last',set_value('last'),"required");
	    echo form_label('Email');
	    echo form_error('email');
	    echo form_input('email',set_value('email'),"required");
        echo form_label('Captcha');
	    echo form_error('captcha_code');
    ?>
    
    <img id="captcha" src="/tanks/securimage/securimage_show.php" alt="CAPTCHA Image" />

    <?php
        $onclick = array('onclick' => "document.getElementById('captcha').src = '/tanks/securimage/securimage_show.php?' + Math.random(); return false;");
        echo anchor('', "[ Different Image ]", $onclick);
    ?>

    <input type="text" name="captcha_code" size="10" maxlength="6" />

    <?php
        echo form_submit('submit', 'Register');
	    echo form_close();
    ?>
</body>
</html>
