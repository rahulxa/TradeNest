import React, { useEffect } from 'react'
import TopBar from "./TopBar"
import Dashboard from "./Dashboard"
import CryptoJS from 'crypto-js'


function Home() {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const encryptedToken = urlParams.get('token');
        console.log("encrypted access token dashboard:", encryptedToken);

        if (encryptedToken) {
            // Decrypt the token
            const secretKey = process.env.REACT_APP_SECRET_KEY; // This should match the key used for encryption
            const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
            const originalToken = bytes.toString(CryptoJS.enc.Utf8);
            console.log("original access token dashboard:", originalToken);
        }
    }, [])
    return (
        <>
            <TopBar />
            <Dashboard />
        </>
    )
}

export default Home 