import React, { useState } from 'react';
import './css/style.css';
import './css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from '../services/Apis';
import { toast } from 'react-toastify';

function Header() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const response = await Logout();
            if (response.status === 200) {
                navigate('/');
            } else {
                toast.error('Logout not successful');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            toast.error('An error occurred during logout. Please try again later.');
        }
    };

    return (
        <div>
            {/* Navbar Start */}
            <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
                <a href="index.html" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
                    <img src="img/portexim.png" style={{ height: '60%' }} alt="portexim logo" />
                </a>
                <button
                    className={`navbar-toggler me-4 ${isNavCollapsed ? 'collapsed' : ''}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse"
                    aria-expanded={!isNavCollapsed ? true : false}
                    aria-label="Toggle navigation"
                    onClick={handleNavCollapse}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarCollapse">
                    <div className="navbar-nav ms-auto p-4 p-lg-0">
                        <Link to="/home" className="nav-item nav-link">Home</Link>
                        <Link to="/booking" className="nav-item nav-link">Items to Export</Link>
                        <Link to="/about" className="nav-item nav-link">About</Link>
                        <Link to="/itemtoexport" className="nav-item nav-link">Cartitems</Link>
                        <div onClick={logout} className="nav-item nav-link">Logout</div>
                    </div>
                </div>
            </nav>
            {/* Navbar End */}
        </div>
    );
}

export default Header;
