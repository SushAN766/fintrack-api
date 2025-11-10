# Personal Finance Management Application 

A **Node.js + MySQL backend** that helps users manage personal finances effectively.  
It allows users to **track income and expenses**, manage **multiple wallets**, set **monthly budgets**, and generate **financial reports**.  
Built with **Express.js** and **JWT authentication**, ensuring secure and reliable performance.

---
## Features

- **Authentication:** Secure login & registration with JWT; passwords hashed using bcrypt.  
- **Wallets:** Create, view, and delete multiple wallets with auto-updated balances.  
- **Transactions:** Add, edit, delete income/expense records; filter by wallet or date.  
- **Budgets:** Set monthly category budgets and get alerts when nearing limits.  
- **Reports:** View total income, expenses, and savings summary for the month.
---

## Tech Stack

| Category | Technology |
|-----------|-------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MySQL |
| Authentication | JWT (jsonwebtoken) |
| Security | bcrypt, dotenv |
| Testing | Postman |
| Version Control | Git & GitHub |
| Language | JavaScript (ES6+) |

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in and receive a JWT token |

---

### Wallets
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/wallets` | Create a new wallet |
| GET | `/api/wallets` | Retrieve all wallets |
| DELETE | `/api/wallets/:walletId` | Delete a specific wallet |

---

### Transactions
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/transactions` | Add a new income or expense transaction |
| GET | `/api/transactions` | Retrieve transactions (supports wallet & date filters) |
| DELETE | `/api/transactions/:transactionId` | Delete a transaction |

---

### Budgets
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/budgets` | Set a monthly budget for a category |
| GET | `/api/budgets` | View all budgets for the current month |

---

### Report
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/report` | Get total income, expenses, and savings summary for the month |


---

## Folder Structure

```
PFM-BACKEND/
├── helpers/
│ └── budgets.js
├── middleware/
│ └── auth.js
├── node_modules/
├── postman/
│ └── personal-finance-api.postman_collection.json
├── routes/
│ ├── auth.js
│ ├── budgets.js
│ ├── report.js
│ ├── transactions.js
│ └── wallets.js
├── .env # private (ignored)
├── .env.example # safe example for setup
├── .gitignore
├── app.js
├── db.js
├── package.json
├── package-lock.json
└── README.md
```
---

## Environment Setup

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/finance-management-api.git
cd finance-management-api
```
---

### 2. Install Dependencies
Install all project dependencies using:

```bash
npm install
```
---

### 3. Configure Environment Variables

Create a `.env` file in the root directory (this file is ignored by GitHub):

```env
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=pfm
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRES_IN=7d
```
> ⚠️ **Note:** Do not upload your `.env` file to GitHub — it is ignored by `.gitignore` for security.

---

### 4. Create MySQL Database

Open your MySQL terminal or client and run the following commands:

```sql
CREATE DATABASE pfm;
USE pfm;
```
---

### 5. Start the Server

Run the development server using:

```bash
npm run dev
```
---

## Testing with Postman — Personal Finance API

### Setup & Import

1. **Open Postman** → Go to `File → Import`
2. **Paste the file path:**
`postman/personal-finance-api.postman_collection.json`

3. **Set the environment variable:**
`base_url = http://localhost:4000`

---

## Authentication

### 1. Register User
**Endpoint:**  
`POST /api/auth/register`

**Body:**
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```
---

### 2.Login
**Endpoint:**
`POST /api/auth/login`
**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": 1, "email": "john@example.com" }
}
```
---

### 3. Use the Token
**In Postman → Headers, set:**
```
Authorization: Bearer <your_token_here>
```
---

### 4. Test All Endpoints

| **Action**           | **Method** | **Endpoint**           |
|-----------------------|------------|------------------------|
| Create Wallet         | POST       | `/api/wallets`         |
| Add Transaction       | POST       | `/api/transactions`    |
| View Budgets          | GET        | `/api/budgets`         |
| Get Monthly Report    | GET        | `/api/report`          |

---

## Sample Outputs
**Create Wallet**
```json
{
  "id": 1,
  "name": "Cash",
  "balance": 5000
}
```
---

**Add Transaction**
```json
{
  "success": true
}
```
---

**Get Financial Report**
```json
{
  "month": "2025-11",
  "income": 0,
  "expense": "100.00",
  "savings": -100
}
```
---

## Security Practices

- **JWT token authentication** for all protected routes  
- **Passwords hashed** using `bcrypt`  
- **SQL injection prevention** with prepared statements  
- **Environment variables** stored in `.env`  
- **.env** file ignored via `.gitignore`

---


## Postman Collection

**Location:**  
`postman/personal-finance-api.postman_collection.json`

You can import this collection directly into **Postman** for quick and easy testing.

---


## Tips

- Ensure your backend server is running at:
http://localhost:4000
- Check that your database connection is active.
- Re-login to generate a new token when the old one expires.

---


<p align="center">© 2025 <b>Personal Finance API</b> — Secure. Simple. Smart.</p>
