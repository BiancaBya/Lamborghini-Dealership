import {useState, useEffect, JSX, useCallback} from "react";
import "../style/MyCars_style.css";
import logo from '../../assets/lamborghini_logo.png';
import { CgProfile } from "react-icons/cg";
import { notifyError, notifyMessage, notifySuccess } from "../utils/Notify";
import { PurchaseDto } from "../../models/PurchaseDTO";
import { User } from "../../models/User.ts";
import { RequestDto } from "../../models/RequestDTO.ts";
import { useNavigate } from "react-router-dom";
import { useStompSubscribe } from "../../sockets/SocketConfig.ts";


export default function MyCars(): JSX.Element {
    const [purchases, setPurchases] = useState<PurchaseDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const navigate = useNavigate();

    const loadCars = useCallback(() => {
        setLoading(true);
        setError(null);

        const userJson = sessionStorage.getItem("user");
        if (!userJson) {
            setError("No logged in user found");
            setLoading(false);
            return;
        }
        const user: User = JSON.parse(userJson);

        const query = `?clientId=${user.id}`;

        fetch(`http://localhost:8080/api/purchases${query}`)
            .then(async res => {
                if (res.status === 204) return [];
                if (!res.ok) throw new Error(await res.text());
                return await res.json();
            })
            .then((data: PurchaseDto[]) => setPurchases(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        loadCars();
    }, [loadCars]);


    const handleRequestEvent = useCallback(
        (evt: { type: string; request: RequestDto }) => {
            const { type, request } = evt;

            if (type === "ACCEPTED" && request.requestType === "BUY") {
                notifyMessage(`Buy Request Accepted: ${request.car.model}`);
            }

            if (type === "ACCEPTED" && request.requestType === "RETURN") {
                notifyMessage(`Return Request Accepted: ${request.car.model}`);
            }

            if (type === "REJECTED" && request.requestType === "BUY") {
                notifyMessage(`Buy Request Rejected: ${request.car.model}`);
            }

            if (type === "REJECTED" && request.requestType === "RETURN") {
                notifyMessage(`Return Request Rejected: ${request.car.model}`);
            }
            loadCars();
        },
        [loadCars]
    );

    useStompSubscribe("/topic/requests", handleRequestEvent);


    const handleReturn = async () => {
        if (selectedIndex === null) {
            notifyError("Please select a car first.");
            return;
        }
        const purchase = purchases[selectedIndex];

        const raw = sessionStorage.getItem("user");
        if (!raw) {
            notifyError("You are not logged in!");
            navigate("/", { replace: true });
            return;
        }
        const user = JSON.parse(raw) as User;

        const request: RequestDto = {
            client: { email: user.email },
            car: {
                model: purchase.car.model,
                year: purchase.car.year,
                horsepower: purchase.car.horsepower,
                price: purchase.car.price,
            },
            requestType: "RETURN",
        };

        try {
            const res = await fetch("http://localhost:8080/api/requests/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request),
            });
            if (!res.ok) {
                const err = await res.text();
                notifyError(`Sending Return Request Failed: ${err}`);
                return;
            }

            notifySuccess("Return Request send successfully!");
        } catch (e: any) {
            notifyError(e.message || "Error sending Return Request");
        }
    };

    return (
        <div className="mycars-container">
            <header className="mycars-header">
                <img src={logo} alt="Lamborghini Logo" className="mycars-logo" />
                <button className="mycars-button" onClick={handleReturn}>
                    Return Car
                </button>
                <div className="client-profile" onClick={() => navigate("/client/profile")}>
                    <CgProfile size={36} />
                </div>
            </header>

            <main className="mycars-main">
                {loading && <p className="mycars-loading">Loading your cars...</p>}
                {error && <p className="mycars-error">Error: {error}</p>}

                {!loading && !error && (
                    <div className="mycars-table-container">
                        <table className="mycars-table">
                            <thead>
                            <tr>
                                <th>Model</th>
                                <th>Year</th>
                                <th>Power</th>
                            </tr>
                            </thead>
                            <tbody>
                            {purchases.map((p, i) => (
                                <tr
                                    key={`${p.car.model}-${p.car.year}-${i}`}
                                    className={i === selectedIndex ? "selected" : ""}
                                    onClick={() => setSelectedIndex(i)}
                                >
                                    <td>{p.car.model}</td>
                                    <td>{p.car.year}</td>
                                    <td>{p.car.horsepower}HP</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}


