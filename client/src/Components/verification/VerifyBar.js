// VerifyBar.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './verifybar.css';
import { useRole } from '../../pages/userContext/RoleContext';
import { userRole } from '../../services/Apis';

function VerifyBar() {
    const { role, setRole } = useRole();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await userRole();
            if (response.status === 200) {
                setRole(response.data.role);
            }
        } catch (error) {
            console.error('Error fetching user role:', error);
        }
    };

    if (role === 'verified') {
        return null;
    } else if (role === 'unVerifiedUser' || role === undefined) {
        return (
            <div className='verifybar bg-danger'>
                <div className="text-center veritext text-light">
                    <p>Verification is an essential step in ensuring the security and integrity of our platform.
                        It helps us confirm your identity and prevents unauthorized access to your account, ensuring a
                        safe and secure experience for all our users.</p>
                    <div className="tooltiptext mb-3">After verification, please logout and
                        refresh the page for better recognition of app</div>
                    <Link to="/verification" className="veribut">Verify Now</Link>
                </div>
            </div>
        );
    } else if (role === 'verifying') {
        return (
            <div className='verifybar bg-warning'>
                <div className="text-center veritext text-light">
                    <p>Your account is currently under verification process. Please wait until the
                        verification is completed. This process may take 1-2 days. Thank you for your patience.</p>
                    <h6 className='text-light'>An email will be sent to you once your account is verified.</h6>

                </div>
            </div>
        );
    }
    else {
        return null;
    }
}

export default VerifyBar;
