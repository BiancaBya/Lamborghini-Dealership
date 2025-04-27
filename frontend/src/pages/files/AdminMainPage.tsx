import {useState, useEffect, useCallback} from "react";
import "../style/AdminMainPage_style.css";
import background from '../../assets/car_page_image.jpg';
import logo from '../../assets/lamborghini_logo.png';
import title from '../../assets/lamborghini_title.png';
import { Car } from "../../models/Car";
import { CgProfile } from "react-icons/cg";
import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/Logout.ts";
import { notifyMessage } from "../utils/Notify.ts";
import { useStompSubscribe } from "../../sockets/SocketConfig.ts";
import { RequestDto } from "./ManageRequests.tsx";


interface Filters {
    model?: string;
    year?: string;
    horsepower?: string;
    price?: string;
}

export default function AdminMainPage(): JSX.Element {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<Filters>({});
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (filters.model)      params.append('model', filters.model);
        if (filters.year)       params.append('year', filters.year);
        if (filters.horsepower) params.append('horsepower', filters.horsepower);
        if (filters.price)      params.append('price', filters.price);

        const isFiltering = params.toString().length > 0;
        const urlBase    = 'http://localhost:8080/api/cars';
        const url        = isFiltering
            ? `${urlBase}/filter?${params.toString()}`
            : `${urlBase}`;

        fetch(url)
            .then(async (response) => {
                if (response.status === 204) {
                    setCars([]);
                } else if (response.ok) {
                    const data: Car[] = await response.json();
                    setCars(data);
                } else {
                    const errorText = await response.text();
                    throw new Error(errorText || "Failed to fetch cars");
                }
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [filters]);

    const handleBlur = (key: keyof Filters, value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value.trim() || undefined
        }));
    };

    const goToManageCars = () => {
        navigate("/admin/manage-cars");
    };

    const goToRequests = () => {
        navigate('/admin/requests');
    };

    const handleLogout = () => {
        logout(navigate);
    };

    const handleRequestEvent = useCallback(
        (evt: { type: string; request: RequestDto }) => {
            const { type, request } = evt;

            if (type === "CREATED") {
                notifyMessage(`New Request from: ${request.client.firstName}`);
            }
        },
        []);

    useStompSubscribe("/topic/requests", handleRequestEvent);

    return (
        <div className="admin-container">
            <header className="admin-header">
                <img src={logo} alt="Lamborghini Logo" className="admin-logo" />
                <nav className="admin-nav">
                    <button
                        className="admin-button"
                        onClick={goToManageCars}
                    >
                        Manage Cars
                    </button>
                    <button
                        className="admin-button"
                        onClick={goToRequests}
                    >
                        Requests
                    </button>
                    <button
                        className="admin-button"
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                </nav>
                <div className="admin-profile" onClick={() => navigate("/admin/profile")}>
                    <CgProfile size={36} />
                </div>
            </header>

            <main className="admin-main">
                <section
                    className="admin-hero"
                    style={{ backgroundImage: `url(${background})` }}
                >
                    <div className="hero-title">
                        <img src={title} alt="Lamborghini Title" className="admin-title" />
                    </div>
                </section>

                <section className="admin-content">
                    {loading && <p className="admin-loading">Loading cars...</p>}
                    {error  && <p className="admin-error">Error: {error}</p>}

                    {!loading && !error && (
                        <>
                            <div className="admin-filter">
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

                            <div className="admin-table-container">
                                <table className="admin-table">
                                    <thead>
                                    <tr>
                                        <th>Model</th>
                                        <th>Year</th>
                                        <th>Power</th>
                                        <th>Price</th>
                                    </tr>
                                    </thead>

                                    <tbody className="admin-table-body">
                                    {cars.map(car => (
                                        <tr key={car.id}>
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



