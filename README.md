# 🏎️ Lamborghini Dealership Project

This is a full-stack web application developed to manage a Lamborghini dealership, currently in development. Built with **Java + Spring Boot** for backend and **React + TypeScript** for frontend, the platform offers a dynamic and interactive experience for both administrators and clients. It enables car browsing, purchase request handling, and profile management, all through a modern, user-friendly interface.

---

## 📌 Key Features

### 🔐 Authentication:
- Secure **login** and **sign-up** functionality with role-based access
- **Clients** can register through a dedicated sign-up page
- **Admins** have a separate login flow and cannot sign up via the client form

### 🧑‍💼 Admin Panel:
- View, add, update, or delete Lamborghini cars
- Filter/search through the available models
- Manage purchase and return requests submitted by clients

### 👤 Client Area:
- Browse and filter Lamborghini cars 
- Purchase or Return a car directly through the platform
- View the list of owned cars in their personal garage
- Access their personal information in the **My Profile** section

---

## ⚙️ Technologies Used

- **Java & Spring Boot:** Backend services and business logic  
- **Hibernate (JPA):** ORM for mapping Java objects to database tables  
- **Lombok:** Reduces boilerplate code with annotations 
- **React + TypeScript:** Frontend architecture and interactivity  
- **PostgreSQL:** Persistent database storage  
- **Gradle:** Build and dependency management tool  

---

## 🌐 Architecture

### Backend
- **Domain Layer:** Contains the core entities such as `Car`, `Client`, `PurchaseRequest`, etc.
- **Repository Layer:** Handles data access using Spring Data JPA with Hibernate
- **Service Layer:** Applies business logic, validation, and transactional operations
- **Controller Layer:** Exposes REST APIs for frontend consumption

### Frontend
- Built with modular components and client-side routing using `react-router-dom`
- Includes dedicated pages for Admin and Client views
- Clean layout and modern design 
- Uses `Fetch` to communicate with the backend

---

## 📷 UI Design Prototype


