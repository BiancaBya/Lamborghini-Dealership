import { useLocation, useNavigate } from "react-router-dom";
import { JSX } from "react";
import "../style/BuyCar_style.css";
import logo from "../../assets/lamborghini_logo.png";
import HuracanImg from "../../assets/Huracan.png";
import UrusImg from "../../assets/Urus.png";
import AventadorImg from "../../assets/Aventador.png";
import RevueltoImg from "../../assets/Revuelto.png";
import { CgProfile } from "react-icons/cg";
import { notifyError, notifySuccess } from "../utils/Notify";
import { RequestDto } from "../../models/RequestDTO.ts";
import { User } from "../../models/User.ts";

interface CarDetailsState {
    id: number;
    model: string;
    year: number;
    horsepower: number;
    price: number;
    imageUrl?: string;
}

export default function BuyCar(): JSX.Element {
    const navigate = useNavigate();
    const { state } = useLocation();
    const car = (state as CarDetailsState) || {
        id: 0,
        model: "Unknown",
        year: 0,
        horsepower: 0,
        price: 0,
        imageUrl: undefined
    };

    const getImageForModel = (modelName: string): string => {
        const m = modelName.toLowerCase();
        if (m.includes("huracan")) {
            return HuracanImg;
        }
        if (m.includes("revuelto")) {
            return RevueltoImg;
        }
        if (m.includes("urus")) {
            return UrusImg;
        }
        if (m.includes("aventador")) {
            return AventadorImg;
        }
        return car.imageUrl || HuracanImg;
    };

    const handleBuy = async () => {

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
                model: car.model,
                year: car.year,
                horsepower: car.horsepower,
                price: car.price,
            },
            requestType: "BUY",
        };

        try {
            const res = await fetch("http://localhost:8080/api/requests/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request),
            });
            if (!res.ok) {
                const err = await res.text();
                notifyError(`Sending Buy Request Failed: ${err}`);
                return;
            }

            notifySuccess("Buy Request send successfully!");
            setTimeout(() => navigate("/client", { replace: true }), 1000);
        } catch (e: any) {
            notifyError(e.message || "Error sending Buy Request");
        }
    };

    const displayImage = getImageForModel(car.model);

    return (
        <div className="details-container">
            <header className="details-header">
                <img src={logo} alt="Lamborghini Logo" className="details-logo" />
                <h1 className="details-title">Car Details</h1>
                <div className="client-profile" onClick={() => navigate("/client/profile")}>
                    <CgProfile size={36} />
                </div>
            </header>

            <main className="details-main">
                <section className="details-info">
                    <div className="details-field">
                        <span className="field-label">Model:</span>
                        <span className="field-value">{car.model}</span>
                    </div>
                    <div className="details-field">
                        <span className="field-label">Year:</span>
                        <span className="field-value">{car.year}</span>
                    </div>
                    <div className="details-field">
                        <span className="field-label">Power:</span>
                        <span className="field-value">{car.horsepower} HP</span>
                    </div>
                    <div className="details-field">
                        <span className="field-label">Price:</span>
                        <span className="field-value">{car.price}$</span>
                    </div>

                    <button className="details-button" onClick={handleBuy}>
                        Buy Car
                    </button>
                </section>

                <section className="details-image-section">
                    <img
                        src={displayImage}
                        alt={car.model}
                        className="details-image"
                    />
                </section>
            </main>
        </div>
    );
}



