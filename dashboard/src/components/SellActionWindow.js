import React, { useState, useEffect } from 'react';
import './SellActionWindow.css'; // We'll create this CSS file for styling
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import useFetchUserHoldingsValue from '../hooks/FetchUserHoldingsValue';
import { setHoldings } from '../store/dataSlice';

function SellActionWindow({ stock, onClose }) {
    const accessToken = useSelector((state) => state.auth.userAccessToken);
    const userId = useSelector((state) => state.auth.userData._id);
    const [sellQty, setSellQty] = useState(0);
    const [message, setMessage] = useState("");
    const [sellPrice, setSellPrice] = useState(0);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [updateTrigger, setUpdateTrigger] = useState(0);
    const dispatch = useDispatch();

    useFetchUserHoldingsValue(userId, accessToken, updateTrigger);

    useEffect(() => {
        if (stock.qty !== 0) {
            setSellPrice((stock.price * sellQty).toFixed(2));
        }
    }, [sellQty, stock.price]);

    const placeOrder = async () => {
        try {
            const sellQuantity = Number(sellQty);

            if (sellQuantity <= 0 || sellQuantity > stock.qty) {
                setMessage("Please enter a valid quantity. The quantity must be greater than zero and not exceed your current holdings.");
                return;
            }

            const orderData = {
                stockName: stock.stockName,
                qty: sellQty,
                price: sellPrice,
                mode: "Sell"
            };

            const orderResponse = await axios.post("http://localhost:3002/api/v1/orders/place-order", orderData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (orderResponse) {
                const holdingsData = {
                    stockName: stock.stockName,
                    qty: sellQty
                };

                await axios.patch(`http://localhost:3002/api/v1/holdings/update-holdings/${userId}`, holdingsData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                setOrderSuccess(true);
                setMessage("");
                setTimeout(() => {
                    setUpdateTrigger(prev => prev + 1);
                }, 3000);
            }
        } catch (error) {
            if (error.response.status === 404) {
                setMessage("All stocks for this holding have been sold. No quantity remaining to sell.");
            } else {
                setMessage("Error placing your order. Please try again.");
            }
        }
    };

    const handlePopupClose = () => {
        setTimeout(() => {
            setOrderSuccess(false);
            onClose();
        }, 500); // 500ms delay
    };

    return (
        <>
            {orderSuccess ? (
                <div className="modal-overlay">
                    <div className="modal-content p-5 bg-light rounded shadow-lg max-w-lg mx-auto text-center">
                        <h5 className="modal-title">Your stock has been sold successfully!</h5>
                        <div className="d-flex justify-content-center mt-4">
                            <button className="btn btn-secondary" onClick={handlePopupClose}>Close</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="sell-action-overlay">
                    <div className="sell-action-window">
                        <h2 style={{ textDecoration: 'underline' }}>{stock.stockName}</h2>
                        {message && <b>NOTE:</b>}
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
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="sellQty">Sell Quantity:</label>
                            <input
                                type="number"
                                id="sellQty"
                                value={sellQty}
                                onChange={(e) => setSellQty(Number(e.target.value))}
                                max={stock.qty}
                            />
                        </div>
                        <div className="button-group">
                            <button className="sell-button" onClick={placeOrder}>Sell</button>
                            <button className="cancel-button" onClick={onClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SellActionWindow;
