import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { viewTrades } from '../services/Apis';
import { ToastContainer, toast } from 'react-toastify';
import TradeCard from './TradeCard';
import './Loader/Loader.css'

function Book() {
    const [trade, setTrade] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await viewTrades();
            if (response.status === 200) {
                const tradesArray = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
                setTrade(tradesArray);
                // After fetching data, hide loader after 5 seconds
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            } else {
                toast.error(response.response.data.error);
                setLoading(false); // Hide loader in case of error
            }
        } catch (error) {
            console.error(error);
            setLoading(false); // Hide loader in case of error
        }
    };

    const filteredTrade = trade.filter(tradeItem => tradeItem.sharesavailable > 0);

    return (
        <div>
            {/* Loader */}
            {loading && (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            )}

            {/* topimage */}
            <div className="container-fluid page-header py-5 mb-5">
                <div className="container py-5 text-center">
                    <h1 className="display-4 text-white mb-3 animated slideInDown">Items to Export</h1>
                    <p className="lead text-white mb-4 animated slideInDown mx-auto" style={{ fontSize: '1rem' }}>
                        You can start with a small investment amount and gradually grow your presence in the international trade landscape.
                    </p>
                </div>
            </div>
            {/* topimage */}
            {/*buttons */}
            <div className='exportstatus text-center'>
                <Link class="available">Available</Link>
                <Link to='/funded' class="funded">Funded</Link>
                <Link to='/exited' class="exited">Exited</Link>
            </div>
            {/*buttons */}

            {/* Cards */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-4 portfolio-container">
                        {filteredTrade.length > 0 ? (
                            filteredTrade.map((tradeItem) => (
                                <TradeCard key={tradeItem._id} tradeItem={tradeItem} />
                            ))
                        ) : (
                            <div className="text-center">
                                <h3>No trades available</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Cards */}

            <ToastContainer />
        </div>
    );
}

export default Book;





















// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
// import { viewTrades } from '../services/Apis';
// import { ToastContainer, toast } from 'react-toastify';
// import TradeCard from './TradeCard';
// function Book() {
//     const [trade, setTrade] = useState([]);


//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await viewTrades();
//             if (response.status === 200) {
//                 const tradesArray = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
//                 setTrade(tradesArray);
//             } else {
//                 toast.error(response.response.data.error);
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const filteredTrade = trade.filter(tradeItem => tradeItem.sharesavailable > 0);


//     return (
//         <div>
//             {/* topimage */}
//             <div className="container-fluid page-header py-5 mb-5">
//                 <div className="container py-5 text-center">
//                     <h1 className="display-4 text-white mb-3 animated slideInDown">Items to Export</h1>
//                     <p className="lead text-white mb-4 animated slideInDown mx-auto" style={{ fontSize: '1rem' }}>
//                         You can start with a small investment amount and gradually grow your presence in the international trade landscape.
//                     </p>
//                 </div>
//             </div>
//             {/* topimage */}
//             {/*buttons */}
//             <div className='exportstatus text-center'>
//                 <Link class="available">Available</Link>
//                 <Link to='/funded' class="funded">Funded</Link>
//                 <Link to='/exited' class="exited">Exited</Link>

//             </div>
//             {/*buttons */}

//             {/* cards */}

//             {/* Cards */}
//             <div className="container-xxl py-5">
//                 <div className="container">
//                     <div className="row g-4 portfolio-container">
//                         {filteredTrade.length > 0 ? (
//                             filteredTrade.map((tradeItem) => (
//                                 <TradeCard key={tradeItem._id} tradeItem={tradeItem} />
//                             ))
//                         ) : (
//                             <div className="text-center">
//                                 <h3>No trades availables</h3>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             {/* Cards */}



//             {/* cards */}

//             <ToastContainer />
//         </div>
//     )
// }

// export default Book