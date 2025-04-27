# 🏎️ Lamborghini Dealership Project

This is a full-stack web application developed to manage a Lamborghini Dealership. Built with **Java + Spring Boot** for backend and **React + TypeScript** for frontend, the platform offers a dynamic and interactive experience for both administrators and clients. It enables car browsing and purchasing, buy or return requests handling and profile management, all through a modern, user-friendly interface.
The server (backend) and client (frontend) communicate via REST APIs and **WebSockets** for real-time updates between the users.

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
- **WebSockets**: Real‑time communication layer powering live notifications and instant updates

---

## 🌐 Architecture

### Backend
- **Domain Layer:** Contains the core entities such as `Car`, `Client`, `Purchase`, etc.
- **Repository Layer:** Handles data access using Spring Data JPA with Hibernate
- **Service Layer:** Applies business logic, validation and transactional operations
- **Controller Layer:** Exposes REST APIs for frontend consumption
- **Client–Server Model:** Spring Boot application exposes WebSocket endpoints

### Frontend
- Built with modular components and client-side routing 
- Includes dedicated pages for Admin and Client views
- Clean layout and modern design 
- Uses `Fetch` to communicate with the backend
- WebSocket clients for data operations and live updates  

---

## 📷 UI Design 

### 🔐 Authentication  


![Login](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/Login.png)

![Signup](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/SignUp.png)


### 🧑‍💼 Admin Pages  


![Admin Main Page](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/AdminMainPage.png)

![Admin Cars Table](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/AdminCarsTable.png)

![Car Filtering](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/CarFiltering.png)

![Manage Cars](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/ManageCars.png)

![Add Car](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/AddCar.png)

![Update Car](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/UpdateCar.png)

![Requests](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/Requests.png)

![Admin Profile](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/AdminProfile.png)


### 👤 Client Pages  


![Client Main Page](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/ClientMainPage.png)

![Client Cars Table](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/ClientCarsTable.png)

![My Cars](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/MyCars.png)

![Client Profile](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/ClientProfile.png)


### 🚗 Car Details  


![Buy Huracan](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/Huracan.png)

![Buy Revuelto](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/Revuelto.png)

![Buy Aventador](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/Aventador.png)

![Buy Urus](https://github.com/BiancaBya/Lamborghini-Dealership/blob/main/Lamborghini%20Pages/Urus.png)

