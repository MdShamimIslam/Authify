# Authify - Secure Authentication System

<img src="https://its.unc.edu/wp-content/uploads/sites/337/2024/05/microsoft-authenticator-logo-e1715001276640.png" alt="Authify Logo" width="100"/>

A full-stack authentication system with React frontend and Express.js backend, featuring JWT authentication, MongoDB storage, and responsive UI.

---

## ⚠️ Important: Subdomain Feature Notice

✅ This application **supports subdomain-specific dashboards** (like `http://beautyhub.localhost:5173`) **in the local environment**, where each shop opens in a dynamic subdomain after login.  
❌ However, due to the nature of free hosting platforms (e.g., Netlify, Vercel), **subdomains like `<shop>.domain.com` cannot be dynamically created without a purchased domain and DNS configuration**.

To test the full subdomain functionality:
- **Run the project locally** as shown below.
- Visit URLs like `http://shopname.localhost:5173` after login to view shop-specific pages.

---


## 🌐 Live Demo

- **Client Application**: [https://authifytask.netlify.app](https://authifytask.netlify.app)
- **API Server**: [https://authify-server.vercel.app](https://authify-server.vercel.app)

## 🚀 Features

### Client Side
- User registration and login forms with validation
- Protected routes using React Router
- Beautiful UI with Tailwind CSS
- Toast notifications for user feedback
- Form handling with React Hook Form
- Alert dialogs with SweetAlert2
- JWT authentication flow
- Persistent login state with localStorage

### Server Side
- Secure user registration with password hashing (bcrypt)
- JWT token generation and verification
- MongoDB data storage with Mongoose
- Cookie-based authentication
- CORS configuration for cross-origin requests
- RESTful API endpoints

## 🛠 Tech Stack

### Frontend (Client)
| Technology | Purpose |
|------------|---------|
| React (Vite) | Frontend framework |
| Tailwind CSS | Styling |
| Axios | HTTP requests |
| React Router DOM | Routing |
| React Hook Form | Form management |
| SweetAlert2 | Alert dialogs |
| React Toastify | Notifications |

### Backend (Server)
| Technology | Purpose |
|------------|---------|
| Express.js | Server framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication tokens |
| Bcrypt | Password hashing |
| CORS | Cross-origin resource sharing |



## 📡 API Documentation
All API endpoints are prefixed with:
https://authify-server.vercel.app

###  User Signup
-  **Method** `POST`
- **Endpoint**:  `/users/signup`
- **Description**: Registers a new user with a username, password, and at least 3 unique shop names (must not conflict with other users).

  
### Request Body:
```bash
{
  "username": "johndoe",
  "password": "Pass@1234",
  "shops": ["beautyhub", "grocerypoint", "techstop"]
}
```
### Response
```bash
{
  "message": "SignUp successful!",
  "user": {
    "_id": "xxx",
    "username": "johndoe",
    "shops": ["beautyhub", "grocerypoint", "techstop"]
  }
}
```

###  User Login
-  **Method** `POST`
- **Endpoint**:  `/users/signup`
- **Description**: Authenticates a user by username and password. Optionally sets a long-term cookie if "Remember Me" is selected.
  
### Request Body:
```bash
{
  "username": "johndoe",
  "password": "Pass@1234",
  "rememberMe": true
}
```
### Response
```bash
{
  "message": "Login successful",
  "user": {
    "_id": "xxx",
    "username": "johndoe",
    "shops": ["beautyhub", "grocerypoint", "techstop"]
  },
  "token": "JWT_TOKEN_HERE"
}
```

###  Get Current User
-  **Method** `GET`
- **Endpoint**:  `/users/me`
- **Description**: Returns the currently authenticated user's data. Requires a valid token.
  
### Headers::
```bash
Authorization: Bearer JWT_TOKEN_HERE
```
### Response
```bash
{
  "user": {
    "_id": "xxx",
    "username": "johndoe",
    "shops": ["beautyhub", "grocerypoint", "techstop"]
  }
}
```

###  Logout User
-  **Method** `POST`
- **Endpoint**:  `/users/logout`
- **Description**: Logs the user out by clearing the auth cookie or token (if applicable).
  
### Response
```bash
{
  "message": "Logout successful"
}
```

## 📁 Server (`/server/.env`)
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```


## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB Atlas account or local MongoDB instance
- Git

### Client Setup
```bash
git clone https://github.com/MdShamimIslam/Authify.git
cd client
npm install
npm run dev


