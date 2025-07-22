# Shangri-La Petition Platform (SLPP)

## Overview
The Shangri-La Petition Platform (SLPP) allows citizens to create and sign petitions, giving them a voice in shaping parliamentary discussions. This project features a **Node.js** backend with **SQLite** as the database and a responsive front-end for user interaction.

---

## Features
- **User Registration**: Citizens can register 
- **User Login**: Authenticated login for petitioners.
- **Petitions Dashboard**: View, create, and sign petitions.
- **Admin Features**: Set petition thresholds and respond to petitions.
- **Responsive Front-End**: Designed with Bootstrap for a seamless experience.

---

### Backend:
- **Node.js**: Application server.
- **SQLite**: Lightweight relational database.
- **Express.js**: Web framework for handling routes and middleware.

### Front-End:
- **HTML, CSS, Bootstrap**: Responsive user interface.
- **JavaScript**: Client-side scripting.

---

## Prerequisites
- [Node.js](https://nodejs.org/) installed on your system.

---

## Installation & Setup


### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Database
SQLite is used as the database. No extra setup is required as the tables are created automatically.

### Step 3: Start the Server in the command prompt. Make sure to run as administrator

node server.js
```
The server will run at `http://localhost:5000`.

---

## API Endpoints
### **Authentication**
- **Register User**: `POST /api/auth/register`
  - **Body:**
    ```json
    {
      "email": "user@example.com",
      "fullName": "John Doe",
      "dob": "1995-05-15",
      "password": "password123",
      "bioID": "12345678" 
    }
    ```
- **Login User**: `POST /api/auth/login`
  - **Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

### **Petitions**
- **Create Petition**: `POST /api/petitions`
  - **Headers:**
    ```
    Authorization: Bearer <your-jwt-token>
    ```
  - **Body:**
    ```json
    {
      "title": "Need construction in society"
    }
    ```
- **Get All Petitions**: `GET /api/petitions`
  - **Headers:**
    ```
    Authorization: Bearer <your-jwt-token>
    ```
- **Sign Petition**: `POST /api/petitions/sign/:id`
  - **Headers:**
    ```
    Authorization: Bearer <your-jwt-token>
    ```

---

## Running the Front-End
### Option 1: Using Live Server
1. Open the `public` folder in a text editor (e.g., VS Code).
2. Right-click `index.html` and select **Open with Live Server**.

### Option 2: Using a web browser
1. Navigate to the `public` folder
  
2. Right click om-n index.html file
   `
3. Open the HTML files in your browser.

---

## Testing with Postman
1. Use the API endpoints listed above.
2. Ensure `Authorization` headers are included for protected routes.
3. Test the workflow: register → login → create a petition → sign a petition → view petitions.

---

## Troubleshooting
- **SQLITE_CONSTRAINT:** Ensure the email is unique when registering.
- **Cannot find module:** Verify the file paths in `require` statements.
- **Database not connected:** Ensure the `slpp.db` file exists and has write permissions.



