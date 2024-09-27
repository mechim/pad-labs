from flask import Flask,jsonify,request 

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello World!</p>"

@app.route("/healthz", methods = ['GET'])
def healthCheck():
    if(request.method == 'GET'): 
        data = { 
            "status" : "ok" 
        } 
    return jsonify(data)

if __name__ == '__main__':
    app.run()