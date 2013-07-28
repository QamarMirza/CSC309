<!DOCTYPE html>
<html>
	<head>
	<script src="http://code.jquery.com/jquery-latest.js"></script>
		<script>
			$(function() {
				$('#tools').append('<li class="print"><a href="#print">Click me to print</a></li>');
				$('#tools li.print a').click(function() {
					window.print();
					return false;
				});
			});
		</script>
	</head>
	<body>
		
			PURCHASE SUMMARY
			<p> </p>
			<br />
			Flight id: 
			<br />
			Date: 
			<br />
			First Name: 
			 <br />
			Last Name: 
			<br />
			Seat: 
			<br />
			Credit Card: 
			<br />
			Expiration Date:
			<br />
			Cost: $20.00
			<p> </p>
			<br />
			<ul id="tools"></ul>
			<button name='print' onClick='window.print()'> Print </button>
	</body>
</html>