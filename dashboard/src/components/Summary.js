import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaChartLine, FaWallet, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import "./Summary.css";
import { changeNavItems } from '../store/navSlice';

function Summary() {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const { finalProfitLoss, finalProfitLossPercentage, finalCurrentValue, finalInvestment, totalHoldings } = useSelector(state => state.data);


  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(value || 0);
  };

  dispatch(changeNavItems({ currentItem: "summary" }))

  const openingBalance = finalInvestment; // Dynamically set opening balance based on initial investment
  const equity = finalCurrentValue; // Assuming equity is the current value of holdings
  const marginsUsed = openingBalance - equity; // Margins used is the difference between equity and opening balance

  return (
    <div className="summary-container mt-1">
      <div className="user-info">
        <FaUser className="icon" style={{ fontSize: '1.8em' }} />
        <h2>Welcome, {userData?.username || 'Investor'}!</h2>
        <p>Your financial summary at a glance</p>
      </div>

      <div className="card equity-card">
        <h5><FaWallet className="icon" /> Equity</h5>
        <div className="card-content">
          <div className="main-info">
            <h4 className='text-muted fs-5'>{formatCurrency(equity)}</h4>
            <p className='text-muted'>Equity Value</p>
          </div>
          <div className="additional-info">
            <p>Margins used: <span>{formatCurrency(marginsUsed)}</span></p>
            <p>Opening balance: <span>{formatCurrency(openingBalance)}</span></p>
          </div>
        </div>
      </div>

      <div className="card holdings-card">
        <h5 ><FaChartLine className="icon" /> Holdings ({totalHoldings})</h5>
        <div className="card-content">
          <div className="main-info">
            <h4 className={`${finalProfitLoss > 0 ? "profit" : "loss"} fs-5`}>
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

      <div className="quick-stats mt-3">
        <div className="stat-item">
          <h5 className='fs-6'>Day's Change</h5>
          <p className={finalProfitLoss > 0 ? "profit" : "loss"}>
            {finalProfitLoss > 0 ? '+' : '-'}{formatCurrency(Math.abs(finalProfitLoss / 30))}
          </p>
        </div>
        <div className="stat-item">
          <h5 className='fs-6'>Portfolio Diversity</h5>
          <p>{totalHoldings} stocks</p>
        </div>
        <div className="stat-item">
          <h5 className='fs-6'>Yearly Returns</h5>
          <p className={`${finalProfitLossPercentage > 0 ? "profit" : "loss"} fs-6`}>
            {finalProfitLossPercentage > 0 ? '+' : '-'}{Math.abs(finalProfitLossPercentage * 12).toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default Summary;
