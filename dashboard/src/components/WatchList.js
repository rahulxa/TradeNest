import React, { useState } from 'react'
import { watchlist } from '../data/data'
import { Tooltip, Grow } from "@mui/material"
import { BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp, MoreHoriz } from "@mui/icons-material"


function WatchList() {
  return (
    <div className='watchlist-container'>
      <div className='search-container'>
        <input
          type='text'
          name='search'
          id='search'
          placeholder='Search eg:infy, bse, nifty fut weekly, gold mcx'
          className='search'
        />
        <span className='counts'>{watchlist.length}/50</span>
      </div>

      <ul className='list'>
        {watchlist.map((stock, index) =>
          <WatchListItem stock={stock} key={index} />)}
      </ul>
    </div>
  )
}

export default WatchList


function WatchListItem({ stock, index }) {
  const [showWatchListActions, setShowWatchlistActions] = useState(false)

  const mouseHover = (e) => {
    setShowWatchlistActions(true)
  }
  const mouseLeave = (e) => {
    setShowWatchlistActions(false)
  }

  return (
    <li onMouseEnter={mouseHover} onMouseLeave={mouseLeave}>
      <div className='item'>
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className='itemInfo'>
          <span className='percent'>{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="icon down" />
          ) : (
            <KeyboardArrowUp className="icon up" />
          )}
          <span className='price'>{stock.price}</span>
        </div>
      </div>
      {showWatchListActions && <WatchListActions uid={stock.name} />}
    </li>
  )
}


function WatchListActions({ uid }) {
  return (
    <span className='actions'>
      <span>
        <Tooltip
          title="Buy(B)"
          placement='top'
          arrow
          TransitionComponent={Grow}
        >
          <button className='buy'>Buy</button>
        </Tooltip>
        <Tooltip
          title="Sell(S)"
          placement='top'
          arrow
          TransitionComponent={Grow}
        >
          <button className='sell'>Sell</button>
        </Tooltip>
        <Tooltip
          title="Analytics(A)"
          placement='top'
          arrow
          TransitionComponent={Grow}
        >
          <button className='action' >
            <BarChartOutlined className='icon' />
          </button>
        </Tooltip>
        <Tooltip
          title="More"
          placement='top'
          arrow
          TransitionComponent={Grow}
        >
          <button className='action' >
            <MoreHoriz className='icon' />
          </button>
        </Tooltip>
      </span>
    </span>
  )
}