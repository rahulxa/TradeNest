import React from 'react'

function Pricing() {
  return (
    <div className='container'>
      <div className='row '>
        <div className='col-5 p-5' style={{ marginLeft: '120px' }}>
          <h2>Unbeatable pricing</h2>
          <p className='mt-4'>
            We pioneered the concept of discount broking and price<br />
            transparency in India. Flat fees and no hidden charges.
          </p>
          <a href='#' className='d-inline-flex align-items-center text-decoration-none' style={{ color: 'blue' }}>
            See Pricing <i className="fa-solid fa-arrow-right-long ms-2"></i>
          </a>
        </div>
        <div className='col-4 p-5 '>
          <div className="container-fluid p-0" style={{ width: "500px" }}>
            <div className="row g-0">
              <div className="col-6">
                <div className="card h-100 rounded-0 border-end-0">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center" style={{ height: '180px' }} >
                    <h2 className="card-title mb-5 fs-1 text-muted">$0</h2>
                    <p className="card-text text-muted">Free equity delivery and direct mutual funds</p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card h-100 rounded-0">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center" style={{ height: '180px' }} >
                    <h2 className="card-title mb-5 fs-1 text-muted">$5</h2>
                    <p className="card-text mb-4 text-muted">Intraday and F&O</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing