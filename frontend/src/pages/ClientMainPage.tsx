import "./ClientMainPage_style.css";
import background from '../assets/car_page_image.jpg';
import logo from '../assets/lamborghini_logo.png';
import title from '../assets/lamborghini_title.png';
import { CgProfile } from "react-icons/cg";
import { JSX } from "react";

export default function ClientMainPage(): JSX.Element {
    return (
        <div className="client-page" style={{ backgroundImage: `url(${background})` }}>
            <div className="client-header">
                <img src={logo} alt="Lamborghini Logo" className="client-logo" />
                <div className="client-nav">
                    <button className="client-button">Buy Car</button>
                    <button className="client-button">My Cars</button>
                    <button className="client-button">Log out</button>
                </div>
                <div className="client-profile">
                    <CgProfile size={28} color="white" />
                </div>
            </div>

            <div className="client-footer">
                <img src={title} alt="Lamborghini Title" className="client-title" />
            </div>
        </div>
    );
}
