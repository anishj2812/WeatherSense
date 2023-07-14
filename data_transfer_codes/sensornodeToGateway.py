import socket
import sys
import time
import json
import _thread
from datetime import datetime, timedelta, date
# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# Connect the socket to the port on the server given by the caller
#serv_ip = raw_input("Enter the Server IP:")
com_port = 5556

server_address = ('', int(com_port))
# print >>sys.stderr, 'connecting to %s port %s' % server_address

print('connecting to %s port %s' % server_address, file=sys.stderr)

sock.bind(server_address)
sock.listen(5)

try:
    s, addr = sock.accept()
    while True:
    	
    	data = s.recv(10000).decode()
    	js=str(data)
    	if(js==''):
    		continue
    	daty = datetime.now()
    	dat = daty.strftime("%Y-%m-%d")
    	tim = daty.strftime("%H:%M:%S")
    	json_object1 = json.loads(data)
    	json_object2 = {"record_date":dat}
    	json_object3 = {"record_time":tim}
    	json_object1.update(json_object2)
    	json_object1.update(json_object3)
    	print(data)
    	file=open("data.txt","a+")
    	file.write(json.dumps(json_object1)+'\n')
    	file.close()
    	#s.close()
        #time.sleep(6)
finally:
	print("**")
	s.close()
