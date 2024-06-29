import React from 'react'
import { Link } from "react-router-dom"


function Orders() {
  return (
    <div className="orders">
      <div className="no-orders">
        <p>You haven't placed any orders yet</p>
        <p style={{ marginTop: "0px" }}>Place your order now!</p>
      </div>
    </div>
  )
}

export default Orders