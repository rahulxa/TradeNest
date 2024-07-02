import React from 'react'
import { useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import store from '../store/store';

function Logout() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout({ userdata: null, status: false }));
        window.location.href = "http://localhost:3000/signup";
    }
    // console.log("this is userdata:", data.username)
    return (
        <button class="custom-btn" onClick={handleLogout}>Logout</button>
    )
}

export default Logout