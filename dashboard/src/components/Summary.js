import React from 'react'
import { useSelector } from 'react-redux';

function Summary() {
  const userData = useSelector((state) => state.auth.userData);
  const { finalProfitLoss, finalProfitLossPercentage, finalCurrentValue, finalInvestment, totalHoldings } =
    useSelector(state => ({
      finalProfitLoss: state.data.finalProfitLoss,
      finalProfitLossPercentage: state.data.finalProfitLossPercentage,
      finalCurrentValue: state.data.finalCurrentValue,
      finalInvestment: state.data.finalInvestment,
      totalHoldings: state.data.totalHoldings,
    }));

  return (
    <>
      <div className="username">
        <h6>Hi, {userData?.username} </h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({totalHoldings ? totalHoldings : (5)})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={finalProfitLoss > 0 ? "profit" : "loss"}>
              {finalProfitLoss ? finalProfitLoss.toFixed(2) : "6.55k"} <small>{finalProfitLossPercentage ? finalProfitLossPercentage : "+5.20%"}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{finalCurrentValue ? finalCurrentValue.toFixed(2) : "31.43k"}</span>{" "}
            </p>
            <p>
              Investment <span>{finalInvestment ? finalInvestment.toFixed(2) : "29.88k"}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
}

export default Summary