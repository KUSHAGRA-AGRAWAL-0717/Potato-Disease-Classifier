# Potato Disease Classification

## Description
This project is a web application for classifying potato diseases using machine learning. It allows users to upload images of potato leaves and receive predictions on whether the leaves are healthy or affected by diseases such as Early Blight or Late Blight.

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd PotatoDisease
   ```

2. Navigate to the `frontend` directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Navigate to the `api` directory and install dependencies (if applicable):
   ```bash
   cd api
   pip install fastapi uvicorn tensorflow pillow numpy
   ```

## Usage
1. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```

2. Start the frontend application:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to access the application.

## API Endpoints
- **GET `/ping`**: Check if the server is running.
- **POST `/predict`**: Upload an image to classify.
  - **Request**: Image file
  - **Response**: JSON object containing the predicted class and confidence level.

## Frontend Functionality
The frontend is built using React and Material-UI. It allows users to:
- Upload images of potato leaves.
- View the uploaded image and classification results.
- Clear the uploaded image and results.

## License
This project is licensed under the MIT License.
