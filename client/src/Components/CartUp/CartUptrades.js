import React, { useState } from 'react';
import '../css/style.css';
import '../css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function CartUptrades() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        <>
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
                        <Link to="/itemtoexport" className='nav-item nav-link active'>Items to export</Link>
                        <Link to="/wallet" className='nav-item nav-link'>Wallet</Link>
                        <Link to="/portfolio" className='nav-item nav-link'>Portfolio</Link>
                        <Link to="#" className='nav-item nav-link'>Rewards</Link>
                        <Link to="/cart" className='nav-item nav-link'>Cart</Link>
                        <Link to="#" className='nav-item nav-link'>Help & Support</Link>
                    </div>
                </div>
            </nav >
        </>
    )
}


export default CartUptrades;






















// import React, { useState } from 'react';
// import './CartUp.css';
// import { Link } from 'react-router-dom';

// function CartUptrades() {
//     const [expanded, setExpanded] = useState(false);

//     const toggleNavbar = () => {
//         setExpanded(!expanded);
//     };

//     return (
//         <div>
//             <div className={`navbarss ${expanded ? 'expanded' : ''}`}>
//                 <div className="leftsides">
//                     <img
//                         src="img/portexim.png"
//                         style={{ height: '25px', margin: '4vh' }}
//                         alt="portexim logo"
//                     />
//                 </div>
//                 <div className="rightsides" onClick={toggleNavbar}>
//                     <i className="fa-solid fa-bars"></i>
//                 </div>
//             </div>
//             {expanded && (
//                 <div className="expanded-items">
//                     <ul>
//                         <li><Link to="/itemtoexport" className='active'>Items to export</Link></li>
//                         <li><Link to="/wallet">Wallet</Link></li>
//                         <li><Link to="/portfolio">Portfolio</Link></li>
//                         <li><Link to="#">Rewards</Link></li>
//                         <li><Link to="/cart">Cart</Link></li>
//                         <li><Link to="#">Help & Support</Link></li>
//                         <li><Link to="/home">Home</Link></li>
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default CartUptrades;
