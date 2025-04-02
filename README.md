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

### 🔐 Authentication  
![Login](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/Login.png?raw=true)  

![Sign Up](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/Sign%20Up.png?raw=true)


### 🧑‍💼 Admin Pages  
![Main Page Admin](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/Main%20Page%20Admin.png?raw=true)  

![View + Filter List](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/View%20Car%20+%20Filter%20List%20Admin.png?raw=true)

![Manage Cars](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/Manage%20Cars%20Admin.png?raw=true)  

![Requests](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/Requests%20Admin.png?raw=true)  

![Add Car](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/Add%20Car%20Admin.png?raw=true)  

![Update Car](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/Update%20Car%20Admin.png?raw=true)  


### 👤 Client Pages  
![Main Page Client](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/Main%20Page%20Client.png?raw=true)  

![View + Filter List](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/View%20Car%20+%20Filter%20List%20Client.png?raw=true)

![My Cars](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/My%20Cars%20Client.png?raw=true)  

![My Lamborghini](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/My%20Lamborghini.png?raw=true)  


### 🚗 Car Details  
![Huracan](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/Huracan%20Details%20Page.png?raw=true)  

![Aventador](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/Aventador%20Details%20Page.png?raw=true)  

![Revuelto](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/Revuelto%20Details%20Page.png?raw=true)  

![Urus](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/Urus%20Details%20Page.png?raw=true)
