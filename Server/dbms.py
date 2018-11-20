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
	
	def insert(self, data):
		self.log.write("[insert] "+data+"\n")
		self.db.write(data+"\n")
	
	def query(self, data):
		self.log.write("[query] "+data)
		db=open(self.db_path,"r")
		for d in db:
			if d.strip()==data:
				self.log.write("\t-> found"+"\n")
				return True
		self.log.write("\t->not found"+"\n")
		return False
