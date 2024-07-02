import React, { useEffect } from 'react'
import TopBar from "./TopBar"
import Dashboard from "./Dashboard"
import CryptoJS from 'crypto-js'
import axios from 'axios'
import {login} from "../store/authSlice"
import { useDispatch } from 'react-redux'


function Home() {
    const dispatch = useDispatch();

    const fetchUserData = async (token) => {
        try {
            const response = await axios.get('http://localhost:3002/api/v1/users/current-user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response) {
                const userData = response.data.data.loggedInUser;
                dispatch(login({ userData: userData, status: true }));
                // console.log(data);
            }

            // console.log("this is the userdata:", userData)
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const encryptedToken = urlParams.get('token');
        // console.log("encrypted access token dashboard:", encryptedToken);

        if (encryptedToken) {
            // Decrypt the token
            const secretKey = process.env.REACT_APP_SECRET_KEY; // 
            const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
            const originalAccessToken = bytes.toString(CryptoJS.enc.Utf8);
            fetchUserData(originalAccessToken);
            // console.log("original access token dashboard:", originalToken);
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