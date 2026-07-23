# 📚 Library Management System

---

## 📖 **About the Project**

A simple Library Management System built with **Angular** (frontend) and **Node.js/Express** (backend) using **MongoDB** for data storage.

The system allows users to:
- Register & Login
- Browse books
- Borrow & return books
- View borrowing history
- Admins can manage books and users

---

## 🛠️ **Tech Stack**

| Layer | Technology |
|-------|------------|
| **Frontend** | Angular 17, Reactive Forms, RxJS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JWT, Bcrypt |

---

## 🚀 **How to Run**

### 1️⃣ Backend
```bash
cd backend
npm install
npm start
Server runs on: http://localhost:5000

2️⃣ Frontend
bash
cd frontend
npm install
ng serve
App runs on: http://localhost:4200

🔐 Default Admin Account
Email	Password
admin@library.com	admin123
📁 Project Structure
text
├── backend/
│   ├── controllers/    # Logic for each route
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   ├── middlewares/    # Auth & error handlers
│   └── index.js        # Server entry
│
└── frontend/
    ├── src/app/
    │   ├── login/         # Login page
    │   ├── register/      # Register page
    │   ├── admin/         # Admin dashboard
    │   ├── Services/      # API services
    │   └── guards/        # Route protection
    └── angular.json
📡 Main APIs
Method	Endpoint	Description
POST	/auth/register	Register new user
POST	/auth/login	Login user
GET	/books	Get all books
POST	/borrowings/borrow	Borrow a book
POST	/borrowings/return	Return a book
👥 Contributors
Shaimaa Mahmoud
Reem Ahmed
Sama Sameh
Shahd Mamdouh
Jan Haithm
