# PackPacker

## Overview

Pack Packer is a web application that allows users to create and manage three tables: Procedures, Packs, and Instruments. Procedures can be modularized to surgeon preference, and there can be multiple packs to facilitate that same need. 

## Features

- **Create and manage packs:** Create new packs for different purposes and add items or instruments to them.
- **Bulk add items:** Easily add multiple items or instruments to a pack at once.
- **Edit and delete items:** Modify the details of items within your packs or remove them as needed.
- **User-friendly interface:** A clean and intuitive user interface makes it simple to navigate and use the application.
- **Secure and private:** Your data is securely stored, and your packs are private by default.

## Getting Started

### Prerequisites

- Python (version 3.7 or higher)
- Node.js (for frontend development)
- Poetry (for managing Python dependencies)
- SQLAlchemy (for working with the database)

### Installation

1. Clone the repository:

    > git clone https://github.com/yourusername/PackPacker.git

2. Change to the project directory:

    > cd PackPacker

3. Install Python dependencies:

    > poetry install

4. Install JavaScript dependencies for the frontend (inside the frontend directory):

    > cd frontend
    > npm install


### Configuration

1. Create a `.env` file in the project's root directory and set your environment variables, including database configuration and secret keys:
    
    >DATABASE_URL=postgresql://username:password@localhost/dbname
    >SECRET_KEY=your_secret_key_here

2. Initialize the database:
    >poetry run alembic upgrade head

### Usage

1. Start the Flask backend server (from the project root directory):
    poetry run uvicorn main:app --reload

2. Start the frontend development server (inside the frontend directory):
    npm run dev


3. Access the application in your web browser at http://localhost:3000.

## Contributing

Contributions are welcome! Please follow our contribution guidelines for more details.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments

- React - A JavaScript library for building user interfaces.
- Flask - A micro web framework written in Python.
- SQLAlchemy - SQL toolkit and Object-Relational Mapping (ORM) library for Python.
