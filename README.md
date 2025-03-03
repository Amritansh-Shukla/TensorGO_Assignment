# TensorGO Assignment

## Overview
This repository contains the **TensorGO_Assignment** project, which includes implementations and solutions related to the given assignment. The project leverages Firebase for Google Authentication and stores user data, including subscription details, in `db.json`.

## Features
- **Google OAuth Authentication via Firebase**
- **User Data Storage** (including subscription details)
- **Express.js Backend** for handling API requests
- **JSON Server** for managing user data

## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/Amritansh-Shukla/TensorGO_Assignment.git
cd TensorGO_Assignment
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Firebase Authentication
- Go to the [Firebase Console](https://console.firebase.google.com/)
- Enable **Google Sign-In** under Authentication → Sign-in method
- Obtain Firebase config keys from **Project Settings**
- Replace the Firebase config in the frontend code

### 4. Run the Backend Server
```sh
node server.js
```

### 5. Run JSON Server (for `db.json` storage)
```sh
json-server --watch db.json --port 5000
```

## API Endpoints
| Method | Endpoint         | Description |
|--------|-----------------|-------------|
| GET    | `/auth/google`  | Initiates Google Authentication |
| POST   | `/save-user`    | Saves authenticated user data to `db.json` |
| POST   | `/update-subscription` | Updates user subscription details |

## Technologies Used
- **Node.js & Express.js** (Backend API)
- **Firebase Authentication** (Google OAuth)
- **JSON Server** (Mock database for storing user data)
- **JavaScript** (Frontend integration)

## Contributing
Feel free to fork this repository, submit issues, or open pull requests with improvements.

## License
This project is licensed under the **MIT License**.

## Author
[Amritansh Shukla](https://github.com/Amritansh-Shukla)

