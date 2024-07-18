import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { login } from "../store/authSlice";
import useFetchUserHoldingsValue from '../hooks/FetchUserHoldingsValue';


function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userStatus = useSelector((state) => state.auth.status);
    const userAccessToken = useSelector((state) => state.auth.userAccessToken)
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);

    useFetchUserHoldingsValue(userId, token);

    const fetchUserData = async (token) => {
        try {
            const response = await axios.get('http://localhost:3002/api/v1/users/current-user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response) {
                const userData = response.data.data.loggedInUser;
                dispatch(login({ userData: userData, status: true, userAccessToken: token }));
                setUserId(userData._id);
                setToken(token);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let encryptedToken = urlParams.get('token');

        if (encryptedToken) {
            try {
                const secretKey = process.env.REACT_APP_SECRET_KEY;
                const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
                const originalAccessToken = bytes.toString(CryptoJS.enc.Utf8);
                fetchUserData(originalAccessToken);
            } catch (error) {
                console.error("Error decrypting token:", error);
                setLoading(false);
            }
        } else {
            if (userAccessToken) {
                fetchUserData(userAccessToken);
            } else {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        if (!loading && !userStatus && !sessionStorage.getItem('token')) {
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
