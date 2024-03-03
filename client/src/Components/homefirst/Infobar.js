import React from 'react'
import './info.css'
function Infobar() {
    return (
        <div>
            <div className="info">
                <div className='registered'>
                    <h3>450K+</h3>
                    <p>registered users</p>
                </div>
                <div className='registered'>
                    <h3>RS 239M+</h3>
                    <p>in trade transactions</p>
                </div>
                <div className='registered'>
                    <h3>203</h3>
                    <p>user nationalities</p>
                </div>
                <div className='registered'>
                    <h3>RS 8.4M+</h3>
                    <p>trade income paid</p>
                </div>
            </div>
        </div>
    )
}

export default Infobar