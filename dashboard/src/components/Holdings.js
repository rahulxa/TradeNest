import React, { useState, useRef, useCallback } from 'react';
import { VerticalChart } from './VerticalChart';
import { useSelector, useDispatch } from 'react-redux';
import SellActionWindow from './SellActionWindow';
import { changeNavItems } from '../store/navSlice';


function Holdings() {
  const dispatch = useDispatch();
  const allHoldings = useSelector((state) => state.data.holdings);
  const { finalProfitLoss, finalProfitLossPercentage, finalCurrentValue, finalInvestment, totalHoldings } = useSelector(state => state.data);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [openSellWindow, setOpenSellWindow] = useState(false);
  const [sellingStockDetails, setSellingStockDetails] = useState(null);

  dispatch(changeNavItems({ currentItem: "holdings" }))


  const handleSellClick = useCallback((stock) => {
    setOpenSellWindow(true);
    setSellingStockDetails(stock);
  }, []);


  const handleCloseSellWindow = useCallback(() => {
    setOpenSellWindow(false);
  }, []);


  const labels = allHoldings.map((subArray) => subArray["stockName"]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Stock Price',
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: 'rgba(239, 83, 80, 0.7)',
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
          <h4 className="mb-0 row-6">Holdings ({totalHoldings})</h4>
          <button className=" d-flex align-items-center ms-3 custom-btn" title="Analytics" onClick={scrollToGraph} >
            <span>Analytics</span>
            <i className="fa-solid fa-chart-simple ms-2"></i>
          </button>
        </div>
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
            {allHoldings.map((stock, index) => {
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
                            title='Sell'
                            onClick={() => handleSellClick(stock)}
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
          <h4>{finalInvestment.toFixed(2)}</h4>
          <p>Total Investment</p>
        </div>
        <div className="col">
          <h4>{finalCurrentValue.toFixed(2)}</h4>
          <p>Current value</p>
        </div>
        <div className="col">
          <h4 style={{ color: finalProfitLoss > 0 ? "#4CAF50" : "red" }}>
            {finalProfitLoss.toFixed(2)} ({finalProfitLossPercentage}%)
          </h4>
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