from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

app = Flask(__name__)
# Enable CORS for the frontend to communicate with the backend
CORS(app)

# Setup basic logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Validate required fields
        required_fields = ['name', 'email', 'company', 'inquiry', 'consent']
        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        
        if missing_fields:
            return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400
            
        if data.get('consent') != 'on':
            return jsonify({"error": "GDPR consent required"}), 400

        # In a real production environment, this data would be saved to a database 
        # or sent via email (e.g. using SMTP, SendGrid, Mailchimp etc.)
        
        # Simulating saving directly into logs
        logger.info("=========================================")
        logger.info(f"New Strategic Inquiry Received:")
        logger.info(f"Name: {data['name']}")
        logger.info(f"Email: {data['email']}")
        logger.info(f"Company: {data['company']}")
        logger.info(f"Inquiry Area: {data['inquiry']}")
        logger.info(f"Message: {data.get('message', 'N/A')}")
        logger.info(f"GDPR Consent: Confirmed")
        logger.info("=========================================")

        return jsonify({
            "status": "success",
            "message": "Inquiry received successfully. A senior partner will be in touch."
        }), 200

    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    # Run the Flask app on localhost, port 5000
    app.run(debug=True, host='0.0.0.0', port=5000)
