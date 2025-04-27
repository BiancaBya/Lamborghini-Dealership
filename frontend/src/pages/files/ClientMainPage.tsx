import {useState, useEffect, useCallback} from "react";
import "../style/ClientMainPage_style.css";
import background from '../../assets/car_page_image.jpg';
import logo from '../../assets/lamborghini_logo.png';
import title from '../../assets/lamborghini_title.png';
import { Car } from "../../models/Car";
import { CgProfile } from "react-icons/cg";
import { JSX } from "react";
import { logout } from "../utils/Logout";
import { useNavigate } from "react-router-dom";
import { notifyError, notifyMessage } from "../utils/Notify";
import { useStompSubscribe } from "../../sockets/SocketConfig";
import { RequestDto } from "../../models/RequestDTO.ts";
import { User } from "../../models/User.ts";

interface Filters {
    model?: string;
    year?: string;
    horsepower?: string;
    price?: string;
}

export default function ClientMainPage(): JSX.Element {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<Filters>({});
    const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
    const navigate = useNavigate();


    const loadCars = useCallback(() => {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (filters.model)      params.append("model", filters.model);
        if (filters.year)       params.append("year", filters.year);
        if (filters.horsepower) params.append("horsepower", filters.horsepower);
        if (filters.price)      params.append("price", filters.price);

        const urlBase = "http://localhost:8080/api/cars";
        const url = params.toString() ? `${urlBase}/filter?${params}` : urlBase;

        fetch(url)
            .then(async res => {
                if (res.status === 204) return [];
                if (!res.ok) throw new Error(await res.text());
                return res.json();
            })
            .then((data: Car[]) => setCars(data))
            .catch(err => {
                setError(err.message);
                notifyError(err.message);
            })
            .finally(() => setLoading(false));
    }, [filters]);


    useEffect(() => {
        loadCars();
    }, [loadCars]);


    const handleBlur = (key: keyof Filters, value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value.trim() || undefined
        }));
    };

    const handleLogout = () => {
        logout(navigate);
    };

    const handleBuyCar = () => {
        if (selectedCarId === null) {
            notifyError("Please select a car to view details.");
            return;
        }
        const car = cars.find(c => c.id === selectedCarId)!;
        navigate("/client/buy-car", { state: { ...car } });
    };

    const handleMyCars = () => {
        navigate("/client/my-cars");
    };


    const handleCarEvent = useCallback(
        (evt: { type: string; car: Car }) => {
            const { type, car } = evt;

            if (type === "CREATED") {
                notifyMessage(`New Car: ${car.model}`);
            }

            if (type === "UPDATED") {
                notifyMessage(`Updated Car: ${car.model}`);
            }

            if (type === "DELETED") {
                notifyMessage(`Deleted Car: ${car.model}`);
            }
            loadCars();
        },
        [loadCars]
    );

    useStompSubscribe("/topic/cars", handleCarEvent);

    const handleRequestEvent = useCallback(
        (evt: { type: string; request: RequestDto }) => {
            const { type, request } = evt;

            const raw = sessionStorage.getItem("user");
            if (!raw) {
                notifyError("You are not logged in!");
                navigate("/", { replace: true });
                return;
            }
            const user = JSON.parse(raw) as User;

            if (request.client.email != user.email) {
                loadCars();
                return;
            }

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
        [loadCars, navigate]);

    useStompSubscribe("/topic/requests", handleRequestEvent);

    return (
        <div className="client-container">
            <header className="client-header">
                <img src={logo} alt="Lamborghini Logo" className="client-logo" />
                <nav className="client-nav">
                    <button
                        className="client-button active"
                        onClick={handleBuyCar}
                    >
                        Buy Car
                    </button>
                    <button
                        className="client-button"
                        onClick={handleMyCars}
                    >
                        My Cars
                    </button>
                    <button
                        className="client-button"
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                </nav>
                <div className="client-profile" onClick={() => navigate("/client/profile")}>
                    <CgProfile size={36} />
                </div>
            </header>

            <main className="client-main">
                <section
                    className="client-hero"
                    style={{ backgroundImage: `url(${background})` }}
                >
                    <div className="hero-title">
                        <img src={title} alt="Lamborghini Title" className="client-title" />
                    </div>
                </section>

                <section className="client-content">
                    {loading && <p className="client-loading">Loading cars...</p>}
                    {error   && <p className="client-error">Error: {error}</p>}

                    {!loading && !error && (
                        <>
                            <div className="client-filter">
                                <input
                                    type="text"
                                    placeholder="Model"
                                    defaultValue={filters.model}
                                    onBlur={e => handleBlur('model', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Year"
                                    defaultValue={filters.year}
                                    onBlur={e => handleBlur('year', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Power"
                                    defaultValue={filters.horsepower}
                                    onBlur={e => handleBlur('horsepower', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Price"
                                    defaultValue={filters.price}
                                    onBlur={e => handleBlur('price', e.target.value)}
                                />
                            </div>

                            <div className="client-table-container">
                                <table className="client-table">
                                    <thead>
                                    <tr>
                                        <th>Model</th>
                                        <th>Year</th>
                                        <th>Power</th>
                                        <th>Price</th>
                                    </tr>
                                    </thead>
                                    <tbody className="client-table-body">
                                    {cars.map(car => (
                                        <tr
                                            key={car.id}
                                            onClick={() => setSelectedCarId(car.id)}
                                            className={car.id === selectedCarId ? "selected" : ""}
                                        >
                                            <td>{car.model}</td>
                                            <td>{car.year}</td>
                                            <td>{car.horsepower}HP</td>
                                            <td>{car.price}$</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </section>
            </main>
        </div>
    );
}



