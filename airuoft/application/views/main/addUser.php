<!DOCTYPE html>
<html>
	<head>
		<style>
			input {
				display: block;
			}
			input:valid{
				color: black;
			}
			input:invalid{
				color: red;
			}
		</style>
		<script src="http://code.jquery.com/jquery-latest.js"></script>
		<script> 
		/*	function checkValid(){
				var date = $("#expiry");
				var day = date.value + ' ';
				var month = day.substring(0, 1);
				var year = day.substring(3, 4);
				console.log(date.value);
				var today = new Date();
				var todayMonth = today.getMonth()+1; //January is 0!
				var todayYear = today.getFullYear();
				todayYear = todayYear.substring(2,3);

				if (year > todayYear) {
					date.get(0).setCustomValidity(""); // all is well, clear error message
					return true;
				} else if (year == todayYear) {
						if (month > todayMonth && month < 13){
							date.get(0).setCustomValidity(""); // all is well, clear error message
							return true;
						} else {
							date.get(0).setCustomValidity("Expiry Date invalid");
						}
				} else {
					date.get(0).setCustomValidity("Expiry Date invalid");
				}
			}*/
		</script>
	</head> 
	<body>  
		<h1>User Information</h1>
	<?php 
	    echo validation_errors(); 
	    date_default_timezone_set("america/toronto");
		echo form_open('info/register');
 
		echo form_label('First Name:', '', 'style="display: inline" ' ); 
		echo form_error('FirstName');
		echo form_input('FirstName', set_value('setFirstName'), "required" );
		
		echo form_label('Last Name:'); 
		echo form_error('LastName');
		echo form_input('LastName', set_value('setLastName'),  "required" );
		
		echo form_label('Credit Card:'); 
		echo form_error('CreditCard');
		echo form_password('CreditCard', set_value('setCreditCardNumber'), "required pattern='\d{16}' title='XXXXXXXXXXXXXXXX' ");
		
		echo form_label('Credit Card Expiration Date');
		echo form_error('CreditCardExpr');
		$todayMonth = date("m");
		$todayYear = date("y");
		$data = array('name' => 'CreditCardExpr', 'id' => 'expiry', 'title' => 'MMYY', ); // same as <input type="text" id="datepicker" /> 
		echo form_input($data, set_value('setCreditCardExpir'), "required  "); 

		echo "<br />";
		echo form_submit('submit', 'Register');
		echo form_close();
	?>
	</body>
</html>