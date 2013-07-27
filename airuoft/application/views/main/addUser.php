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
			function checkValid(){
				var date = $("#expiry");
				var day = date.val();
				 month = day.substring(0, 2);
				 year = day.substring(2, 4);
				if (!(day.length == 4)){
					date.get(0).setCustomValidity("Expiry Date Invalid");
				} else{
					if (month > 0 && month < 13){
						year = parseInt(year) + 2000;
						newday = new Date(year, month, 0);
						today = new Date();
						if (newday >= today) {	
							date.get(0).setCustomValidity(""); // all is well, clear error message
							return true;
						} else {
							date.get(0).setCustomValidity("Expiry Date invalid");
							return false
						}
					} else {
						date.get(0).setCustomValidity("Expiry Date invalid");
					}
				}
			}
			
		</script>
	</head> 
	<body>  
		<h1>User Information</h1>
	<?php 
	    echo validation_errors(); 
	    date_default_timezone_set("america/toronto");
		echo form_open('info/buyTicket');

		echo form_label('First Name:'); 
		echo form_error('FirstName');
		echo form_input('FirstName', set_value('setFirstName'), "required | pattern='[a-zA-Z]+' | max_length[6] | title='Only letters are allowed.' ");
		
		echo form_label('Last Name:'); 
		echo form_error('LastName');
		echo form_input('LastName', set_value('setLastName'),  "required | pattern='[a-zA-Z]+' | max_length['16'] title='Only letters are allowed. Can't exceed 16 characteres.' " );
		
		echo form_label('Credit Card:'); 
		echo form_error('CreditCard');
		echo form_password('CreditCard', set_value('setCreditCardNumber'), "required pattern='\d{16}' title='XXXXXXXXXXXXXXXX' ");
		
		echo form_label('Credit Card Expiration Date');
		echo form_input('CreditCardExpr', set_value('setCreditCardExpir'), "required pattern='\d{4}' oninput='checkValid()' id ='expiry' title='MMYY' "); 
		echo form_error('CreditCardExpr');

		echo "<br />";
		
		echo form_submit('submit', 'Buy Ticket');
		echo form_close();
	?>
	</body>
</html>