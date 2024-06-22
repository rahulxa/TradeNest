import React from 'react'

function Awards() {
    return (
        <div className='container p-5'>
            <div className='row'>
                <div className='col-6'>
                    <img src="Media/Images/largest-broker.svg" style={{ width: '80%', height: 'auto' }} alt="Largest Broker" />
                </div>
                <div className='col-6 fs-6 mt-3'>
                    <h2 className='fw-semibold '>Largest stock broker in Canada</h2>
                    <p className='mt-4  '>1.5+ Crore Tradenest clients contribute to over 15% of all retail order volumes in India daily by trading and investing in: </p>
                    <div className='row mt-4'>
                        <div className='col-6'>
                            <ul>
                                <li>Futures and Options</li>
                                <li>Commodity derivatives</li>
                                <li>Currency derivatives</li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <ul>
                                <li>Stocks & IPOs</li>
                                <li>Direct mutual funds</li>
                                <li>Bonds and Govt. Securities</li>
                            </ul>
                        </div>
                    </div>
                    <div className='row'>
                        <img src='Media/Images/press-logos.png' className='mt-2'></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Awards