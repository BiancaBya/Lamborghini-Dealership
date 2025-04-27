import {useState, useEffect, JSX} from "react";
import "../style/AdminProfile_style.css";
import logo from '../../assets/lamborghini_logo.png';
import { CgProfile } from "react-icons/cg";
import { User } from "../../models/User";
import { useNavigate } from "react-router-dom";
import { notifyError } from "../utils/Notify";

export default function AdminProfile(): JSX.Element | null {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const raw = sessionStorage.getItem("user");
        if (!raw) {
            notifyError("Not logged in");
            navigate("/", { replace: true });
            return;
        }
        const u: User = JSON.parse(raw);
        if (u.role !== "ADMIN") {
            notifyError("Unauthorized");
            navigate("/", { replace: true });
            return;
        }
        setUser(u);
    }, [navigate]);

    if (!user) return null;

    return (
        <div className="adminprofile-container">
            <header className="adminprofile-header">
                <img src={logo} alt="Lamborghini Logo" className="adminprofile-logo" />
                <h1 className="adminprofile-title-text">My Lamborghini</h1>
                <CgProfile
                    size={36}
                    color="white"
                    className="adminprofile-icon"
                    onClick={() => navigate(-1)}
                />
            </header>

            <main className="adminprofile-main">
                <section className="adminprofile-info">
                    <h2>Admin Profile</h2>
                    <div className="field">
                        <label>Email</label>
                        <input type="text" readOnly value={user.email} />
                    </div>
                </section>
            </main>
        </div>
    );
}



