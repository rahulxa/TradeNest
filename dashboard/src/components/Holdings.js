import React, { useEffect, useState } from 'react'
import axios from "axios"
import { VerticalChart } from './VerticalChart';

function Holdings() {

  const finalHoldings = [
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
  ];

  // const [allHoldings, setAllHoldings] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:3002/api/v1/allHoldings")
  //     .then((res) => {
  //       setAllHoldings(res.data)
  //       console.log("data:", res.data);
  //     })
  // }, []);


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
            {/*  */}
            {/*  */}
            {finalHoldings.map((stock, index) => {
              const currValue = stock.price * stock.qty;
              const avgCost = currValue / stock.qty;
              const profitLoss = (currValue * stock.qty) - (avgCost * stock.qty)
              const netChange = ((stock.price - avgCost) / avgCost) * 100
              const profClass = profitLoss >= 0 ? "profit" : "loss"
              const dayClass = stock.isLoss === true ? "loss" : "profit"

              // const isProfit = currValue - stock.avg * stock.qty >= 0.0;
              // const profClass = isProfit ? "profit" : "loss";
              // const dayClass = stock.isLoss === true ? "loss" : "profit"

              return (
                <tr key={index}>
                  <td>{stock.stockName}</td>
                  <td>{stock.qty}</td>
                  <td>{avgCost.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{currValue.toFixed(2)}</td>
                  <td className={profClass}>{profitLoss.toFixed(2)}</td>
                  <td className={profClass}>{netChange}</td>
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
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalChart data={data} />
    </>
  )
}

export default Holdings