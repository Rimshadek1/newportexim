import React from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import Exit from '../../Components/Exit'
import VerifyBar from '../../Components/verification/VerifyBar'

function Exited() {
    return (
        <div>
            <Header />
            <VerifyBar />
            <Exit />
            <Footer />
        </div>
    )
}

export default Exited