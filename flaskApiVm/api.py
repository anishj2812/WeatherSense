from flask import Flask,jsonify, request
import mysql.connector
import json

#connecting with db
connection = mysql.connector.connect(user='root',password='12345',host='127.0.0.1',database='Grp_5')
db=connection.cursor()


app = Flask(__name__)
@app.after_request
def add_cors_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route('/temp/date/<d>')
def temp(d):
    db.execute("SELECT min(temp) , max(temp) from Grp_5_data WHERE date=%s",(d,))
    results = db.fetchall()
    for row in results:
        pass
    dic={"min":results[0][0],"max":results[0][1]}
    # dic={"min_temp":str(results[0][0]),"max_temp":str(results[0][1])}
    # data = {'message': 'Hello, world!'}
    # return jsonify(data)
    print(dic)
    return jsonify(dic)
    # return jsonify(dic) 
    #return str(dic)
@app.route('/humi/date/<d>')
def humi(d):
    db.execute("SELECT min(humi) , max(humi) from Grp_5_data WHERE date=%s",(d,))
    results = db.fetchall()
    for row in results:
        pass
    dic={"min":results[0][0],"max":results[0][1]}
    # dic={"min_temp":str(results[0][0]),"max_temp":str(results[0][1])}
    # data = {'message': 'Hello, world!'}
    # return jsonify(data)
    return jsonify(dic)
    # return jsonify(dic) 
@app.route('/date/<d>/time/<t>')
def timestamp(d,t):
    db.execute("SELECT * FROM Grp_5_data WHERE date=%s and time>=%s order by time asc limit 1",(d,t))
    results = db.fetchall()
    dic={"temp":results[0][0],"humi":results[0][1],"mac":results[0][2],"device":results[0][3]}
    return str(dic)  

@app.route('/query/<s>')
def query(s):
    q=""
    i=0
    while(i<len(s)):
    	while(i<len(s) and s[i]!='+'):
    		q=q+s[i]
    		i=i+1
    	i=i+1
    	q=q+" "
    query=q
    db.execute(q)
    results = db.fetchall()
    return "**"
    
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=9005)
