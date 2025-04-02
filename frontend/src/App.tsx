import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminMainPage from "./pages/AdminMainPage";
import ClientMainPage from "./pages/ClientMainPage.tsx";

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



