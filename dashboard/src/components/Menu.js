import React, { useState } from 'react'
import { Link } from "react-router-dom"
import Logout from './Logout';
import { useSelector } from 'react-redux';

function Menu() {
  const userData = useSelector((state) => state.auth.userData);
  const currMenu = useSelector((state) => state.navItems.currentItem)
  const username = userData ? userData.username : '';
  const initials = username.split(' ')[0];
  const menuClass = "menu";
  const activeMenuClass = "menu menu-selected";

  return (
    <div className="menu-container mt-1" style={{ marginRight: "-200px" }}>
      <div className="logo-section">
        <img src="logo.png" className="logo" alt="Kite logo" />
        <span className="logo-text">Kite</span>
      </div>
      <div className="menus" >
        <ul>
          <li>

          </li>
          <li>
            <Link
              to="/"
              className={currMenu === "summary" ? activeMenuClass : menuClass}
              style={{ fontSize: "0.75rem" }}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/holdings"
              className={currMenu === "holdings" ? activeMenuClass : menuClass}
              style={{ fontSize: "0.75rem" }}
            >
              Holdings
            </Link>
          </li>
          <li>
            <Link
              to="/AI"
              className={currMenu === "AI" ? activeMenuClass : menuClass}
              style={{ fontSize: "0.75rem" }}
            >
              AI<i className="fa-solid fa-wand-sparkles" style={{ marginLeft: "4px" }}></i>
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className={currMenu === "orders" ? activeMenuClass : menuClass}
              style={{ fontSize: "0.75rem" }}
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/news"
              className={currMenu === "news" ? activeMenuClass : menuClass}
              style={{ fontSize: "0.75rem" }}
            >
              News
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Logout />
      </div>
      <div className=' profile active'>
        <div className="avatar mb-2">{initials.charAt(0).toUpperCase()}</div>
      </div>
    </div>
  )
}

export default Menu
