import paho.mqtt.client as mqtt
import mysql.connector
import json


# Define callback functions for handling messages and connection status
def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    client.subscribe("Grp_5")  # Subscribe to the topic "my/topic"
    

def on_message(client, userdata, msg):
    #print("Received message on topic " + msg.topic + " with payload " + str(msg.payload))
    m_decode=str(msg.payload.decode("utf-8","ignore"))
    print(m_decode)
    json_object=json.loads(m_decode)
    connection = mysql.connector.connect(user='root', password='12345',host='127.0.0.1',database='Grp_5')
    db=connection.cursor()


    temp = str(json_object['temp'])
    humi = str(json_object['humi'])
    node_id = str(json_object['node_id'])
    device = str(json_object['device'])
    date = str(json_object['record_date'])
    time = str(json_object['record_time'])
   
   
    db.execute("INSERT INTO Grp_5_data (temp, humi, node_id, device, date, time) VALUES (%s, %s, %s,%s,%s,%s)", (temp, humi, node_id, device, date, time))
    connection.commit()
    
    results = db.fetchall()
    for row in results:
    	print(row)

    

# Create an MQTT client instance and connect to the broker
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect("localhost", 1883)
client.loop_forever()

