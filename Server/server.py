#!/bin/bash
"exec" "$HOME/VirtualEnv/web/bin/python" "$0"
#multiline shebang
#http://rosettacode.org/wiki/Multiline_shebang#Python

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
	log+="\t\t cookies:"+str(request.cookies)+"\n"
	if request.method=="POST":
			if ("application/x-www-form-urlencoded" in request.headers['Content-Type']):
				#usr = str(request.form['username'])+","+str(request.form['password'])
				log+="\t\t data: "+str(request.form)
			elif ("application/json" in request.headers['Content-Type']):
				log+="\t\t data: "+str(request.json)
	log+="\n"
	log += "\t "+"<Response "+str(response.response)+">\n"
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

	(access, name, budget) = user_dbms.query(usr);

	if (access):
		response={"msg":"login_success","cookies":"session-id="+name+"_"+str(budget)+"@petbet"}
	else:
		response={"msg":"login_failure__credentials_not_valid"}
	return json.dumps(response)

@app.route('/bet', methods=['POST'])
def bet():
	if ("application/x-www-form-urlencoded" in request.headers['Content-Type']):
		data = request.form
	elif ("application/json" in request.headers['Content-Type']):
		data = request.json
	else :
		logger.log("\n[WARNING] Not recognizing the Content-Type of the following login request:")
		return json.dumps({"msg":"bet_failure__server_not_able_to_understand_data"})
	
	cookies = data['cookies']
	username = cookies.split("@")[0].split("_")[0]
	previous_budget = cookies.split("@")[0].split("_")[1]
	importo_scommessa = data['importo_scommessa']

	(ok, name, budget) = user_dbms.update_budget(username, previous_budget, importo_scommessa);

	if (ok):
		response={"msg":"bet_success","cookies":"session-id="+name+"_"+str(budget)+"@petbet"}
	else:
		response={"msg":"bet_failure__cookie_not_valid"}
	return json.dumps(response)

print
logger=logger("logs/log.txt")
user_dbms=dbms("db/usr.txt","logs/usr_db-log.txt")
logger.log("server restarted")
print
app.run(host='0.0.0.0', port=8000)  ## to launch our server
