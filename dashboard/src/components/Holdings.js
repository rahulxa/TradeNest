import React, { useEffect, useState } from 'react'
import axios from "axios"
import { VerticalChart } from './VerticalChart';
import { useSelector, useDispatch } from 'react-redux';
import { setHoldings } from '../store/dataSlice';

function Holdings() {
  const dispatch = useDispatch();
  const getAllStoreHoldings = useSelector((state) => state.data.holdings);
  const userId = useSelector((state) => state.auth.userData?._id); // Optional chaining to avoid errors
  const accessToken = useSelector((state) => state.auth.userAccessToken);
  const [finalHoldings, setFinalHoldings] = useState([]);
  const [totalInvestment, setTotalInvestment] = useState(0)
  const [totalCurrentValue, setTotalCurrentValue] = useState(0)
  const [profitLoss, setProfitLoss] = useState(0)
  const [profitLosspercentage, setProfitLossPercentage] = useState()

  
  const initialHoldings = [
    {
      stockName: "RELIANCE",
      qty: 1,
      price: 2112.4,
      dayChange: "+1.44%",
      isLoss: false,
    },
    {
      stockName: "BHARTIARTL",
      qty: 2,
      price: 541.15,
      dayChange: "+2.99%",
      isLoss: false,
    },
    {
      stockName: "HDFCBANK",
      qty: 2,
      price: 1522.35,
      dayChange: "+0.11%",
      isLoss: false,
    },
    {
      stockName: "ITC",
      qty: 5,
      price: 207.9,
      dayChange: "+0.80%",
      isLoss: false,
    },
    {
      stockName: "TATAPOWER",
      qty: 5,
      price: 124.15,
      dayChange: "-0.24%",
      isLoss: true,
    },
    // Add more initial holdings as needed
  ];

  useEffect(() => {
    if (userId && accessToken) { // Ensure userId and accessToken are available
      const fetchUserHoldings = async () => {
        try {
          const response = await axios.get(`http://localhost:3002/api/v1/holdings/get-holdings/${userId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          if (response) {
            const holdings = response.data.data.holdings
            dispatch(setHoldings({ holdings: holdings }));
          }
        } catch (error) {
          console.error("Error fetching orders:", error.message);
        }
      }
      fetchUserHoldings();
    }
  }, [userId, accessToken, dispatch]);

  useEffect(() => {
    if (getAllStoreHoldings.length > 0) {
      setFinalHoldings([...initialHoldings, ...getAllStoreHoldings])
    } else {
      setFinalHoldings(initialHoldings)
    }
  }, [getAllStoreHoldings])

  useEffect(() => {
    let totalInvestment = 0;
    let totalCurrentValue = 0;

    finalHoldings.forEach(stock => {
      const currValue = stock.price * stock.qty;
      const minPercentage = 0.8; // 80%
      const maxPercentage = 1.2; // 120%
      const randomPercentage = Math.random() * (maxPercentage - minPercentage) + minPercentage;
      const avgCost = stock.price * randomPercentage;
      const investment = avgCost * stock.qty;

      totalInvestment += investment;
      totalCurrentValue += currValue;
    });

    const profitLoss = totalCurrentValue - totalInvestment
    const percentage = (profitLoss / totalInvestment * 100).toFixed(2)

    setProfitLoss(profitLoss)
    setTotalInvestment(totalInvestment.toFixed(2));
    setTotalCurrentValue(totalCurrentValue.toFixed(2));
    setProfitLossPercentage(percentage);
  }, [finalHoldings]);

  const labels = finalHoldings.map((subArray) => subArray["stockName"])

  const data = {
    labels,
    datasets: [
      {
        label: 'Stock Price',
        data: finalHoldings.map((stock) => stock.price),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }
    ]
  }

  return (
    <>
      <h3 className='title'>Holdings ({finalHoldings.length})</h3>
      <div className='order-table'>
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day. chg</th>
            </tr>
          </thead>
          <tbody>
            {finalHoldings.map((stock, index) => {
              const minPercentage = 0.8; // 80%
              const maxPercentage = 1.2; // 120%
              const randomPercentage = Math.random() * (maxPercentage - minPercentage) + minPercentage;
              const stockPrice = stock.price / stock.qty
              const currValue = stockPrice * stock.qty;
              const avgCost = stockPrice * randomPercentage;
              const profitLoss = currValue - (avgCost * stock.qty)
              const netChange = (((stockPrice - avgCost) / avgCost) * 100).toFixed(2)
              const profClass = profitLoss >= 0 ? "profit" : "loss"
              const dayClass = stock.isLoss === true ? "loss" : "profit"

              return (
                <tr key={index}>
                  <td>{stock.stockName}</td>
                  <td>{stock.qty}</td>
                  <td>{avgCost.toFixed(2)}</td>
                  <td>{stockPrice.toFixed(2)}</td>
                  <td>{currValue.toFixed(2)}</td>
                  <td className={profClass}>{profitLoss.toFixed(2)}</td>
                  <td className={profClass}>{netChange}%</td>
                  <td className={dayClass}>{stock.dayChange}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col">
          <h5>
            {totalInvestment}
          </h5>
          <p>Total Investment</p>
        </div>
        <div className="col">
          <h5>
            {totalCurrentValue}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={profitLoss > 0 ? "text-success" : "text-danger"}>{profitLoss.toFixed(2)} ({profitLosspercentage}%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalChart data={data} />
    </>
  )
}

export default Holdings;
