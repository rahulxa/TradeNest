import React, { useState } from 'react'
import { Link } from "react-router-dom"
import Logout from './Logout';
import { useSelector } from 'react-redux';

function Menu() {

  const userData = useSelector((state) => state.auth.userData);
  const username = userData ? userData.username : '';
  const initials = username.split(' ')[0];

  const [selectedOption, setSelectedOption] = useState(0);
  const [isProfileDropDownOpen, setIsProfileDropDownOpen] = useState(false)

  const handleMenuClick = (index) => {
    setSelectedOption(index)
    setIsProfileDropDownOpen(false)
  }

  const handleProfileClick = () => {
    setIsProfileDropDownOpen(!isProfileDropDownOpen)
  }

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "35px" }} />
      <p style={{ marginLeft: "-550px" }}>Zerodha</p>
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedOption === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedOption === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedOption === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedOption === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedOption === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedOption === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
          <li>
            <Logout />
          </li>
        </ul>
        <hr />
        <div className={`profile ${isProfileDropDownOpen === true ? activeMenuClass : menuClass}`} onClick={handleProfileClick}>
          <div className="avatar">{initials}</div>
          <p className="username">{username}</p>
        </div>
      </div>
    </div >
  )
}

export default Menu