from flask import Flask, request, jsonify
from flask_cors import CORS
from waitress import serve
from getProfessors import getProfessors
from concurrent.futures import ThreadPoolExecutor, as_completed

app = Flask(__name__)
CORS(app)

# API endpoint to get professor data
@app.route('/get-professors', methods=['POST'])
def getProfessorsAPI():
    # Parse request data
    data = request.get_json()
    professorNames = data.get('professorNames', [])
    
    # Use a set to track visited professor names
    visited = set()
    results = []

    # Filter out duplicate names
    unique_professor_names = [name for name in professorNames if name not in visited and not visited.add(name)] # Make a unique list of professor names to avoid duplicate requests

    # Use ThreadPoolExecutor for parallel processing
    with ThreadPoolExecutor(max_workers=20) as executor:# Trying to use 20 threads to get the data
        # Submit all tasks to the thread pool
        future_to_name = {executor.submit(getProfessors, name): name for name in unique_professor_names}# This is needed because the future object does not have the name attribute so we keep track of it

        # Collect results as tasks complete
        for future in as_completed(future_to_name):
            name = future_to_name[future]
            try:
                professor = future.result()  # Get the result from the future
                results.append(professor)
            except Exception as e:
                print(f"Error processing {name}: {e}")

    return jsonify(results)

# Run the app server when the file is executed directly
if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=8000)
