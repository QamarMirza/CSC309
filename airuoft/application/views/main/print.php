<!DOCTYPE html>
<html>
	<head>
	<script src="http://code.jquery.com/jquery-latest.js"></script>
		<script>
			function writeMTable() {
				 top.wRef=window.open('','myconsole',
				  'width=500,height=450,left=10,top=10'
				   +',menubar=1'
				   +',toolbar=0'
				   +',status=1'
				   +',scrollbars=1'
				   +',resizable=1')
				 top.wRef.document.writeln(
				  '<html><head><title>Ticket Summary</title></head>'
				 +'<body bgcolor=white onLoad="self.focus()">'
				 +'<center><font color=red><b><i>For printing, <a href=# onclick="window.print();return false;">click here</a> or press Ctrl+P</i></b></font><br />'
				 +'<table border=0 cellspacing=3 cellpadding=3>'
				 )
				 buf =  "<th>PURCHASE SUMMARY</th> <p></p> <br />"
				 		+ "<tr>"
							+ "<td>Flight id: <td>" 
							+ "<td> <?php $data['ticketInfo']->flight_id; ?> </td>"
						+ "<tr>" 
							+ "<td>Date:</td>" 
							+ "<td><?php $data['ticketDate']; ?></td>"
						+ "</tr>" 
						+"<tr>"
							+ "<td>First Name: </td>" 
							+ "<td><?php $data['ticketInfo]->first ?></td>"
						+ "</tr>" 
						+ "<tr>"
							+ "<td>Last Name:<td>" 
							+ "<td><?php $data['ticketInfo]->last ?></td>"
						+ "</tr>"
						+ "<tr>"
							+ "<td>Seat:</td>" 
							+ "<td><?php $data['ticketInfo]->seat ?></td>"
						+ "</tr>"
						+"<tr>"
							+ "<td>Credit Card: </td>" 
							+ "<td><?php $data['ticketInfo]->creditcardnumber ?></td>"
						+ "</tr>"
						+ "<tr>"
							+ "<td>Expiration Date: </td>" 
							+ "<td><?php $data['ticketInfo]->creditcardexpiration ?></td>"
						+ "/tr>"
						+ "<tr>"
							+ "<td>Cost:</td>" 
							+ "<td>$20.00</td>"
						+ "</tr>"
				 top.wRef.document.writeln(buf+'</table></center></body></html>')
				 top.wRef.document.close()
				}
		</script>
	</head>
	<body>
		Congratulations on your ticket purchase <?php $data['first'] $data['last'] ?> !<br />
		Would you like to print a receipt? <br />
		<p>
		</p>
		<button name='print' type='button' onClick="writeMTable()"> Print Receipt </button>
	</body>
</html>