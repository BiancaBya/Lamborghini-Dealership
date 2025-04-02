import "./Signup_style.css";
import logo from "../assets/lamborghini_title.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/login/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ firstName, lastName, email, password })
            });

            if (!response.ok) {
                const errorText = await response.text();
                alert("Signup failed: " + errorText);
                return;
            }

            const data = await response.json();
            console.log("Signup successful:", data);

            alert("Account created! You can now login.");
            navigate("/"); // Redirect to login
        } catch (err) {
            alert("Something went wrong during sign up.");
            console.error("Signup error:", err);
        }
    };

    return (
        <div className="page">
            <div className="content">
                <img src={logo} alt="Lamborghini Logo" className="logo" />
                <div className="form">
                    <input type="text" placeholder="first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" placeholder="last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="signup-button" onClick={handleSignup}>Sign Up</button>
            </div>
        </div>
    );
}


