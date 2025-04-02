import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/files/Login.tsx";
import Signup from "./pages/files/Signup.tsx";
import AdminMainPage from "./pages/files/AdminMainPage.tsx";
import ClientMainPage from "./pages/files/ClientMainPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={<AdminMainPage />} />
                <Route path="/client" element={<ClientMainPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;



