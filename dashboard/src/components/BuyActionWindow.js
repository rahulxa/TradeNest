import React, { useState } from 'react';

function BuyActionWindow({ stockName, onClose, stockPrice }) {

    const [stockQuantity, setStockQuantity] = useState(null);
    const [newStockPrice, setNewStockPrice] = useState(null)

    const handleStockQuantityChange = (e) => {
        setStockQuantity(e.target.value);
    }
    const handleNewStockPrice = (e) => {
        setNewStockPrice(e.target.value);
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content p-4 bg-light rounded shadow-sm max-w-md mx-auto">
                <h5 style={{ color: "darkblue", textAlign: "center", textDecoration: "underline" }}>{stockName}</h5>
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Qty.</label>
                    <input
                        type="number"
                        id="quantity"
                        value={stockQuantity}
                        onChange={(e) => handleStockQuantityChange(e)}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                        type="number"
                        defaultValue={stockPrice}
                        value={newStockPrice}
                        onChange={(e) => handleNewStockPrice(e)}
                        id="price"
                        className="form-control"
                    />
                </div>
                <div className="mb-3 text-muted">
                    <strong>Margin required: </strong>
                    {newStockPrice ? ((newStockPrice * stockQuantity) * 0.1).toFixed(2) : ((stockPrice * stockQuantity * 0.1)).toFixed(2)}
                </div>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary">Buy</button>
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default BuyActionWindow;
