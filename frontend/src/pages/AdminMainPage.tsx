import "./AdminMainPage_style.css";
import background from '../assets/car_page_image.jpg';
import logo from '../assets/lamborghini_logo.png';
import title from '../assets/lamborghini_title.png';
import { CgProfile } from "react-icons/cg";
import {JSX} from "react";

export default function AdminMainPage(): JSX.Element {
    return (
        <div className="admin-page" style={{ backgroundImage: `url(${background})` }}>
            <div className="admin-header">
                <img src={logo} alt="Lamborghini Logo" className="admin-logo" />
                <div className="admin-nav">
                    <button className="admin-button">Manage Cars</button>
                    <button className="admin-button">Requests</button>
                    <button className="admin-button">Log out</button>
                </div>
                <div className="admin-profile">
                    <CgProfile size={28} color="white" />
                </div>
            </div>

            <div className="admin-footer">
                <img src={title} alt="Lamborghini Title" className="admin-title" />
            </div>
        </div>
    );
}


