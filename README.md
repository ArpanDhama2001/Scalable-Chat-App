# 💬 Scalable Chat App

A real-time group-based chat application built using Socket.IO and Node.js, featuring JWT authentication, group creation with passcodes, and persistent messaging via MongoDB.

---

## 📖 Overview

This application allows users to register, log in, create chat groups with secure passcodes, and communicate in real time within those groups. It showcases modular design, token-based authentication, and WebSocket communication using Socket.IO. All chat messages are stored in MongoDB for future retrieval.

The project is designed to demonstrate strong backend engineering skills in building scalable, secure, and real-time systems.

---

## ✨ Key Features

- 🔒 **JWT Authentication** — Secure login and registration with access and refresh tokens.
- 🧠 **Group Chat with Passcodes** — Users can create and join groups using passcodes.
- 💬 **Real-Time Messaging** — Live chat functionality powered by Socket.IO.
- 🗃️ **Message Persistence** — Chats are stored in MongoDB with group-level separation.
- 🔄 **Token Refresh Logic** — Automatically issues new access tokens when the refresh token is valid.
- 📦 **Modular Codebase** — Organized into clearly separated routes, middleware, and services.

---

## 🛠 Tech Stack

| Layer        | Technology                  |
|--------------|------------------------------|
| Backend      | Node.js, Express.js          |
| Real-Time    | Socket.IO                    |
| Database     | MongoDB, Mongoose            |
| Auth         | JWT, bcrypt                  |
| Frontend     | HTML, CSS, JavaScript        |
| Tools        | Postman, Nodemon             |

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/ArpanDhama2001/Scalable-Chat-App.git
cd Scalable-Chat-App
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Create a `.env` file in the root folder and add the following:

```env
PORT=5000
ACCESS_TOKEN_SECRET=youraccesstokensecret
REFRESH_TOKEN_SECRET=yourrefreshtokensecret
MONGO_URL=mongodb://localhost:27017/chatapp
```

> Replace `youraccesstokensecret` and `yourrefreshtokensecret` with secure strings.

### 4. Start the server

```bash
npm start
```

The server will be running on `http://localhost:5000`.

