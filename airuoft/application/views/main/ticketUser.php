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
			function checkValid() {
				$(function(){
					var expField = $("#expiry")[0];
					var expVal = expField.value;
					if (!(expVal.length === 4)) {
						expField.setCustomValidity("Expiry date must be in MMYY format");
					} else {
						var month = expVal.substring(0, 2);
						var year = expVal.substring(2, 4);
						//FIXME: this needs rework
						if (month > 0 && month < 13){
							year = parseInt(year) + 2000;
							expDate = new Date(year, month, 0);
							today = new Date();
							if (expDate >= today) {	
								expField.setCustomValidity(""); // all is well, clear error message
								return true;
							} else {
								expField.setCustomValidity("Card has expired");
								return false
							}
						} else {
							expField.setCustomValidity("Invalid month");
						}
					}
				});
			}
			function checkfirstName(){
				var field = $("#first")[0];
				var fieldValue = field.value;
				if (typeof fieldValue == 'string' && fieldValue.length < 17){
					field.setCustomValidity("");
					return false;
				} else{
					field.setCustomValidity("First Name can only contain letters");
					return true
				}
			}
			function checklastName(){
				var field = $("#last")[0];
				var fieldValue = field.value;
				if (typeof fieldValue == 'string' && fieldValue.length < 17){
					field.setCustomValidity("");
					return false;
				} else{
					field.setCustomValidity("Last Name can only contain letters");
					return true
				}
			}
			function checkNum(){
				var field = $("#creditcardnumber")[0];
				var fieldValue = field.value;
				if (typeof parseInt(fieldValue) == 'number' && fieldValue.length === 16 ){
					field.setCustomValidity("");
					return false;
				} else {
					field.setCustomValidity("Credit Card Number needs to contain 16 digits");
					return true
				}
			}
		</script>
	</head> 
	<body>  
		<h1>User Information</h1>
	<?php 
		echo validation_errors(); 
		date_default_timezone_set("UTC");
		echo form_open('main/buyTicket');

		echo form_label('First Name:'); 
		echo form_error('FirstName');
		echo form_input('FirstName', set_value('setFirstName'), "required | pattern='[a-zA-Z]' | max_length[16] | oninput='checkfirstName()' id='first' ");
		
		echo form_label('Last Name:'); 
		echo form_error('LastName');
		echo form_input('LastName', set_value('setLastName'),  "required | pattern='[a-zA-Z]' | max_length[16] id='last' oninput='checklastName()' " );
		
		echo form_label('Credit Card:'); 
		echo form_error('CreditCard');
		echo form_input('CreditCard', set_value('setCreditCardNumber'), "required pattern='\d{16}' id='creditcardnumber' oninput='checkNum()' ");
		
		echo form_label('Credit Card Expiration Date (MMYY)');
		echo form_input('CreditCardExpr', set_value('setCreditCardExpir'), "required pattern='\d{4}' oninput='checkValid()' id ='expiry'"); 
		echo form_error('CreditCardExpr');

		echo "<br />";
		
		echo form_submit('submit', 'Buy Ticket');
		echo form_close();
	?>
	</body>
</html>