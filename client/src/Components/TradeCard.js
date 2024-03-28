
import React, { useContext } from 'react';
import ProgressBar from './Progressbar';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../pages/userContext/Usercontext';


const TradeCard = ({ tradeItem }) => {
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();
    const handle = () => {
        // Assuming role is defined outside of this function
        if (userData.role === "unVerifiedUser") {
            const confirmation = window.confirm('You are not verified. Please verify your account.');
            if (confirmation) {
                navigate('/verification');
            }
        } else if (userData.role === "verifying") {
            alert("Please wait until you become verified.")
        }
    }

    // Calculate the percentage based on shares and sharesavailable
    const percentage = tradeItem.shares !== 0 ? ((tradeItem.shares - tradeItem.sharesavailable) / tradeItem.shares) * 100 : 0;
    return (
        <div className="col-lg-4 col-md-6 portfolio-item first wow fadeInUp rounded" data-wow-delay="0.1s">
            {userData.role === 'unVerifiedUser' || userData.role === "verifying" ? (
                <Link to='#' onClick={() => handle()}>


                    <div className="rounded overflow-hidden">
                        <div className="position-relative overflow-hidden">
                            <img
                                className="img-fluid w-100"
                                src={`data:image;base64,${tradeItem.image1.toString('base64')}`}
                                alt="firstimage"
                                style={{ width: '200px', height: '300px' }} // Adjust the dimensions as needed
                            />
                        </div>

                        <div className="bg-white border-light border-top-0 p-4 rounded">
                            <h5 className="lh-base mb-2">{tradeItem.trade}</h5>
                            <h5 className="lh-base mb-4 text-primary">RS {tradeItem.price}</h5>
                            <ProgressBar bgcolor="#ff3c00" progress={percentage} height="5px" />
                            {/* Additional information */}
                            <div className='shipmentdetails mt-4'>
                                <p className="mb-2">Expected Return:<strong >{tradeItem.returnPercentage}%</strong></p>
                                <p className="mb-2">Expected Shipping Date: <strong >{tradeItem.shippingDate}</strong></p>
                                <p className="mb-2">Expected Reaching Date: <strong >{tradeItem.reaching}</strong></p>
                                <p className="mb-2">Expected Returns Date: <strong >{tradeItem.returnsDate}</strong></p>
                            </div>
                        </div>
                    </div>
                </Link>
            ) : (
                <Link to={`/propertiesview/${tradeItem._id}`}>


                    <div className="rounded overflow-hidden">
                        <div className="position-relative overflow-hidden">
                            <img
                                className="img-fluid w-100"
                                src={`data:image;base64,${tradeItem.image1.toString('base64')}`}
                                alt="firstimage"
                                style={{ width: '200px', height: '300px' }} // Adjust the dimensions as needed
                            />
                        </div>

                        <div className="bg-white border-light border-top-0 p-4 rounded">
                            <h5 className="lh-base mb-2">{tradeItem.trade}</h5>
                            <h5 className="lh-base mb-4 text-primary">RS {tradeItem.price}</h5>
                            <ProgressBar bgcolor="#ff3c00" progress={percentage} height="5px" />
                            {/* Additional information */}
                            <div className='shipmentdetails mt-4'>
                                <p className="mb-2">Expected Return:<strong >{tradeItem.returnPercentage}%</strong></p>
                                <p className="mb-2">Expected Shipping Date: <strong >{tradeItem.shippingDate}</strong></p>
                                <p className="mb-2">Expected Reaching Date: <strong >{tradeItem.reaching}</strong></p>
                                <p className="mb-2">Expected Returns Date: <strong >{tradeItem.returnsDate}</strong></p>
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </div >
    );
};

export default TradeCard;


