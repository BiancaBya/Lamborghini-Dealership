import {useState, useEffect, JSX, useCallback} from "react";
import "../style/ManageRequests_style.css";
import logo from "../../assets/lamborghini_logo.png";
import { CgProfile } from "react-icons/cg";
import {notifyError, notifyMessage, notifySuccess} from "../utils/Notify";
import {useNavigate} from "react-router-dom";
import {useStompSubscribe} from "../../sockets/SocketConfig.ts";

export interface RequestDto {
    id: number;
    client: { firstName: string; lastName: string; email: string };
    car: { model: string; year: number; horsepower: number; price: number; stock: number };
    requestType: "BUY" | "RETURN";
}

export default function ManageRequests(): JSX.Element {
    const [requests, setRequests] = useState<RequestDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const navigate = useNavigate();

    const loadRequests = useCallback(() => {
        setLoading(true);
        fetch("http://localhost:8080/api/requests")
            .then(async res => {
                if (res.status === 204) return [];
                if (!res.ok) throw new Error(await res.text());
                return await res.json();
            })
            .then((data: RequestDto[]) => setRequests(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        loadRequests();
    }, [loadRequests]);

    const handleRequestEvent = useCallback(
        (evt: { type: string; request: RequestDto }) => {
            const { type, request } = evt;

            if (type === "CREATED") {
                notifyMessage(`New Request from: ${request.client.firstName}`);
            }

            loadRequests();
        },
        [loadRequests]
    );

    useStompSubscribe("/topic/requests", handleRequestEvent);

    const handleAccept = async () => {
        if (selectedId === null) {
            notifyError("Please select a request first.");
            return;
        }
        const req = requests.find(r => r.id === selectedId)!;
        try {
            const res = await fetch("http://localhost:8080/api/requests/accept", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    client: { email: req.client.email },
                    car: {
                        model: req.car.model,
                        year: req.car.year,
                        horsepower: req.car.horsepower,
                        price: req.car.price,
                    },
                    requestType: req.requestType,
                }),
            });
            if (!res.ok) {
                const err = await res.text();
                notifyError(`Accept Request Failed: ${err}`);
                return;
            }
            notifySuccess("Request accepted");
            setRequests(prev => prev.filter(r => r.id !== selectedId));
            setSelectedId(null);
        } catch (e: any) {
            notifyError(e.message);
        }
    };

    const handleDecline = async () => {
        if (selectedId === null) {
            notifyError("Please select a request first.");
            return;
        }
        const req = requests.find(r => r.id === selectedId)!;
        try {
            const res = await fetch("http://localhost:8080/api/requests/decline", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    client: { email: req.client.email },
                    car: {
                        model: req.car.model,
                        year: req.car.year,
                        horsepower: req.car.horsepower,
                        price: req.car.price,
                    },
                    requestType: req.requestType,
                }),
            });
            if (!res.ok) {
                const err = await res.text();
                notifyError(`Decline Request Failed: ${err}`);
                return;
            }
            notifySuccess("Request declined");
            setRequests(prev => prev.filter(r => r.id !== selectedId));
            setSelectedId(null);
        } catch (e: any) {
            notifyError(e.message);
        }
    };

    return (
        <div className="requests-container">
            <header className="requests-header">
                <img src={logo} alt="Lamborghini Logo" className="requests-logo" />
                <nav className="requests-nav">
                    <button className="requests-button" onClick={handleAccept}>
                        Accept
                    </button>
                    <button className="requests-button" onClick={handleDecline}>
                        Decline
                    </button>
                </nav>
                <div className="admin-profile" onClick={() => navigate("/admin/profile")}>
                    <CgProfile size={36} />
                </div>
            </header>

            <main className="requests-main">
                <section className="requests-content">
                    {loading && <p className="requests-loading">Loading requests...</p>}
                    {error && <p className="requests-error">Error: {error}</p>}

                    {!loading && !error && (
                        <div className="requests-table-container">
                            <table className="requests-table">
                                <thead>
                                <tr>
                                    <th>Client</th>
                                    <th>Model</th>
                                    <th>Stock</th>
                                    <th>Type</th>
                                </tr>
                                </thead>
                                <tbody className="requests-table-body">
                                {requests.map(req => (
                                    <tr
                                        key={req.id}
                                        onClick={() => setSelectedId(req.id)}
                                        className={req.id === selectedId ? "selected" : ""}
                                    >
                                        <td>
                                            {req.client.firstName} {req.client.lastName}
                                        </td>
                                        <td>{req.car.model}</td>
                                        <td>{req.car.stock}</td>
                                        <td>{req.requestType}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}


