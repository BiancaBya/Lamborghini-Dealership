import "./Login_style.css";
import logo from "../assets/lamborghini_title.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const params = new URLSearchParams({ email, password });
            const response = await fetch(`http://localhost:8080/api/login/login?${params}`, {
                method: "POST",
            });

            if (!response.ok) {
                const errorText = await response.text();
                alert("Login failed: " + errorText);
                return;
            }

            const data = await response.json();

            localStorage.setItem("user", JSON.stringify(data));

            // if the user has the field firstName => he is a client, otherwise he is the admin
            if (data.firstName) {
                navigate("/client");
            } else {
                navigate("/admin");
            }

        } catch (err) {
            alert("Invalid credentials!");
            console.error("Login error:", err);
        }
    };


    return (
        <div className="page">
            <div className="content">
                <img src={logo} alt="Lamborghini Logo" className="logo" />
                <div className="form">
                    <input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="login-button" onClick={handleLogin}>
                    Login
                </button>
                <div className="footer">
                    <span>Don’t have an account?</span>
                    <button className="signup-link" onClick={() => navigate("/signup")}>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}


