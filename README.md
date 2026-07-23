# 📚 Library Management System

A full-stack Online Library Management System built using **Angular**, **Node.js**, **Express.js**, and **MongoDB**.

The system allows users to browse books, borrow and return them, while providing administrators with a dashboard to manage the library.

---

## 🚀 Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Password Hashing with bcrypt

### User
- View all books
- Search books
- View book details
- Borrow books
- Return books
- View borrowed books
- View profile
- Update profile
- Dark Mode

### Admin
- Dashboard
- Add new books
- Edit books
- Delete books
- Manage library inventory

---

## 🛠️ Tech Stack

### Frontend
- Angular
- TypeScript
- Bootstrap
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

---

## 📁 Project Structure

```
Library-Management-System
│
├── frontend
│   ├── src
│   ├── app
│   └── assets
│
├── backend
│   ├── Controllers
│   ├── Models
│   ├── Routes
│   ├── Middleware
│   ├── Config
│   └── index.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>
cd Library-Management-System
```

---

### Backend

```bash
cd backend
npm install
```

Create a `.env` file

```env
PORT=5000
DB_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend

```bash
npm run dev
```

or

```bash
nodemon index.js
```

---

### Frontend

```bash
cd frontend
npm install
ng serve
```

Application runs on

```
http://localhost:4200
```

Backend runs on

```
http://localhost:5000
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | /auth/register |
| POST | /auth/login |
| GET | /auth/profile |
| PUT | /auth/updateprofile |

### Books

| Method | Endpoint |
|---------|----------|
| GET | /books |
| GET | /books/:id |
| GET | /books/search |
| POST | /books |
| PUT | /books/:id |
| DELETE | /books/:id |

### Borrowing

| Method | Endpoint |
|---------|----------|
| POST | /borrow |
| POST | /return |
| GET | /my-books |

---

## 🔒 Authentication

Protected routes require a JWT token.

Example Header

```http
Authorization: Bearer <token>
```

---

## 📷 Screens

- Login
- Register
- Home
- Book Details
- My Books
- Profile
- Admin Dashboard
- Manage Books

---

##  Our Team

| Name | GitHub |
|------|--------|
| Shaimaa Mahmoud | https://github.com/Shaimaa-mahm0ud |
| Reem Ahmed | https://github.com/Reem-Ahmed711 |
| Sama Sameh | https://github.com/Sama-Salem |
| Jana Haitham | https://github.com/jana-haitham |
| Shahd Mahmoud | https://github.com/Shahdelrohmy |
---
