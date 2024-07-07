import React, { useState } from 'react';
import './SellActionWindow.css'; // We'll create this CSS file for styling
import { useForm } from 'react-hook-form';

function SellActionWindow({ stock, onClose }) {
    const [sellPrice, setSellPrice] = useState(stock.price);
    const [sellQty, setSellQty] = useState(0);
    const { register, handleSubmit, reset } = useForm()

    const placeOrder = () => {
        console.log("dsfs")
    }

    return (
        <div className="sell-action-overlay">
            <div className="sell-action-window">
                <h2>{stock.stockName}</h2>
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
                <form onSubmit={handleSubmit(placeOrder)}>
                    <div className="input-group">
                        <label htmlFor="sellPrice">Sell Price:</label>
                        <input
                            type="number"
                            id="sellPrice"
                            value={sellPrice}
                            onChange={(e) => setSellPrice(e.target.value)}
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
                        <button className="sell-button">Sell</button>
                        <button className="cancel-button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SellActionWindow;