import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Orders() {
  const userId = useSelector((state) => state.auth.userData?._id);
  const accessToken = useSelector((state) => state.auth.userAccessToken);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3002/api/v1/orders/get-orders/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (response.data && response.data.data) {
          setOrders(response.data.data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error.message);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId, accessToken]);

  if (loading) {
    return <div className="text-center py-5 text-muted">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">{error}</div>;
  }

  return (
    <div className="container py-3">
      <h2 className="text-center text-muted" style={{ color: '#333', fontWeight: '600',textDecoration:"underline" }}>Your Orders</h2>
      {orders.length > 0 ? (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th scope="col" className="text-uppercase text-muted small font-weight-bold">Stock Name</th>
                <th scope="col" className="text-uppercase  text-muted  small font-weight-bold">Quantity</th>
                <th scope="col" className="text-uppercase  text-muted  small font-weight-bold">Price</th>
                <th scope="col" className="text-uppercase  text-muted  small font-weight-bold">Mode</th>
                <th scope="col" className="text-uppercase  text-muted  small font-weight-bold">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.stockName}</td>
                  <td>{order.qty}</td>
                  <td>${order.price.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${order.mode === 'Buy' ? 'bg-success' : 'bg-danger'}`}>
                      {order.mode}
                    </span>
                  </td>
                  <td>${(order.qty * order.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-5 bg-light rounded">
          <i className="fas fa-shopping-cart fa-3x mb-3 text-muted"></i>
          <p className="lead text-muted mb-4">You haven't placed any orders yet.</p>
          <button className="btn btn-primary">Place Your First Order</button>
        </div>
      )}
    </div>
  );
}

export default Orders;