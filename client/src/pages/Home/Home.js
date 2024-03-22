import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import './home.css';
import Homefirst from '../../Components/homefirst/Homefirst';
import Homesecond from '../../Components/homesecond/Homesecond';
import Homethird from '../../Components/homethird/Homethird';
import Homefourth from '../../Components/homefourth/Homefourth';
import Homefifth from '../../Components/homefifth/Homefifth';
import VerifyBar from '../../Components/verification/VerifyBar';

function Home() {



    return (
        <div>

            <Header />
            <VerifyBar />
            <Homefirst />
            <Homesecond />
            <Homethird />
            <Homefourth />
            <Homefifth />
            <Footer />
        </div>
    );
}

export default Home;
