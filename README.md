# 💰 Expense Tracker API 

___

  ## 📌 Overview
The **Expense Tracker API** is a **Node.js + Express.js** application that enables users to track expenses efficiently.
It provides features such as **user management, expense recording, and monthly expense reports**.
The project is backed by **MongoDB** and follows a **RESTful API architecture** with structured endpoints.

#### This repository contains:

* **Backend API** built with **Express.js**.
* **MongoDB** database integration using **Mongoose**.
* **Unit tests** using **Jest & Supertest**.
  
___

## 🌟 Features
* ✅ **User Management:** Add and retrieve users.
* ✅ **Expense Logging:** Record, categorize, and manage expenses.
* ✅ **Monthly Reports:** Retrieve detailed reports grouped by categories.
* ✅ **Error Handling:** Comprehensive error messages for invalid requests.
* ✅ **Unit Testing:** Thorough API testing with Jest.

---

## 🛠️ Tech Stack
The project is built using modern web development technologies:

| Technology | Usage |
|:----------:|:----------:|
| **Node.js**|JavaScript runtime for server-side execution. |
| **Express.js** |Web framework for building API routes. |
| **MongoDB**	|NoSQL database for expense storage. |
| **Mongoose** |ODM library for MongoDB integration. |
| **Jest** |JavaScript testing framework for unit testing. |
| **Supertest** |HTTP assertion library for API testing. |
| **dotenv** |Environment variable management. |

---

## 📂 Project Structure
```
📂 Project/
 ├── 📁 models/         # Mongoose models (User, Cost, Report)
 ├── 📁 routes/         # Express API routes (users, costs, reports)
 ├── 📁 tests/          # Jest-based unit tests
 ├── 📁 bin/            # Entry point for Express app
 ├── app.js            # Express server setup
 ├── package.json      # Dependencies and scripts
 ├── .env.example      # Example environment variables
 ├── README.md         # Project documentation
```

---

## 🚀 Getting Started
To set up and run this project, you need to install all required dependencies. Follow these steps:
#### 1️⃣ Clone the repository
```
git clone https://github.com/YOUR_GITHUB_USERNAME/final-project.git
cd final-project
```
#### 2️⃣ Install dependencies
**Install required dependencies:** Run the following command to install all necessary packages:
```
npm install
```
##### Ensure the following dependencies are installed:
**Project dependencies:**
```
npm install express body-parser dotenv mongodb mongoose
```
**Development & Testing dependencies:**
```
npm install --save-dev chai jest mocha sinon supertest
```
### 3️⃣ Set up environment variables
Create a .env file in the root directory and add the following:
```
MONGO_URI=your_mongodb_connection_string
```
### 4️⃣ To start the server
```
npm start
```
The API will be available at http://localhost:3000/.
### 5️⃣ To run the tests:
```
npm test
```
#### Tests cover:

* User management
* Expense handling
* Report generation
* Error handling cases

**💡 This ensures all necessary dependencies are installed and properly configured before running the application. 🚀**

---

## 📡 API Endpoints
### 🧑 User Routes
| Method | Endpoint | Description |
|:----------:|:----------:|:----------:|
| **POST**   | `/api/users/add` | Add a new user |
| **GET**  | `/api/users/:id`   | Retrieve user details |

### 💰 Expense Routes
| Method | Endpoint | Description |
|:----------:|:----------:|:-------
| **POST**   | `/api/add` | Add a new expense |

### 📊 Report Routes
| Method | Endpoint | Description |
|:----------:|:----------:|:-------
| **GET**   | `/api/report` | Retrieve a monthly expense report |

---

## 🤝 Contributing

Want to contribute? Follow these steps:

1. **Fork** this repository.
2. **Create** a new feature branch (git checkout -b feature-branch).
3. **Commit** changes (git commit -m "Added new feature").
4. **Push** to GitHub (git push origin feature-branch).
5. **Submit** a pull request. 🚀

---

## 📝 License
This project is licensed under the **MIT License.** 




