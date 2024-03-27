import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import '../Admindash.css';
import { Logout, employeeUnVerified, employeeVerified, viewverifingEmp } from '../../../services/Apis';
import { UserContext } from '../../userContext/Usercontext';

function Admindash() {
    const [employeeData, setEmployeeData] = useState([]);
    const navigate = useNavigate();
    const [zoomed, setZoomed] = useState(null);
    const [zoomed1, setZoomed1] = useState(null);
    const { userData } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await viewverifingEmp();
                if (response.status === 200) {
                    setEmployeeData(response.data.matchedData);
                } else {
                    console.error('Error fetching employee verification data');
                    toast.error('Error fetching employee verification data');
                }
            } catch (error) {
                console.error('Fetch error:', error);
                toast.error('An error occurred. Please try again later.');
            }
        };

        const checkUserRole = async () => {
            try {
                if (userData.role !== "admin") {
                    navigate('/');
                } else {
                    fetchData();
                }
            } catch (error) {
                console.error('Error checking user role:', error);
                toast.error('Error checking user role. Please try again later.');
            }
        };

        checkUserRole();
    }, []);

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

    const handleImageClick = (userId) => {
        // Toggle zoomed state for the clicked image
        if (zoomed === userId) {
            setZoomed(null); // Zoom out
        } else {
            setZoomed(userId); // Zoom in
        }
    };

    const handleImageClick1 = (userId) => {
        // Toggle zoomed state for the clicked image
        if (zoomed1 === userId) {
            setZoomed1(null); // Zoom out
        } else {
            setZoomed1(userId); // Zoom in
        }
    };
    const handleVerify = async (email) => {

        const data = {
            email: email
        }
        try {

            const response = await employeeVerified(data)
            if (response.status === 200) {
                toast.success("verified");
                window.location.reload();
            } else {
                toast.error("Not verified")
            }
        } catch {
            toast.error("error")
        }
    }
    const handleDelete = async (email) => {

        const data = {
            email: email
        }
        try {

            const response = await employeeUnVerified(data);
            if (response.status === 200) {
                toast.success("unverified");
                window.location.reload();
            } else {
                toast.error("delete not success");
            }
        } catch {
            toast.error("error");
        }
    }
    return (
        <div>
            <section>
                <div className="container">
                    <h3>Employee Verification</h3>
                    <div className="row mt-5">
                        <div className="col">
                            <Link to="/addtrade" className="btn btn-primary ml-auto">
                                Add trade
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="/verifyemplyee" className="btn btn-success ml-auto">
                                Verification
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="/withdrawaccept" className="btn btn-secondary ml-auto">
                                Withdraws
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="/admindash" className="btn btn-info ml-auto">
                                Admindash
                            </Link>
                        </div>
                    </div>
                    <table className="table mt-5">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Adhar front</th>
                                <th>Adhar back</th>
                                <th>A/C</th>
                                <th>IFSC</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(employeeData) && employeeData.length > 0 ? (
                                employeeData.map((employee, index) => (
                                    <tr key={index}>
                                        <td>{employee.Email}</td>
                                        {employee.Photos.map((photo, idx) => (
                                            <React.Fragment key={idx}>
                                                <td>
                                                    {photo.AdhaarFront && <img alt={`Adhar Front ${index + 1}`} onClick={() => handleImageClick(photo.userId)} src={`data:image;base64,${photo.AdhaarFront}`} className={`img-preview ${zoomed === photo.userId ? 'zoom-image zoomed' : ''}`} />}
                                                </td>
                                                <td>
                                                    {photo.AdhaarBack && <img alt={`Adhar Back ${index + 1}`} onClick={() => handleImageClick1(photo.userId)} src={`data:image;base64,${photo.AdhaarBack}`} className={`img-preview ${zoomed1 === photo.userId ? 'zoom-image zoomed' : ''}`} />}
                                                </td>
                                                <td>{photo.bankAccountNumber}</td>
                                                <td>{photo.ifscCode}</td>
                                            </React.Fragment>
                                        ))}
                                        <td>
                                            <button className='btn btn-success' onClick={() => handleVerify(employee.Email)}>Verify</button>
                                        </td>
                                        <td>
                                            <button className='btn btn-danger' onClick={() => handleDelete(employee.Email)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No employee verification data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <button className='btn btn-danger' onClick={logout}>Logout</button>
                </div>
            </section>
            <ToastContainer />
        </div>
    );
}

export default Admindash;
