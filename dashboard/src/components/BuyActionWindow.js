import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';

function BuyActionWindow({ stockName, onClose, stockPrice, dayChange, avgCost }) {
    const accessToken = useSelector((state) => state.auth.userAccessToken);
    const [stockQuantity, setStockQuantity] = useState(0);
    const [newStockPrice, setNewStockPrice] = useState(stockPrice);
    const [orderSuccessMessage, setOrderSuccesMessage] = useState("");
    const [priceMessage, setPriceMessage] = useState("");
    const [margin, setMargin] = useState(0);

    useEffect(() => {
        const updatedMargin = (stockQuantity * stockPrice).toFixed(2);
        setMargin(updatedMargin);
    }, [stockQuantity, stockPrice]);

    const handlePopupClose = () => {
        onClose();
        setOrderSuccesMessage("");
    };

    const placeOrder = async (e) => {
        e.preventDefault();

        if (newStockPrice < margin) {
            setPriceMessage("Total cost cannot be less than the calculated total!! Please check the price and quantity");
            return;
        } else if (stockQuantity === 0) {
            setPriceMessage("Quantity cannot be zero!!");
            return;
        }

        const orderData = {
            stockName: stockName,
            qty: stockQuantity,
            price: newStockPrice, // this is the total price of all the stocks combined
            mode: "Buy"
        };
        console.log("order data:", orderData)
        try {
            const orderResponse = await axios.post("http://localhost:3002/api/v1/orders/place-order", orderData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (orderResponse) {
                setOrderSuccesMessage("Order placed successfully!!          Head to orders or holdings section");
                setPriceMessage("");

                const holdingsData = {
                    stockName: stockName,
                    qty: stockQuantity,
                    price: newStockPrice / stockQuantity, // this is the price of each stock
                    avgCost: avgCost,
                    dayChange: dayChange,
                    isLoss: dayChange < 0 ? true : false,
                };

                try {
                    const holdingsResponse = await axios.post("http://localhost:3002/api/v1/holdings/create-holdings", holdingsData, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });

                    if (holdingsResponse) {
                        console.log("Holdings created successfully:", holdingsResponse.data.data);
                    }
                } catch (error) {
                    console.log("Error creating holdings:", error.message);
                }
            }
        } catch (error) {
            console.log("Error placing your order:", error.message);
        }
    };

    return (
        <>
            {orderSuccessMessage === "" ? (
                <form onSubmit={placeOrder}>
                    <div className="modal-overlay">
                        <div className="modal-content p-4 bg-light rounded shadow-sm max-w-md mx-auto">
                            <h5 style={{ color: "darkblue", textAlign: "center", textDecoration: "underline" }}>{stockName}</h5>
                            <h5 style={{ color: "darkblue", textAlign: "center" }} className='mb-2'>LTP - {stockPrice}</h5>
                            {priceMessage && <p style={{ color: "darkblue", textAlign: "center" }}>{priceMessage}</p>}
                            <div className="mb-3">
                                <label htmlFor="quantity" className="form-label">Qty.</label>
                                <input
                                    type="number"
                                    id="qty"
                                    name='qty'
                                    value={stockQuantity === 0 ? "" : stockQuantity}
                                    onChange={(e) => setStockQuantity(Number(e.target.value))}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={newStockPrice === 0 ? "" : newStockPrice}
                                    onChange={(e) => setNewStockPrice(Number(e.target.value))}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3 text-muted">
                                <strong>Margin required: </strong>
                                {margin}
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="submit" className="btn btn-primary">Buy</button>
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
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
