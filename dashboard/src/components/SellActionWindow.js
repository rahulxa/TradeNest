import React, { useState } from 'react';
import './SellActionWindow.css'; // We'll create this CSS file for styling
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function SellActionWindow({ stock, onClose }) {
    console.log("stock:", stock)
    const accessToken = useSelector((state) => state.auth.userAccessToken)
    const userId = useSelector((state) => state.auth.userData._id)
    // console.log("access token:", accessToken)
    const [sellQty, setSellQty] = useState(0);
    const [message, setMessage] = useState("")
    const [sellPrice, setSellPrice] = useState(0)
    const [orderSuccessMessage, setOrderSuccesMessage] = useState("");

    useEffect(() => {
        if (stock.qty !== 0) {
            setSellPrice((stock.price * sellQty).toFixed(2))
        }
    }, [sellQty, stock.price])


    const placeOrder = async () => {
        try {
            if (sellQty === 0 || sellQty > stock.qty) {
                setMessage("Please enter a valid quantity. The quantity must be greater than zero and not exceed your current holdings.");
                return
            }
            const orderData = {
                stockName: stock.stockName,
                qty: sellQty,
                price: sellPrice, //this is lTP for holdings
                mode: "Sell"
            };
            console.log("order data:", orderData)
            const orderResponse = await axios.post("http://localhost:3002/api/v1/orders/place-order", orderData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (orderResponse) {
                setOrderSuccesMessage("Order placed successfully!!");
                setMessage("")

                const holdingsData = {
                    stockName: stock.stockName,
                    qty: sellQty
                }
                console.log("holdings data:", holdingsData)
                try {
                    const holdingsResponse = await axios.patch(`http://localhost:3002/api/v1/holdings/update-holdings/${userId}`, holdingsData, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })
                    if (holdingsResponse) {
                        console.log("this is the holding response:", holdingsResponse.data.data);
                        console.log("Holdings created successfully")
                    }
                } catch (error) {
                    console.log("Error updating your holdings:", error.message);
                }
            }
        } catch (error) {
            console.log("Error placing your order:", error.message);
        }
    }

    const handlePopupClose = () => {
        setOrderSuccesMessage("")
        onClose();
    }

    return (
        <>
            {orderSuccessMessage === "" ? (
                <div className="sell-action-overlay">
                    <div className="sell-action-window">
                        <h2>{stock.stockName}</h2>
                        <p>{message}</p>
                        <div className="stock-info">
                            <div className="info-item">
                                <span className="info-label">Stock Name:</span>
                                <span className="info-value">{stock.stockName}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Owned Quantity:</span>
                                <span className="info-value">{stock.qty}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Current Price (LTP):</span>
                                <span className="info-value">${stock.price.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="sellPrice">Sell Price:</label>
                            <input
                                type="number"
                                id="sellPrice"
                                value={sellPrice}
                                readOnly
                            // onChange={(e) => setSellPrice(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="sellQty">Sell Quantity:</label>
                            <input
                                type="number"
                                id="sellQty"
                                value={sellQty}
                                onChange={(e) => setSellQty(e.target.value)}
                                max={stock.qty}
                            />
                        </div>
                        <div className="button-group">
                            <button className="sell-button" onClick={placeOrder}>Sell</button>
                            <button className="cancel-button" onClick={onClose}>Cancel</button>
                        </div>
                    </div>
                </div >
            ) : (
                <div className="modal-overlay">
                    <div className="modal-content p-5 bg-light rounded shadow-lg max-w-lg mx-auto text-center">
                        <h5 className="modal-title">{orderSuccessMessage}</h5>
                        <div className="d-flex justify-content-center mt-4">
                            <button className="btn btn-secondary" onClick={handlePopupClose}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SellActionWindow;