import {useCallback, useState} from "react";
import { useNavigate } from "react-router-dom";
import "../style/AddCar_style.css";
import logo from "../../assets/lamborghini_logo.png";
import { CgProfile } from "react-icons/cg";
import { JSX } from "react";
import { notifyError, notifyMessage, notifySuccess } from "../utils/Notify";
import { validateInputs } from "../utils/ValidateCarInputs";
import { RequestDto } from "./ManageRequests.tsx";
import { useStompSubscribe } from "../../sockets/SocketConfig.ts";

export default function AddCar(): JSX.Element {
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [power, setPower] = useState("");
    const [price, setPrice] = useState("");
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


    const handleAddCar = async () => {
        if (!validateInputs(model, year, power, price)) return;

        const added = {
            model: model.trim(),
            year: Number(year),
            horsepower: Number(power),
            price: Number(price)
        };

        try {
            const res = await fetch("http://localhost:8080/api/cars/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(added),
            });
            if (!res.ok) {
                const err = await res.text();
                notifyError(`Add failed: ${err}`);
                return;
            }
            notifySuccess("Car added successfully!");
            setTimeout(() => navigate("/admin/manage-cars", { replace: true }), 1500);
        } catch (e: any) {
            notifyError(`Add failed: ${e.message}`);
        }

    };

    return (
        <div className="addcar-container">
            <header className="addcar-header">
                <img src={logo} alt="Lamborghini Logo" className="addcar-logo" />
                <h1 className="addcar-title">Add Car</h1>
                <div className="admin-profile" onClick={() => navigate("/admin/profile")}>
                    <CgProfile size={36} />
                </div>
            </header>

            <main className="addcar-main">
                <div className="addcar-form">
                    <input
                        type="text"
                        placeholder="Model"
                        value={model}
                        onChange={e => setModel(e.target.value)}
                        className="addcar-input"
                    />
                    <input
                        type="text"
                        placeholder="Year"
                        value={year}
                        onChange={e => setYear(e.target.value)}
                        className="addcar-input"
                    />
                    <input
                        type="text"
                        placeholder="Power"
                        value={power}
                        onChange={e => setPower(e.target.value)}
                        className="addcar-input"
                    />
                    <input
                        type="text"
                        placeholder="Price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        className="addcar-input"
                    />

                    <button
                        className="addcar-button"
                        onClick={handleAddCar}
                    >
                        Add Car
                    </button>
                </div>
            </main>
        </div>
    );
}


