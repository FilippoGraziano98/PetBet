#!/home/filippo/VirtualEnv/web/bin/python

from flask import Flask, request, render_template, make_response
from flask_cors import CORS
import json
from dbms import *
from logger import *

app = Flask("PetBet-Server")   ##instantiating a lightweight HTTP server
app.debug = True

CORS(app)   ## to accept cross origin requests, disabling Same Oprigin Policy

@app.after_request
def server_log(response):
	log=request.remote_addr+" - \""+request.method+" /"+request.endpoint+"\" "+response.status+" -\n"
	log+="\t "+str(request)+"\n"
	log+="\t cookies:"+str(request.cookies)+"\n"
	if request.method=="POST":
			if ("application/x-www-form-urlencoded" in request.headers['Content-Type']):
				#usr = str(request.form['username'])+","+str(request.form['password'])
				log+="\t data: "+str(request.form)
			elif ("application/json" in request.headers['Content-Type']):
				log+="\t data: "+str(request.json)
	logger.log(log)
	return response

@app.route('/')   ## adding a handler for the main page
def index():
	#response=make_response(render_template('index.html'))
	#response.set_cookie("session-id","abcd",max_age=60*60*24)#cookie lasting for a hole-day
	#return response
	#return render_template('index.html', cookies=cookies)
	return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
	if ("application/x-www-form-urlencoded" in request.headers['Content-Type']):
		usr = request.form
	elif ("application/json" in request.headers['Content-Type']):
		usr = request.json
	else :
		logger.log("\n[WARNING] Not recognizing the Content-Type of the following register request:")
		return json.dumps({"msg":"registration_failure__server_not_able_to_understand_data"})
	
	if (user_dbms.insert(usr)):
		response={"msg":"registration_success"}
	else:
		response={"msg":"registration_failure__username_already_in_use"}
	return json.dumps(response)

@app.route('/login', methods=['POST'])
def login():
	if ("application/x-www-form-urlencoded" in request.headers['Content-Type']):
		usr = request.form
	elif ("application/json" in request.headers['Content-Type']):
		usr = request.json
	else :
		logger.log("\n[WARNING] Not recognizing the Content-Type of the following login request:")
		return json.dumps({"msg":"login_failure__server_not_able_to_understand_data"})

	if (user_dbms.query(usr)):
		response={"msg":"login_success","cookies":"abcd"}
	else:
		response={"msg":"login_failure__credentials_not_valid"}
	return json.dumps(response)

print
logger=logger("logs/log.txt")
user_dbms=dbms("db/usr.txt","logs/usr_db-log.txt")
logger.log("server restarted")
print
app.run(host='0.0.0.0', port=8000)  ## to launch our server
