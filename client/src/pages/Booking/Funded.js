import React from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import Fund from '../../Components/Fund'
import VerifyBar from '../../Components/verification/VerifyBar'

function Funded() {
    return (
        <div>
            <Header />
            <VerifyBar />
            <Fund />
            <Footer />
        </div>
    )
}

export default Funded