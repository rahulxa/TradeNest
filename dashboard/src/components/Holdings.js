import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from "axios";
import { VerticalChart } from './VerticalChart';
import { useSelector, useDispatch } from 'react-redux';
import { setFinalData, setHoldings } from '../store/dataSlice';
import { debounce } from 'lodash';
import SellActionWindow from './SellActionWindow';

function Holdings() {
  const dispatch = useDispatch();
  const getAllStoreHoldings = useSelector((state) => state.data.holdings);
  const userId = useSelector((state) => state.auth.userData?._id);
  const accessToken = useSelector((state) => state.auth.userAccessToken);
  const [finalHoldings, setFinalHoldings] = useState([]);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalCurrentValue, setTotalCurrentValue] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);
  const [profitLosspercentage, setProfitLossPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [openSellWindow, setOpenSellWindow] = useState(false);
  const [sellingStockDetails, setSellingStockDetails] = useState(null);


  const initialHoldings = [
    {
      stockName: "BHARTIARTL",
      qty: 2,
      price: 541.15,
      dayChange: "+2.99%",
      isLoss: false,
      avgCost: 500.0,  // Hypothetical average cost
    },
    {
      stockName: "HDFCBANK",
      qty: 2,
      price: 1522.35,
      dayChange: "+0.11%",
      isLoss: false,
      avgCost: 1400.0,  // Hypothetical average cost
    },
    {
      stockName: "ITC",
      qty: 5,
      price: 207.9,
      dayChange: "+0.80%",
      isLoss: false,
      avgCost: 180.0,  // Hypothetical average cost
    },
    {
      stockName: "TATAPOWER",
      qty: 5,
      price: 124.15,
      dayChange: "-0.24%",
      isLoss: true,
      avgCost: 100.0,  // Hypothetical average cost
    },
    // Add more initial holdings as needed
  ];


  //api call to initial holdings
  const fetchUserHoldings = useCallback(async () => {
    if (userId && accessToken) {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3002/api/v1/holdings/get-holdings/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (response) {
          const holdings = response.data.data.holdings;
          dispatch(setHoldings({ holdings: holdings }));
        }
      } catch (error) {
        console.error("Error fetching holdings:", error.message);
      } finally {
        setIsLoading(false);
      }
    }
  }, [userId, accessToken, dispatch]);


  //initial call to fetch user holdings
  useEffect(() => {
    fetchUserHoldings();
  }, [fetchUserHoldings]);


  //concatinating initial and userholdings
  useEffect(() => {
    if (getAllStoreHoldings.length > 0) {
      setFinalHoldings([...initialHoldings, ...getAllStoreHoldings]);
      dispatch((setFinalData({
        totalHoldings: finalHoldings.length
      })));
    } else {
      setFinalHoldings(initialHoldings);
    }
  }, [getAllStoreHoldings]);


  //calculating total values
  useEffect(() => {
    let totalInvestment = 0;
    let totalCurrentValue = 0;

    finalHoldings.forEach(stock => {
      const currValue = stock.price * stock.qty;
      // const avgCost = stock.price * randomPercentage;
      const investment = stock.avgCost * stock.qty;

      totalInvestment += investment;
      totalCurrentValue += currValue;
    });

    const profitLoss = totalCurrentValue - totalInvestment;
    const percentage = ((profitLoss / totalInvestment) * 100).toFixed(2);

    setProfitLoss(profitLoss);
    setTotalInvestment(totalInvestment.toFixed(2));
    setTotalCurrentValue(totalCurrentValue.toFixed(2));
    setProfitLossPercentage(percentage);

    dispatch(setFinalData({
      finalProfitLoss: profitLoss,
      finalProfitLossPercentage: percentage,
      finalCurrentValue: totalCurrentValue,
      finalInvestment: totalInvestment
    }));

  }, [finalHoldings, dispatch]);


  //handling refresh button click
  const debouncedRefresh = useCallback(
    debounce(() => {
      fetchUserHoldings();
    }, 300),
    [fetchUserHoldings]
  );

  //refresh button click
  const handleRefreshClick = () => {
    debouncedRefresh();
  };


  //
  const handleSellclick = (stock) => {
    setOpenSellWindow(true);
    setSellingStockDetails(stock);
  }

  const handleCloseSellWindow = () => {
    setOpenSellWindow(false);
  }


  const labels = finalHoldings.map((subArray) => subArray["stockName"]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Stock Price',
        data: finalHoldings.map((stock) => stock.price),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }
    ]
  };

  const graphRef = useRef(null);

  const scrollToGraph = () => {
    if (graphRef.current) {
      graphRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }


  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-5 text-muted">
        <div className="d-flex align-items-center">
          <h3 className="mb-0">Holdings ({finalHoldings.length})</h3>
          <button className="ms-3" title="Analytics" onClick={scrollToGraph}>
            <i className="fa-solid fa-chart-simple"></i>
          </button>
        </div>
        <button
          className="custom-btn-refresh"
          onClick={handleRefreshClick}
          disabled={isLoading}
        >
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className='order-table'>
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th></th> {/* Empty header for the button column */}
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day. chg</th>
            </tr>
          </thead>
          <tbody>
            {finalHoldings.map((stock, index) => {
              //stock.price
              // const stockPrice = stock.price / stock.qty;
              // console.log("stock price:", stockPrice);
              const currValue = stock.price * stock.qty;
              const profitLoss = currValue - (stock.avgCost * stock.qty);
              const netChange = (((stock.price - stock.avgCost) / stock.avgCost) * 100).toFixed(2);
              const profClass = profitLoss >= 0 ? "profit" : "loss";
              const dayClass = stock.isLoss === true ? "loss" : "profit";

              return (
                <React.Fragment key={index}>
                  {openSellWindow === true ? (
                    <SellActionWindow stock={sellingStockDetails} onClose={handleCloseSellWindow} />
                  ) : (
                    <tr
                      key={index}
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td>{stock.stockName}</td>
                      <td>{stock.qty}</td>
                      <td>{stock.avgCost.toFixed(2)}</td>
                      <td>{stock.price.toFixed(2)}</td>
                      <td style={{ width: '60px', textAlign: 'center' }}>
                        {index > 3 && hoveredRow === index && (
                          <button
                            onClick={() => handleSellclick(stock)}
                            className="btn btn-sm btn-primary rounded"
                            style={{
                              fontSize: '0.95rem',
                              padding: '3px 9px',
                              lineHeight: '1.1',
                              display: 'inline-block',
                              verticalAlign: 'middle',
                              marginLeft: "15px",
                              borderRadius: '4px'
                            }}
                          >
                            Sell
                          </button>
                        )}
                      </td>
                      <td>{currValue.toFixed(2)}</td>
                      <td className={profClass}>{profitLoss.toFixed(2)}</td>
                      <td className={profClass}>{netChange}%</td>
                      <td className={dayClass}>{stock.dayChange}</td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col">
          <h5>{totalInvestment}</h5>
          <p>Total Investment</p>
        </div>
        <div className="col">
          <h5>{totalCurrentValue}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 style={{ color: profitLoss > 0 ? "#4CAF50" : "red" }}>
            {profitLoss.toFixed(2)} ({profitLosspercentage}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      <div ref={graphRef}>
        <VerticalChart data={data} />
      </div>
    </>
  );
}

export default Holdings;