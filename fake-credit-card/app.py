# app.py
from flask import Flask, request, jsonify, render_template
import pandas as pd

app = Flask(__name__)

# Load the dataset once at the start
credit_card_data = pd.read_csv('creditcard.csv')

# Check transaction based on V28
@app.route('/check_transaction', methods=['POST'])
def check_transaction():
    v28_value = request.json.get('v28_value')
    if v28_value is None:
        return jsonify({'error': 'Invalid input. Please enter a numerical value.'}), 400
    
    # Convert the input to float if possible
    try:
        v28_value = float(v28_value)
    except ValueError:
        return jsonify({'error': 'Invalid input. Please enter a numerical value.'}), 400

    # Find transactions with the specified V28 value
    matching_rows = credit_card_data[credit_card_data['V28'] == v28_value]

    if matching_rows.empty:
        return jsonify({'message': 'No transaction found with the specified V28 value.'})
    
    # Check if any of the matching rows is fraudulent
    for _, row in matching_rows.iterrows():
        transaction_type = "Normal Transaction" if row['Class'] == 0 else "Fraudulent Transaction"
        return jsonify({'message': f"Transaction with V28 value {v28_value}: {transaction_type}"})

# Serve the HTML front-end
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True, port=5001)
