import "../style/Login_style.css";
import logo from "../../assets/lamborghini_title.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../models/User.ts";
import { notifyError } from "../utils/Notify.ts";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const queryParams = new URLSearchParams({ email, password });
            const res = await fetch(`http://localhost:8080/api/login/login?${queryParams.toString()}`, {
                method: "POST",
            });

            const responseData = await res.json().catch(() => null);

            if (!res.ok) {
                const errorMessage = responseData?.message || res.statusText || 'Unknown error';
                notifyError(`Login failed: ${errorMessage}`);
                return;
            }

            const data = responseData as User;
            sessionStorage.setItem("user", JSON.stringify(data));

            if (data.role === "CLIENT") {
                navigate("/client", { replace: true });
            } else {
                navigate("/admin", { replace: true });
            }
        } catch (err) {
            notifyError(
                "Login failed: " + (err instanceof Error ? err.message : "Unknown error")
            );
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
                    <button className="signup-link" onClick={() => navigate("/signup") }>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}



