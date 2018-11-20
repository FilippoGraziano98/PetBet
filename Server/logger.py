from datetime import datetime

class logger:
	def __init__(self, logfile_path="logs/log.txt"):
		self.logfile_path=logfile_path
		 #third argument is to open file as unbuffered, same as using flush
		self.logfile=open(logfile_path, "a", 0)
		print " * "+str(self)

	def __str__(self):
		return "[<obj> Logger] logfile: "+self.logfile_path+" [</obj]"
	
	def log(self, data):
		#print data
		self.logfile.write("["+str(datetime.now())+"] "+str(data)+"\n")
