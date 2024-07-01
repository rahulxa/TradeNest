import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import Cookies from 'universal-cookie';
import CryptoJS from 'crypto-js';
import { useLocation } from 'react-router-dom';

function Funds() {
    // const location = useLocation();
    // useEffect(() => {
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const encryptedToken = urlParams.get('token');
    //     console.log("hello", encryptedToken)

    //     if (encryptedToken) {
    //         // Decrypt the token
    //         const secretKey = process.env.REACT_APP_SECRET_KEY; // This should match the key used for encryption
    //         const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    //         const originalToken = bytes.toString(CryptoJS.enc.Utf8);
    //         console.log("original dashboard token:", originalToken);
    //     }
    // }, [location])

    return (
        <>
            <div className="row" style={{ marginTop: "-20px" }}>
                <div className="col">
                    <span>
                        <p>Equity</p>
                    </span>

                    <div className="table">
                        <div className="data">
                            <p>Available margin</p>
                            <p className="imp colored">4,043.10</p>
                        </div>
                        <div className="data">
                            <p>Used margin</p>
                            <p className="imp">3,757.30</p>
                        </div>
                        <div className="data">
                            <p>Available cash</p>
                            <p className="imp">4,043.10</p>
                        </div>
                        <hr />
                        <div className="data">
                            <p>Opening Balance</p>
                            <p>4,043.10</p>
                        </div>
                        <div className="data">
                            <p>Opening Balance</p>
                            <p>3,736.40</p>
                        </div>
                        <div className="data">
                            <p>Payin</p>
                            <p>4,064.00</p>
                        </div>
                        <div className="data">
                            <p>SPAN</p>
                            <p>0.00</p>
                        </div>
                        <div className="data">
                            <p>Delivery margin</p>
                            <p>0.00</p>
                        </div>
                        <div className="data">
                            <p>Exposure</p>
                            <p>0.00</p>
                        </div>
                        <div className="data">
                            <p>Options premium</p>
                            <p>0.00</p>
                        </div>
                        <hr />
                        <div className="data">
                            <p>Collateral (Liquid funds)</p>
                            <p>0.00</p>
                        </div>
                        <div className="data">
                            <p>Collateral (Equity)</p>
                            <p>0.00</p>
                        </div>
                        <div className="data">
                            <p>Total Collateral</p>
                            <p>0.00</p>
                        </div>
                    </div>
                </div>


            </div>
        </>

    )
}

export default Funds