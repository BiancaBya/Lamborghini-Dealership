import {useState, useEffect, useCallback} from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/UpdateCar_style.css";
import logo from '../../assets/lamborghini_logo.png';
import { CgProfile } from "react-icons/cg";
import { JSX } from "react";
import { Car } from "../../models/Car";
import { notifyError, notifyMessage, notifySuccess } from "../utils/Notify";
import { validateInputs } from "../utils/ValidateCarInputs";
import { RequestDto } from "./ManageRequests.tsx";
import { useStompSubscribe } from "../../sockets/SocketConfig.ts";

export default function UpdateCar(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const carId = Number(id);
    const [car, setCar] = useState<Car|null>(null);
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [power, setPower] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleRequestEvent = useCallback(
        (evt: { type: string; request: RequestDto }) => {
            const { type, request } = evt;

            if (type === "CREATED") {
                notifyMessage(`New Request from: ${request.client.firstName}`);
            }
        },
        []);

    useStompSubscribe("/topic/requests", handleRequestEvent);


    useEffect(() => {
        fetch(`http://localhost:8080/api/cars/${carId}`)
            .then(async res => {
                if (!res.ok) throw new Error(await res.text());
                return res.json();
            })
            .then((data: Car) => {
                setCar(data);
                setModel(data.model);
                setYear(String(data.year));
                setPower(String(data.horsepower));
                setPrice(String(data.price));
            })
            .catch(err => alert("Error loading car: " + err.message))
            .finally(() => setLoading(false));
    }, [carId]);

    const handleUpdate = async () => {

        if (!validateInputs(model, year, power, price)) return;

        const updated = {
            model: model.trim(),
            year: Number(year),
            horsepower: Number(power),
            price: Number(price)
        };

        try {
            const res = await fetch(`http://localhost:8080/api/cars/${carId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updated)
            });
            if (!res.ok) {
                const err = await res.text();
                notifyError(`Update failed: ${err}`);
                return;
            }
            notifySuccess("Car updated successfully!");
            setTimeout(() => navigate("/admin/manage-cars", { replace: true }), 1500);
        } catch (e: any) {
            notifyError(`Update failed: ${e.message}`);
        }

    };

    if (loading) return <p>Loading...</p>;
    if (!car)    return <p>Car not found</p>;

    return (
        <div className="updatecar-container">
            <header className="updatecar-header">
                <img src={logo} alt="Logo" className="updatecar-logo" />
                <h1 className="updatecar-title">Update Car</h1>
                <div className="admin-profile" onClick={() => navigate("/admin/profile")}>
                    <CgProfile size={36} />
                </div>
            </header>

            <main className="updatecar-main">
                <div className="updatecar-form">
                    <input
                        type="text"
                        value={model}
                        onChange={e => setModel(e.target.value)}
                        className="updatecar-input"
                    />
                    <input
                        type="text"
                        value={year}
                        onChange={e => setYear(e.target.value)}
                        className="updatecar-input"
                    />
                    <input
                        type="text"
                        value={power}
                        onChange={e => setPower(e.target.value)}
                        className="updatecar-input"
                    />
                    <input
                        type="text"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        className="updatecar-input"
                    />
                    <button className="updatecar-button" onClick={handleUpdate}>
                        Update Car
                    </button>
                </div>
            </main>
        </div>
    );
}


