// import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer-line">
                <Link to="/privacy-policy">Privacy</Link> | <Link to="/terms-conditions">Terms & Conditions</Link>|
                <Link to="/terms-conditions#contact-info"> Contact Info</Link>

            </div>
            <div className="footer-line">
                Kurnool, Andhra Pradesh
            </div>
            <div className="footer-line">
                &copy; {new Date().getFullYear()} Padmashali Global Trust. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
