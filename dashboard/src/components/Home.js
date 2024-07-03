import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { login } from "../store/authSlice";

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userStatus = useSelector((state) => state.auth.status);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async (token) => {
        try {
            console.log("oringal token:", token)
            const response = await axios.get('http://localhost:3002/api/v1/users/current-user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log("this is response:", response);

            if (response) {
                const userData = response.data.data.loggedInUser;
                dispatch(login({ userData: userData, status: true, userAccessToken: token }));
                // console.log("data dispatched:");
            }

            // console.log(" userdata:", userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const encryptedToken = urlParams.get('token');
        console.log("encrypted access token dashboard:", encryptedToken);

        if (encryptedToken) {
            // Decrypt the token
            const secretKey = process.env.REACT_APP_SECRET_KEY;
            const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
            const originalAccessToken = bytes.toString(CryptoJS.enc.Utf8);
            fetchUserData(originalAccessToken).then(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!loading && !userStatus) {
            navigate('/error');
        }
    }, [userStatus, navigate, loading]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <TopBar />
            <Dashboard />
        </>
    );
}

export default Home;
