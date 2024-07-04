import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios"
import { useSelector } from 'react-redux';


function BuyActionWindow({ stockName, onClose, stockPrice }) {
    const accessToken = useSelector((state) => state.auth.userAccessToken)
    const [stockQuantity, setStockQuantity] = useState(null);
    const [newStockPrice, setNewStockPrice] = useState(null);
    const { register, handleSubmit, reset } = useForm(); // react form
    const [orderSuccessMessage, setOrderSuccesMessage] = useState("")

    const handleStockQuantityChange = (e) => {
        setStockQuantity(e.target.value);
    }
    const handleNewStockPrice = (e) => {
        setNewStockPrice(e.target.value);
    }

    const handlePopupClose = () => {
        onClose();
        setOrderSuccesMessage("");
        reset();
    }

    const placeOrder = async (formData) => {
        try {
            const orderData = {
                stockName: stockName,
                qty: formData.qty,
                price: formData.price,
                mode: buy
            };
            const response = await axios.post("http://localhost:3002/api/v1/orders/place-order", orderData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
            if (response) {
                setOrderSuccesMessage("Order placed successfully");
            }
        } catch (error) {
            console.log("Error placing your order:", error);
        }
    }

    return (
        <>
            {orderSuccessMessage === "" ? (
                <form onSubmit={handleSubmit(placeOrder)}>
                    <div className="modal-overlay">
                        <div className="modal-content p-4 bg-light rounded shadow-sm max-w-md mx-auto">
                            <h5 style={{ color: "darkblue", textAlign: "center", textDecoration: "underline" }}>{stockName}</h5>
                            <div className="mb-3">
                                <label htmlFor="quantity" className="form-label">Qty.</label>
                                <input
                                    type="number"
                                    id="qty"
                                    name='qty'
                                    value={stockQuantity}
                                    placeholder='Stock quantity'
                                    onChange={(e) => handleStockQuantityChange(e)}
                                    {...register("qty", { required: true })}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    defaultValue={stockPrice}
                                    value={newStockPrice}
                                    onChange={(e) => handleNewStockPrice(e)}
                                    {...register("price", { required: true })}
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
                </form>
            ) : (
                <div className="modal-overlay">
                    <div className="modal-content p-4 bg-light rounded shadow-sm max-w-md mx-auto">
                        <h5 style={{ color: "darkblue", textAlign: "center", textDecoration: "underline" }}>{orderSuccessMessage}</h5>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-secondary" onClick={handlePopupClose}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BuyActionWindow;







