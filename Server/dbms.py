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
	def check_email(self, requested_email):
		self.log.write("[check_email "+str(datetime.now())+"] requested email: "+requested_email)
		for registered_user in self.list_current_users():
			usrml = registered_user['email']
			if usrml == requested_email:
				self.log.write("\t -> email not available!"+"\n")
				return False
		self.log.write("\t -> email available"+"\n")
		return True
	
	#function checking we don't have a user already registered with the username requested
	def check_username(self, requested_username):
		self.log.write("[check_username "+str(datetime.now())+"] requested user: "+requested_username)
		for registered_user in self.list_current_users():
			usrnm = registered_user['username']
			if usrnm == requested_username:
				self.log.write("\t -> username not available!"+"\n")
				return False
		self.log.write("\t -> username available"+"\n")
		return True
	
	def insert(self, data):
		self.log.write("[insert "+str(datetime.now())+"] "+json.dumps(data, ensure_ascii=False)+"\n")
		usr = data['username']
		eml = data['email']
		if (self.check_username(usr) and self.check_email(eml)):
			self.db.write(json.dumps(data, ensure_ascii=False)+"\n")
			return True
		else:
			return False
	
	def query(self, data):
		self.log.write("[queryLogin "+str(datetime.now())+"] "+json.dumps(data, ensure_ascii=False))
		for registered_user in self.list_current_users():
			if (data['user']==registered_user['username'] or data['user']==registered_user['email']) and data['password']==registered_user['password']:
				self.log.write("\t-> valid credentials"+"\n")
				name = registered_user['username']
				budget = registered_user['budget']
				return (True, name, budget)
		self.log.write("\t-> not valid credentials"+"\n")
		return (False, "", 0)

	def remove_user(self, username_to_remove):
		self.log.write("[removeUser "+str(datetime.now())+"] username: "+username)
		new_list_users = filter(lambda usr: usr['username'] != username_to_remove, self.list_current_users())
		with open(self.db_path,"w") as writer:
			[writer.write(json.dumps(d)+"\n") for d in new_list_users]

	def update_user(self, username, key, new_value):
		self.log.write("[updateUser "+str(datetime.now())+"] username: "+username+", key: "+key+", new_value: "+str(new_value)+"\n")
		check_aux = filter(lambda usr: usr['username'] == username, self.list_current_users())
		if (len(check_aux) == 0):
			self.log.write("\t-> user not found in db\n")
		elif (len(check_aux) > 1):
			self.log.write("\t-> [ERROR] more than one user found with the given username\n\tDB INTEGRITY BROKEN\n")
	
		user_entry = check_aux[0]
		user_entry[key] = new_value
	
		new_list_users = filter(lambda usr: usr['username'] != username, self.list_current_users())
		new_list_users.append(user_entry)
	
		with open(self.db_path,"w") as writer:
			[writer.write(json.dumps(d)+"\n") for d in new_list_users]
		
		return user_entry
	
	def decrease_budget(self, username, _previous_budget, _importo_scommessa):
		self.log.write("[decreaseBudget "+str(datetime.now())+"] username: "+username+", importo: "+_importo_scommessa+"\n")
		previous_budget = float(_previous_budget)
		importo_scommessa = float(_importo_scommessa)
		for registered_user in self.list_current_users():
			if (username==registered_user['username']): #username is chiave primaria del db
				self.log.write("\t-> valid username"+"\n")
				if(float(registered_user['budget']) - previous_budget > 0.1): #seems as if he increased his budget client-side
					self.log.write("\t-> previous budget not matching server info\n")
					return (False, "", 0)
				if(float(registered_user['budget']) - importo_scommessa < 0):
					self.log.write("\t-> cannot bet more than remaining budget\n")
					return (False, "", 0)
				#change entry in db
				user_entry = self.update_user(username, "budget", float(registered_user['budget'])-importo_scommessa)
				return (True, user_entry['username'], user_entry['budget'])
		self.log.write("\t-> not valid username\n")
		return (False, "", 0)
	
	def increase_budget(self, username, _previous_budget, _vincita):
		self.log.write("[increaseBudget "+str(datetime.now())+"] username: "+username+", importo: "+_vincita+"\n")
		previous_budget = float(_previous_budget)
		vincita = float(_vincita)
		for registered_user in self.list_current_users():
			if (username==registered_user['username']): #username is chiave primaria del db
				self.log.write("\t-> valid username"+"\n")
				if(float(registered_user['budget']) - previous_budget > 0.1): #seems as if he increased his budget client-side
					self.log.write("\t-> previous budget not matching server info\n")
					return (False, "", 0)
				#change entry in db
				user_entry = self.update_user(username, "budget", float(registered_user['budget'])+vincita)
				return (True, user_entry['username'], user_entry['budget'])
		self.log.write("\t-> not valid username\n")
		return (False, "", 0)
