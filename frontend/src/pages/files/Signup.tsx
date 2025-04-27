import "../style/Signup_style.css";
import logo from "../../assets/lamborghini_title.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notifySuccess, notifyError } from "../utils/Notify.ts";

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!firstName || !lastName || !email || !password) {
            notifyError("Please fill in all fields.");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/login/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            const responseData = await res.json().catch(() => null);

            if (!res.ok) {
                const errorMessage = responseData?.message || res.statusText || "Sign up failed";
                notifyError(`Sign up failed: ${errorMessage}`);
                return;
            }

            notifySuccess("Account created! You can now login.");
            navigate("/");
        } catch (err) {
            notifyError(
                "Sign up failed: " + (err instanceof Error ? err.message : "Unknown error")
            );
        }
    };

    return (
        <div className="page">
            <div className="content">
                <img src={logo} alt="Lamborghini Logo" className="logo" />
                <div className="form">
                    <input
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="signup-button" onClick={handleSignup}>
                    Sign Up
                </button>
            </div>
        </div>
    );
}


