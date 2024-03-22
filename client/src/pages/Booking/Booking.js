import React from 'react'
import Header from '../../Components/Header'
import Book from '../../Components/Book'
import Footer from '../../Components/Footer'
import VerifyBar from '../../Components/verification/VerifyBar'

function Booking() {
    return (
        <div>
            <Header />
            <VerifyBar />
            <Book />
            <Footer />
        </div>
    )
}

export default Booking