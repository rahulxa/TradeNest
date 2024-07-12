import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

function Orders() {
  const userId = useSelector((state) => state.auth.userData?._id);
  const accessToken = useSelector((state) => state.auth.userAccessToken)
  // const accessToken =

  const [orders, setOrders] = useState([]);

  useEffect(() => { 
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/v1/orders/get-orders/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        // console.log("this is response:", response)
        if (response) {
          setOrders(response.data.data.orders)
        }
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };
    fetchOrders();
  }, [userId, accessToken]);

  
  return (
    <>
      {orders.length > 0 ? (
        <div className="container">
          <h4 className="text-center mb-4" style={{ textDecoration: "underline" }}>Orders</h4>
          <table className="table table-striped table-bordered mt-5">
            <thead>
              <tr >
                <th className='text-muted' scope="col">Stock Name</th>
                <th className='text-muted' scope="col">Quantity</th>
                <th className='text-muted' scope="col">Price</th>
                <th className='text-muted' scope="col">Mode</th>
              </tr>
            </thead>
            {/* map and display all the orders from here tbody*/}
            {orders.map((order) => (
              <tbody key={order._id}>
                <tr>
                  <td>{order.stockName}</td>
                  <td>{order.qty}</td>
                  <td>{order.price}</td>
                  <td>{order.mode}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div >
      ) : (
        <div className="orders">
          <div className="no-orders">
            <p>You haven't placed any orders yet</p>
            <p style={{ marginTop: "0px" }}>Place your order now!</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Orders