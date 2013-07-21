<!DOCTYPE html>
<html>
	<head>
		<style>
			input {
				display: block;
			}
			input:valid{
				color: green;
			}
			input:invalid{
				color: red;
			}
		</style>
		<script src="http://code.jquery.com/jquery-latest.js"></script>
		<script> </script>
	</head> 
<body>  
	<h1>User Information</h1>

<?php 
    echo validation_errors(); 
	echo form_open('info/register');

	echo form_label('First Name:'); 
	echo form_error('FirstName');
	echo form_input('FirstName', set_value('setFirstName'), "required" );
	
	echo form_label('Last Name:'); 
	echo form_error('LastName');
	echo form_input('LastName', set_value('setLastName'),  "required" );
	
	echo form_label('Credit Card:'); 
	echo form_error('CreditCard');
	echo form_password('CreditCard', set_value('setCreditCardNumber'), "required pattern='\d{16}' title='XXXXXXXXXXXXXXXX'"   );
	
	echo form_label('Credit Card Expiration Date');
	echo form_error('CreditCardExpr');
	echo form_input('CreditCardExpr' , set_value('setCreditCardExpir'), "required pattern='\d{2}\/\d{2}' title='MM/DD'"); 
	echo "<br />";
	echo form_submit('submit', 'Register');
	echo form_close();
?>
</body>