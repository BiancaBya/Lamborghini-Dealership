import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/files/Login.tsx";
import Signup from "./pages/files/Signup.tsx";
import AdminMainPage from "./pages/files/AdminMainPage.tsx";
import ClientMainPage from "./pages/files/ClientMainPage.tsx";
import ManageCars from "./pages/files/ManageCars.tsx";
import AddCar from "./pages/files/AddCar.tsx";
import UpdateCar from "./pages/files/UpdateCar.tsx";
import BuyCar from "./pages/files/BuyCar.tsx";
import ManageRequests from "./pages/files/ManageRequests.tsx";
import MyCars from "./pages/files/MyCars.tsx";
import ClientProfile from "./pages/files/ClientProfile.tsx";
import AdminProfile from "./pages/files/AdminProfile.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/admin" element={<AdminMainPage />} />
                <Route path="/client" element={<ClientMainPage />} />

                <Route path="/client/buy-car" element={<BuyCar />} />
                <Route path="/client/my-cars" element={<MyCars />} />
                <Route path="/client/profile" element={<ClientProfile />} />

                <Route path="/admin/manage-cars" element={<ManageCars />} />
                <Route path="/admin/manage-cars/add-car" element={<AddCar />} />
                <Route path="/admin/manage-cars/update-car/:id" element={<UpdateCar />} />
                <Route path="/admin/requests" element={<ManageRequests />} />
                <Route path="/admin/profile" element={<AdminProfile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;



