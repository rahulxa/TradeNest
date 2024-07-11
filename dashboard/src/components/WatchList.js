import React, { useState, useRef } from 'react'
import { watchlist } from '../data/data'
import { Tooltip, Grow } from "@mui/material"
import { BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp, Label, MoreHoriz } from "@mui/icons-material"
import { DoughnoutChart } from './DoughnoutChart'
import BuyActionWindow from './BuyActionWindow'

function WatchList() {
  const labels = watchlist.map((subArray) => subArray["name"])

  const data = {
    labels,
    datasets: [
      {
        label: 'Price',
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      }
    ]
  }

  const doughnoutChartRef = useRef(null);

  const scrollToChart = () => {
    if (doughnoutChartRef.current) {
      doughnoutChartRef.current.scrollIntoView({ behavior: "smooth" })
    }
  };

  return (
    <div className='watchlist-container'>
      <div className='search-container'>
        <input
          type='text'
          name='search'
          id='search'
          placeholder='Search eg:infy, bse, nifty fut weekly, gold mcx'
          className='search'
          disabled
        />
        <span className='counts'>{watchlist.length}/50</span>
      </div>

      <div className="container mt-2">
        <div className="row">
          <div className="col-4">
            <strong>(Stock Name)</strong>
          </div>
          <div className="col-3" style={{ marginLeft: "30px" }}>
            <strong>(LTP)</strong>
          </div>
          <div className="col-2" style={{ marginRight: "15px" }}>
            <strong>Avg Cost</strong>
          </div>
        </div>
        <ul className='list-group'>
          {watchlist.map((stock, index) => (
            <WatchListItem stock={stock} key={index} scrollToChart={scrollToChart} />
          ))}
        </ul>
      </div>
      <div ref={doughnoutChartRef}>
        <DoughnoutChart data={data} />
      </div>
    </div>
  )
}

export default WatchList


function WatchListItem({ stock, scrollToChart }) {
  const [showWatchListActions, setShowWatchlistActions] = useState(false);

  const mouseHover = (e) => {
    setShowWatchlistActions(true);
  };
  const mouseLeave = (e) => {
    setShowWatchlistActions(false);
  };

  return (
    <li onMouseEnter={mouseHover} onMouseLeave={mouseLeave} className="list-group-item mt-2">
      <div className="row">
        <div className="col-4">
          <span className={stock.isDown ? "text-danger" : "text-success"}>{stock.name}</span>
        </div>
        <div className="col-3">
          <span className='price'>{stock.price}</span>
        </div>
        <div className="col-2">
          <span className='price'>{stock.avgCost}</span>
        </div>
      </div>
      <div className="d-flex align-items-center mt-2">
        <span className='me-2'>{stock.percent}</span>
        {stock.isDown ? (
          <KeyboardArrowDown className="icon text-danger" />
        ) : (
          <KeyboardArrowUp className="icon text-success" />
        )}
      </div>
      {showWatchListActions && <WatchListActions uid={stock.name} stockPrice={stock.price} dayChange={stock.percent} avgCost={stock.avgCost} scrollToChart={scrollToChart} />}
    </li>
  );
}





function WatchListActions({ uid, stockPrice, dayChange, avgCost, scrollToChart }) {
  const [buy, setBuy] = useState(false);

  const openBuyActionWindow = () => {
    setBuy(true);
  };
  const closeBuyActionWindow = () => {
    setBuy(false);
  };

  return (
    <>
      {buy && (
        <div className='container'>
          <BuyActionWindow stockName={uid} stockPrice={stockPrice} dayChange={dayChange} onClose={closeBuyActionWindow} avgCost={avgCost} />
        </div>
      )}
      {!buy && (
        <span className='actions'>
          <span>
            <Tooltip 
              title="Buy(B)"
              placement='top'
              arrow
              TransitionComponent={Grow}
            >
              <button className='buy' onClick={openBuyActionWindow}>Buy</button>
            </Tooltip>
            <Tooltip
              title="Analytics(A)"
              placement='top'
              arrow
              TransitionComponent={Grow}
            >
              <button className='action' onClick={scrollToChart}>
                <BarChartOutlined className='icon' />
              </button>
            </Tooltip>
            <Tooltip
              title="More"
              placement='top'
              arrow
              TransitionComponent={Grow}
            >
              <button className='action'>
                <MoreHoriz className='icon' />
              </button>
            </Tooltip>
          </span>
        </span>
      )}
    </>
  );
}
