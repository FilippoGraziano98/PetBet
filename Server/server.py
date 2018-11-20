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
		log+="\t data: "+str(request.form)
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
	try:
		usr = str(request.form['username'])+","+str(request.form['password'])
	except:
		user_data=request.json
		usr=str(user_data.get('username'))+","+str(user_data.get('password'))
	user_dbms.insert(usr)
	return render_template('registration_success.html')
#	response={"msg":"registration_success"}
#	return json.dumps(response)

@app.route('/login', methods=['POST'])
def login():
	try:
		usr = str(request.form['username'])+","+str(request.form['password'])
	except:
		user_data=request.json
		usr=str(user_data.get('username'))+","+str(user_data.get('password'))
	accept=user_dbms.query(usr)
	if(accept):
#		response=make_response(render_template('login_success.html'))
#		response.set_cookie("session-id","abcd",max_age=60*60*24)#cookie lasting for a hole-day
#		return response
		response={"msg":"login_success","cookies":"abcd"}
		return json.dumps(response)
	else:
#		return render_template('login_fail.html')
		response={"msg":"login_fail"}
		return json.dumps(response)

print
logger=logger("logs/log.txt")
user_dbms=dbms("db/usr.txt","logs/usr_db-log.txt")
logger.log("server restarted")
print
app.run(host='0.0.0.0', port=8000)  ## to launch our server
