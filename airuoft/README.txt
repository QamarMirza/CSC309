
README:

			Name:    	  Student #
+----------+-------------+-----------+
|Partner 1 | Shichu Lin  | 997684625 |
|----------+-------------+-----------+
|Partner 2 | Qamar Mirza | 997728384 |
+------------------------------------+


The template for our site is split into 4 differnet components.
1) Header
2) Main
3) Navigation side bar
4) footer

The header, navigation bar and footer are static while the main component keeps getting updated through the controller.
On the navigation bar there are two points of entry, one for the user and the other for the administrator.

USER END:
On the user side the person has two options: to either display all flights and to book a flight.
Show Flights displays all the flights that are possible within the next two weeks and has a back anchor to come back to the main page.
Book Flight takes you to a view which you select a campus to depart from (default St. George) and a datepicker jQuery plugin to select a date
(not including today) in the next 2 weeks.

After you have selected a departure location (arrival is assumed to be the other) we then display all flights that have seats availble for that day 
with the same departure/arrival location. Then there is a link adjacent to each flight with the ability to check what seats are available on that flight.

Now we see a beautiful drawing of a helicopter. Upon selecting your seat you know that a white seat is available, yellow is taken and green is your current selction.
Once you are happy with your seat selection you then click take seat to where you are asked for all your personal information. 

We require that your first name only consists of letters with no spaces, same with last name, and that credit card number is only digits and the expiration date must be 
valid (at least the current month/year). To be valid your input will be the colour black, if the input is invalid your input will be red. If you try and submit an error 
diaglog will appear.

Once that is all complete it congratulates the user on their purchase and asks them kindly if they would like to print a copy of the receipt in a pop up window.

ADMIN END:

On the admin page there are 3 abilities:
1) Populate Flight Table
2) Delete all flights and tickets sold
3) display all tickets that have been sold

1 and 2 have nothing to show as it is purely adding or deleting data from the database while total tickets bought will display a table of how many tickets have been 
bought and the relevant data ( flight date, seat number, customer first and last name,  credit card number and expiration)

Thankyou for reading the README file. 
We hope you enjoy our website

Qamar Mirza
Shichu Lin