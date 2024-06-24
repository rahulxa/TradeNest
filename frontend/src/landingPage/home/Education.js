import React from 'react'

function Education() {
  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-5' style={{ marginLeft: '110px' }} >
          <img src='Media/Images/index-education.svg' style={{ width: '80%', height: 'auto' }} />
        </div>
        <div className='col-4 mt-4'>
          <h4>Free and open market education</h4>
          <p className='mt-4 text-muted'>Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading. </p>
          <a href='#' className='d-inline-flex align-items-center text-decoration-none' style={{ color: 'blue' }}>
            Varsity <i className="fa-solid fa-arrow-right-long ms-2"></i>
          </a>
          <p className='mt-4 text-muted'>TradingQ&A, the most active trading and investment community in
            India for all your market related queries.  </p>
          <a href='#' className='d-inline-flex align-items-center text-decoration-none' style={{ color: 'blue' }}>
            TradingQ&A <i className="fa-solid fa-arrow-right-long ms-2"></i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Education