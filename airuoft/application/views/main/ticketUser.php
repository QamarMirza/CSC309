<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="<?php echo base_url();?>css/ticketUser.css"></script>
		<script src="http://code.jquery.com/jquery-latest.js"></script>
		<script src="<?php echo base_url();?>js/ticketUser.js" type="text/javascript"></script>	
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