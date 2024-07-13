import React from 'react';
import { useSelector } from 'react-redux';
import { FaUser, FaChartLine, FaWallet, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import "./Summary.css"

function Summary() {
  const userData = useSelector((state) => state.auth.userData);
  const { finalProfitLoss, finalProfitLossPercentage, finalCurrentValue, finalInvestment, totalHoldings } =
    useSelector(state => ({
      finalProfitLoss: state.data.finalProfitLoss || 6550,
      finalProfitLossPercentage: state.data.finalProfitLossPercentage || 5.20,
      finalCurrentValue: state.data.finalCurrentValue || 31430,
      finalInvestment: state.data.finalInvestment || 29880,
      totalHoldings: state.data.totalHoldings || 5,
    }));
  console.log("finalifndsj:", finalProfitLossPercentage)

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(value || 0);
  };

  return (
    <div className="summary-container">
      <div className="user-info">
        <FaUser className="icon"  />
        <h2>Welcome, {userData?.username || 'Investor'}!</h2>
        <p>Your financial summary at a glance</p>
      </div>

      <div className="card equity-card">
        <h4><FaWallet className="icon" /> Equity</h4>
        <div className="card-content">
          <div className="main-info">
            <h4 className='text-muted'>{formatCurrency(3740)}</h4>
            <p className='text-muted'>Margin available</p>
          </div>
          <div className="additional-info">
            <p>Margins used: <span>{formatCurrency(0)}</span></p>
            <p>Opening balance: <span>{formatCurrency(3740)}</span></p>
          </div>
        </div>
      </div>

      <div className="card holdings-card">
        <h3 ><FaChartLine className="icon" /> Holdings ({totalHoldings})</h3>
        <div className="card-content">
          <div className="main-info">
            <h4 className={finalProfitLoss > 0 ? "profit" : "loss"} >
              {formatCurrency(finalProfitLoss)}
              <small>
                {finalProfitLoss > 0 ? <FaArrowUp className="arrow" /> : <FaArrowDown className="arrow" />}
                {finalProfitLossPercentage}%
              </small>
            </h4>
            <p>Profit & Loss</p>
          </div>
          <div className="additional-info">
            <p>Current Value: <span>{formatCurrency(finalCurrentValue)}</span></p>
            <p>Investment: <span>{formatCurrency(finalInvestment)}</span></p>
          </div>
        </div>
      </div>

      <div className="quick-stats">
        <div className="stat-item">
          <h5>Day's Change</h5>
          <p className={finalProfitLoss > 0 ? "profit" : "loss"}>
            {finalProfitLoss > 0 ? '+' : '-'}{formatCurrency(Math.abs(finalProfitLoss / 30))}
          </p>
        </div>
        <div className="stat-item">
          <h5>Portfolio Diversity</h5>
          <p>{totalHoldings} stocks</p>
        </div>
        <div className="stat-item">
          <h5>Yearly Returns</h5>
          <p className={finalProfitLossPercentage > 0 ? "profit" : "loss"}>
            {finalProfitLossPercentage > 0 ? '+' : '-'}{Math.abs(finalProfitLossPercentage * 12).toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default Summary;