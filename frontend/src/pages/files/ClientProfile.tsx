import {JSX, useEffect, useState} from "react";
import "../style/ClientProfile_style.css";
import logo from '../../assets/lamborghini_logo.png';
import { CgProfile } from "react-icons/cg";
import { User } from "../../models/User";
import { useNavigate } from "react-router-dom";
import { notifyError } from "../utils/Notify";

export default function ClientProfile(): JSX.Element | null {
    const [user, setUser] = useState<User | null>(null);
    const [models, setModels] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const raw = sessionStorage.getItem("user");
        if (!raw) {
            notifyError("Not logged in");
            navigate("/", { replace: true });
            return;
        }
        const u: User = JSON.parse(raw);
        setUser(u);

        fetch(`http://localhost:8080/api/purchases/models?clientId=${u.id}`)
            .then(async res => {
                if (res.status === 204) return [];
                if (!res.ok) throw new Error(await res.text());
                return await res.json() as string[];
            })
            .then(list => setModels(list))
            .catch(err => notifyError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (!user) return null;

    return (
        <div className="profile-container">
            <header className="profile-header">
                <img src={logo} alt="Lamborghini Logo" className="profile-logo" />
                <h1>My Lamborghini</h1>
                <CgProfile size={36} color="white" onClick={() => navigate(-1)} style={{ cursor:"pointer" }} />
            </header>

            <main className="profile-main">
                <section className="profile-info">
                    <div>
                        <label>First name</label>
                        <input value={user.firstName || ""} readOnly />
                    </div>
                    <div>
                        <label>Last name</label>
                        <input value={user.lastName || ""} readOnly />
                    </div>
                    <div>
                        <label>Email</label>
                        <input value={user.email} readOnly />
                    </div>
                </section>

                <section className="profile-models">
                    <h2>My Collection</h2>
                    {loading && <p>Loading…</p>}
                    {!loading && models.map(m => (
                        <button key={m} className="model-button">{m}</button>
                    ))}
                </section>
            </main>
        </div>
    );
}


