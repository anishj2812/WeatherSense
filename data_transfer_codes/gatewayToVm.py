import paho.mqtt.client as mqtt
import json
import time

# This is the Subscriber
def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    client.subscribe("topic/sensorTemperature")


def on_message(client, userdata, msg):
    print(json.loads(msg.payload)) #converting the string back to a JSON object

client = mqtt.Client()

client.on_connect = on_connect
client.on_message = on_message

client.connect("localhost", 1883)
i=0
while(1):
	time.sleep(6)
	file=open("data.txt","r+")
	k=file.readlines()
	if(len(k)>0):
		client.publish("Grp_5",k[0])
	file.close()
	file=open("data.txt","w")
	file.write("")
	file.close()

