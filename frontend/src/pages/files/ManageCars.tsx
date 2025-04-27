import {useState, useEffect, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import "../style/AdminManageCars_style.css";
import logo from '../../assets/lamborghini_logo.png';
import { CgProfile } from "react-icons/cg";
import { JSX } from "react";
import { Car } from "../../models/Car";
import {notifyError, notifyMessage, notifySuccess} from "../utils/Notify";
import {RequestDto} from "./ManageRequests.tsx";
import {useStompSubscribe} from "../../sockets/SocketConfig.ts";

export default function ManageCars(): JSX.Element {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);
    const [selectedCarId, setSelectedCarId] = useState<number|null>(null);
    const navigate = useNavigate();

    const loadCars = () => {
        setLoading(true);
        fetch("http://localhost:8080/api/cars/all")
            .then(async res => {
                if (res.status === 204) {
                    setCars([]);
                } else if (res.ok) {
                    setCars(await res.json());
                } else {
                    throw new Error(await res.text());
                }
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadCars();
    }, []);

    const handleRequestEvent = useCallback(
        (evt: { type: string; request: RequestDto }) => {
            const { type, request } = evt;

            if (type === "CREATED") {
                notifyMessage(`New Request from: ${request.client.firstName}`);
            }
        },
        []);

    useStompSubscribe("/topic/requests", handleRequestEvent);

    const goToAddCar = async () => {
        if (selectedCarId === null) {
            navigate("/admin/manage-cars/add-car", {replace: true});
            return;
        }

        const carToAdd = cars.find(car => car.id === selectedCarId);
        if (!carToAdd) {
            notifyError("Selected car data not found.");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/cars/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(carToAdd)
            });
            if (!res.ok) {
                const errText = await res.text();
                notifyError(`Add failed: ${errText}`);
                return;
            }
            notifySuccess("Car added successfully!");
            setSelectedCarId(null);
            loadCars();
        } catch (e: any) {
            notifyError(`Add failed: ${e.message}`);
        }
    };

    const handleUpdateCar = () => {
        if (selectedCarId === null) {
            notifyError("Please select a car to update.");
            return;
        }
        navigate(`/admin/manage-cars/update-car/${selectedCarId}`, { replace: true });
    };

    const handleDeleteCar = async () => {
        if (selectedCarId === null) {
            notifyError("Please select a car to delete.");
            return;
        }

        const carToDelete = cars.find(c => c.id === selectedCarId);
        if (!carToDelete) {
            notifyError("Selected car data not found.");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/cars/delete", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(carToDelete)
            });
            if (!res.ok) {
                const errText = await res.text();
                notifyError(`Delete failed: ${errText}`);
                return;
            }
            notifySuccess("Car deleted successfully!");
            setSelectedCarId(null);
            loadCars();
        } catch (e: any) {
            notifyError(`Delete failed: ${e.message}`);
        }
    };

    return (
        <div className="manage-container">
            <header className="manage-header">
                <img src={logo} alt="Lamborghini Logo" className="manage-logo" />
                <nav className="manage-nav">
                    <button className="manage-button" onClick={goToAddCar}>
                        Add Car
                    </button>
                    <button className="manage-button" onClick={handleDeleteCar}>
                        Delete Car
                    </button>
                    <button className="manage-button" onClick={handleUpdateCar}>
                        Update Car
                    </button>
                </nav>
                <div className="admin-profile" onClick={() => navigate("/admin/profile")}>
                    <CgProfile size={36} />
                </div>
            </header>

            <main className="manage-main">
                {loading && <p className="manage-loading">Loading cars...</p>}
                {error   && <p className="manage-error">Error: {error}</p>}

                {!loading && !error && (
                    <div className="manage-table-container">
                        <table className="manage-table">
                            <thead>
                            <tr>
                                <th>Model</th>
                                <th>Year</th>
                                <th>Power</th>
                                <th>Price</th>
                                <th>Stock</th>
                            </tr>
                            </thead>
                            <tbody>
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
                                    <td>{car.stock}</td>
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


