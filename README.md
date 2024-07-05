# React FastAPI Project

## Project Overview

This project is a web application built with React for the frontend and FastAPI for the backend. It includes functionalities for managing suppliers, clients, and products, performing CRUD operations, and sending email notifications when products are bought or sold. The application is fully deployed, allowing seamless interaction between the frontend and backend.

## Features

- **CRUD Operations**: 
  - Suppliers: Add, update, delete, and view suppliers.
  - Clients: Add, update, delete, and view clients.
  - Products: Add, update, delete, and view products.
  
- **Email Notifications**: 
  - Automated emails sent when products are bought or sold.

- **Frontend**: 
  - Built with React for a dynamic and responsive user interface.
  
- **Backend**: 
  - Built with FastAPI for efficient and scalable API endpoints.

- **Deployment**: 
  - The application is fully deployed, integrating React frontend and FastAPI backend.

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3.7+
- FastAPI
- React
- PostgreSQL (or any preferred database)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/alihassanml/react-fastapi-project.git
   cd react-fastapi-project
   ```

2. **Backend Setup**:

   - Create a virtual environment:
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows use `venv\Scripts\activate`
     ```

   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```

   - Configure the database:
     Update the database configuration in `config.py`.

   - Run the FastAPI server:
     ```bash
     uvicorn main:app --reload
     ```

3. **Frontend Setup**:

   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```

   - Install dependencies:
     ```bash
     npm install
     ```

   - Start the React application:
     ```bash
     npm start
     ```

## Usage

1. **Access the application**:
   Open your browser and navigate to `http://localhost:3000` for the React frontend.

2. **Perform CRUD operations**:
   Use the UI to manage suppliers, clients, and products.

3. **Email notifications**:
   Check your email for notifications when products are bought or sold.

## Project Structure

- **backend/**: FastAPI backend
  - `main.py`: Main application entry point
  - `models.py`: Database models
  - `schemas.py`: Data validation schemas
  - `crud.py`: CRUD operation functions
  - `config.py`: Configuration file
  - `email.py`: Email sending functionality

- **frontend/**: React frontend
  - `src/`: React components and pages
  - `App.js`: Main React component
  - `index.js`: Entry point for React application

## Deployment

To deploy the application, ensure both the backend and frontend are configured correctly and hosted on your preferred platform (e.g., Heroku, Vercel).

1. **Deploy the backend**:
   Follow your hosting provider's instructions to deploy the FastAPI server.

2. **Deploy the frontend**:
   Build the React application:
   ```bash
   npm run build
   ```
   Deploy the build directory to your hosting provider.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
