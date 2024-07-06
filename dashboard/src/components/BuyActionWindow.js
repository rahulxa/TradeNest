import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios"
import { useSelector } from 'react-redux';


function BuyActionWindow({ stockName, onClose, stockPrice, dayChange }) {
    const accessToken = useSelector((state) => state.auth.userAccessToken)
    const [stockQuantity, setStockQuantity] = useState(null);
    const [newStockPrice, setNewStockPrice] = useState(null);
    const { register, handleSubmit, reset } = useForm(); // react form
    const [orderSuccessMessage, setOrderSuccesMessage] = useState("");
    const [priceMessage, setPriceMessage] = useState("")

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
            //placing order
            if (formData.price < (stockPrice * formData.qty)) {
                setPriceMessage("Stock price cannot be less than the LTP!! Please check the price and quantity");
                return
            } else if (formData.qty <= 0 || formData.qty === undefined) {
                setPriceMessage("Quantity cannot be zero!!");
                return
            }
            const orderData = {
                stockName: stockName,
                qty: formData.qty,
                price: formData.price, //this is lTP for holdings
                mode: "buy"
            };
            const orderResponse = await axios.post("http://localhost:3002/api/v1/orders/place-order", orderData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
            if (orderResponse) {
                setOrderSuccesMessage("Order placed successfully!!");
                setPriceMessage("")
                //creating holdings
                const holdingsData = {
                    stockName: stockName,
                    qty: formData.qty,
                    price: formData.price,
                    dayChange: dayChange,
                    isLoss: dayChange < 0 ? true : false,
                }
                // console.log("this is holdings data:", holdingsData)
                try {
                    const holdingsResponse = await axios.post("http://localhost:3002/api/v1/holdings/create-holdings", holdingsData,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`
                            }
                        }
                    )
                    if (holdingsResponse) {
                        // console.log("this is the holding response:", holdingsResponse.data.data);
                        console.log("Holdings created successfully")
                    }
                } catch (error) {
                    console.log("Error creating holdings:", error.message);
                }
            }
        } catch (error) {
            console.log("Error placing your order:", error.message);
        }
    }

    return (
        <>
            {orderSuccessMessage === "" ? (
                <form onSubmit={handleSubmit(placeOrder)}>
                    <div className="modal-overlay">
                        <div className="modal-content p-4 bg-light rounded shadow-sm max-w-md mx-auto">
                            <h5 style={{ color: "darkblue", textAlign: "center", textDecoration: "underline" }}>{stockName}</h5>
                            {priceMessage && <p style={{ color: "darkblue", textAlign: "center" }}>{priceMessage}</p>}
                            <div className="mb-3">
                                <label htmlFor="quantity" className="form-label">Qty.</label>
                                <input
                                    type="number"
                                    id="qty"
                                    name='qty'
                                    value={stockQuantity}
                                    // placeholder='Stock quantity'
                                    {...register("qty", { required: true })}
                                    onChange={(e) => handleStockQuantityChange(e)}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    // defaultValue={stockPrice}
                                    value={newStockPrice}
                                    {...register("price", { required: true })}
                                    onChange={(e) => handleNewStockPrice(e)}
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

export default BuyActionWindow;







