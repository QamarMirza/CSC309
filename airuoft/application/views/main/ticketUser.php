<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="<?php echo base_url();?>css/ticketUser.css"></script>
		<script src="http://code.jquery.com/jquery-latest.js"></script>
		<script src="<?php echo base_url();?>js/ticketUser.js" type="text/javascript"></script>	
	</head>
	<body>
		<h2>User Information</h2>
	<?php 
		echo validation_errors(); 
		date_default_timezone_set("UTC");
		echo form_open('main/buyTicket');

		echo form_label('First Name:'); 
		echo form_error('firstName');
		echo form_input('firstName', set_value('firstName'), "required | pattern='[a-zA-Z]+' | max_length[16] | oninput='checkfirstName()' id='first' ");
		
		echo form_label('Last Name:'); 
		echo form_error('lastName');
		echo form_input('lastName', set_value('lastName'),  "required | pattern='[a-zA-Z]+' | max_length[16] id='last' oninput='checklastName()' " );
		
		echo form_label('Credit Card:'); 
		echo form_error('creditCard');
		echo form_input('creditCard', set_value('creditCard'), "required pattern='\d{16}' id='creditcardnumber' oninput='checkNum()' ");
		
		echo form_label('Credit Card Expiration Date (MMYY)');
		echo form_input('creditCardExpr', set_value('creditCardExpr'), "required pattern='\d{4}' oninput='checkValid()' id ='expiry'"); 
		echo form_error('creditCardExpr');

		echo "<br />";
		
		echo form_submit('submit', 'Buy Ticket');
		echo form_close();
	?>
	</body>
</html>