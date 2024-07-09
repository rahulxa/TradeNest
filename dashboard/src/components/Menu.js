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
    <div className="menu-container mt-3" style={{ marginRight: "-200px" }}>
      <div className="logo-section">
        <img src="logo.png" className="logo" alt="Kite logo" />
        <span className="logo-text">Kite</span>
      </div>
      <div className="menus" >
        <ul>
          <li>
            <Link
              to="/"
              onClick={() => handleMenuClick(0)}
              className={selectedOption === 0 ? activeMenuClass : menuClass}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              onClick={() => handleMenuClick(1)}
              className={selectedOption === 1 ? activeMenuClass : menuClass}
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/holdings"
              onClick={() => handleMenuClick(2)}
              className={selectedOption === 2 ? activeMenuClass : menuClass}
            >
              Holdings
            </Link>
          </li>
          <li>
            <Link
              to="/positions"
              onClick={() => handleMenuClick(3)}
              className={selectedOption === 3 ? activeMenuClass : menuClass}
            >
              Positions
            </Link>
          </li>
          <li>
            <Link
              to="/AI"
              onClick={() => handleMenuClick(6)}
              className={selectedOption === 6 ? activeMenuClass : menuClass}
            >
              AI<i className="fa-solid fa-wand-sparkles" style={{ marginLeft: "4px" }}></i>
            </Link>
          </li>
          {/* <li> */}
          {/* </li> */}
        </ul>
      </div>
      <div>
        <Logout />
      </div>
      <div
        className={`profile ${isProfileDropDownOpen ? 'active' : ''}`}
        onClick={handleProfileClick}
      >
        <div className="avatar mb-2">{initials}</div>
        {/* Uncomment the following line if you want to display the username */}
        {/* <span className="username">{username}</span> */}
      </div>
    </div>
  )
}

export default Menu