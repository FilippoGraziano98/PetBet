from datetime import datetime
import json
from logger import *

class dbms:
	def __init__(self, db_path="db/db.txt", log_path="logs/db.txt"):
		self.db_path=db_path
		 #third argument is to open file as unbuffered, same as using flush
		self.db=open(db_path, "a", 0)
		self.log=open(log_path,"a",0)
		print " * "+str(self)

	def __str__(self):
		return "[<obj> DBMS] db: "+self.db_path+" [</obj]"
	
	def list_current_users(self):
		for d in open(self.db_path, mode="r"):
			yield json.loads(d.strip())
	
	#function checking we don't have a user already registered with the username requested
	def check_username(self, requested_username):
		self.log.write("[check_username "+str(datetime.now())+"] requested user: "+requested_username+"\n")
		for registered_user in self.list_current_users():
			usrnm = registered_user['username']
			if usrnm == requested_username:
				self.log.write("\t-> username not available!"+"\n")
				return False
		self.log.write("\t-> username available"+"\n")
		return True
	
	def insert(self, data):
		self.log.write("[insert "+str(datetime.now())+"] "+json.dumps(data, ensure_ascii=False)+"\n")
		usr = data['username']
		if (self.check_username(usr)):
			self.db.write(json.dumps(data, ensure_ascii=False)+"\n")
			return True
		else:
			return False
	
	def query(self, data):
		self.log.write("[query "+str(datetime.now())+"] "+json.dumps(data, ensure_ascii=False))
		for registered_user in self.list_current_users():
			if (data['user']==registered_user['username'] or data['user']==registered_user['email']) and data['password']==registered_user['password']:
				self.log.write("\t-> valid credentials"+"\n")
				return True
		self.log.write("\t-> not valid credentials"+"\n")
		return False
