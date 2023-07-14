1) First run sensornodeToGateway.py // it will be running continuously on the gateway to check incoming data and process further.
2) Send data from sensor node using socket to the gateway , you can use putty. // or here we can use testDataGenerator.py  
3) Run gatewayToVm.py // send data to vm
4) Run vmToDatabase.py // sends data to the database.
5) Run api.py from flaskApi // it creates an api with different functions related to sensor data
6) Run frontend to use api.
