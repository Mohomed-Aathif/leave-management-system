# Leave Management System

A full-stack Leave Management System built using Golang, PostgreSQL, and React.
This application allows employees to request leave and managers to approve or reject requests through a simple and efficient interface.

---

## 🚀 Features

### 👥 Employee Management

* Add new employees
* View employee list
* Edit employee details
* Delete employees

### 📝 Leave Requests

* Employees can apply for leave
* Submit leave with dates and reason
* Leave requests are stored with status tracking

### ✅ Leave Approval

* Managers can approve or reject leave requests
* Status updates dynamically

### 📊 Dashboard

* Total employees
* Total leave requests
* Pending, approved, and rejected counts

### 🔐 Role-Based UI

* Employees can apply for leave
* Managers can manage employees and approve/reject leave

### 📱 Responsive Design

* Built using Tailwind CSS
* Works on desktop, tablet, and mobile devices

---

## 🏗️ Tech Stack

* **Frontend:** React (Vite), Tailwind CSS
* **Backend:** Golang (REST API)
* **Database:** PostgreSQL

---

## 📂 Project Structure

```bash
leave-management/
│
├── backend/
│   ├── db/
│   ├── handlers/
│   ├── models/
│   ├── routes/
│   └── main.go
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── App.jsx
│   └── package.json
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-link>
cd leave-management
```

---

### 2. Database Setup (PostgreSQL)

```sql
CREATE DATABASE leave_management;
```

Create tables:

```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    role TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE leave_requests (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id),
    start_date DATE,
    end_date DATE,
    reason TEXT,
    status TEXT DEFAULT 'pending',
    approved_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 3. Backend Setup

```bash
cd backend
go mod tidy
go run main.go
```

Server runs at:

```
http://localhost:8080
```

---

### 4. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

## 🔌 API Endpoints

### Employees

* `POST /employees` → Add employee
* `GET /employees` → Get all employees
* `PUT /employees/update` → Update employee
* `DELETE /employees/delete` → Delete employee

### Leaves

* `POST /leaves` → Apply leave
* `GET /leaves` → Get all leaves
* `PUT /leaves/approve` → Approve leave
* `PUT /leaves/reject` → Reject leave

### Dashboard

* `GET /dashboard` → Get summary data

---

## 🔄 Workflow

### Employee Flow

1. Select employee
2. Apply leave
3. Submit request

### Manager Flow

1. View leave requests
2. Approve or reject
3. Monitor dashboard

---

## 🧠 Design Decisions

* RESTful API design
* Clean backend structure (handlers, routes, models)
* Relational database for structured data
* Shared state in React for real-time updates
* Role-based UI implementation

---

## 🚧 Future Improvements

* Add authentication (JWT login)
* Role-based authorization in backend
* Improve UI/UX design
* Add filtering and pagination
* Enhance mobile responsiveness

---

## 📌 Conclusion

This project demonstrates a complete full-stack implementation of a Leave Management System with real-world features such as employee management, leave workflows, approval systems, and dashboard analytics.

---
