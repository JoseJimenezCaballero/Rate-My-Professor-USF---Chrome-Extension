from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin #libraries used for cors headers
from waitress import serve #used to serve our app
from getProfessors import getProfessors

app = Flask(__name__)
CORS(app)


#API endpoint to get professor data
@app.route('/get-professors', methods=['POST'])
def getProfessorsAPI():
    #parse request data
    data = request.get_json()
    professorNames = data.get('professorNames', [])#get the professor names from the request data or an empty list if not found

    #get professor data
    results = []#results is a list of professor data in object form
    visited = set()#visited is a set of professor names that have already been visited so we dont make repeat requests

    for name in professorNames:#professorNames is a list of professor names
        if name in visited:#if the professor name has already been visited then skip it
            continue
        professor = getProfessors(name)
        results.append(professor)
        visited.add(name)
    
    return jsonify(results)#return the results as a json object



#when the file is ran directly it will run the app server.
if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=8000)

