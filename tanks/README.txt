README:

+-----------+-----------+
|Name:      | Student # |
+-----------+-----------+
|Qamar Mirza|997728384  |
+-----------+-----------+
|Shichu Lin |997684625  |
+-----------+-----------+

How our website works:

First you appear at the log in screen. You have two options to either log in with an existing account or to create a new one. For creating a new login to enhance security we added a captcha and for loggin in with an existing account, if you repetitivly input the wrong username/password with each wrong entry the delay of when you can do another entry is increased exponentially 2^n where n is the number of tries. This is done by putting the server to sleep so that hackers can't try and reset the number of times they've tried.

We created a tank object which consists of 3 parts: cannon, turret and tankbody. The game has been implemented such that soon as your shot has gone through the walls and didn't hit anyone it will get reloaded back to your cannon. If it hits the other tank you win and if you collide with the other tank it is a draw.

The contorols are this: move around with arrows, to turn your turret clockwise press 'd' and to turn it counter clockwise press 'a' and to shoot your cannonball press 'spacebar'. 
