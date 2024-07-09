import React from 'react'
import { logout } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function Logout() {
    const dispatch = useDispatch();
    const userAccessToken = useSelector((state) => state.auth.userAccessToken)

    const handleLogout = async () => {
        try {
            const logoutUser = await axios.post(
                "http://localhost:3002/api/v1/users/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${userAccessToken}`
                    }
                }
            );
            if (logoutUser) {
                // console.log("User logged out:", logoutUser)
                window.location.href = "http://localhost:3000/signup";
                dispatch(logout({ userdata: null, status: false, userAccessToken: null }));
            }
        } catch (error) {
            console.log("userAcesstoken:", userAccessToken);
            console.log("Error logging out:", error)
        }
    }

    return (
        <button className="custom-btn mb-2" onClick={handleLogout}>Logout</button>
    )
}

export default Logout


// dispatch(logout({ userdata: null, status: false }));
// window.location.href = "http://localhost:3000/signup";