=========================
=========================
testing the server:

$nc localhost 8000

=========================
1. asking for index.html

GET /
=========================

2. posting a request

POST /register HTTP/1.1
Content-Type: application/json
Content-Length: 48

{"username": "gerald", "password": "h4ck3rpwd"}
-----

POST /login HTTP/1.1
Content-Type: application/json
Content-Length: 48

{"username": "gerald", "password": "h4ck3rpwd"}

=========================


=========================
=====   server.py   =====
in the server I read the values from post using

		##following way to get post data if request from html like :
			#<form name="register" action="http://filippo-ubuntu:8000/register" method=post>
		 #or using jQuery
		try:
	->	usr = str(request.form['username'])+","+str(request.form['password'])

		##following way to get post data if request from nc
		 #or from js using XMLHttpRequest
		except:
	->	user_data=request.json
	->	usr=str(user_data.get('username'))+","+str(user_data.get('password'))

		#I surrounded the two possible reads with try/except
		#so us not to change all the time the server, no I'll get error only if both read attempts fail
=========================
