import React from 'react'

function Stats() {
  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-6 p-5'>
          <h2>Trust with confidence</h2>
          <h5 className='mt-5'>Customer-first always</h5>
          <p className='mb-0 text-muted'>That's why 1.5+ crore customers trust Zerodha with</p>
          <p className='text-muted'>₹4.5+ lakh crores worth of equity investments</p>

          <h5 className='mt-5'>No spam or gimmicks</h5>
          <p className='mb-0 text-muted' >No gimmicks, spam, "gamification", or annoying push </p>
          <p className='mb-0 text-muted'>notifications. High quality apps that you use at your </p>
          <p className='text-muted'>pace, the way you like. </p>

          <h5 className='mt-5'>The Zerodha universe</h5>
          <p className='mb-0 text-muted'>Not just an app, but a whole ecosystem. Our investments</p>
          <p className='mb-0 text-muted'>in 30+ fintech startups offer you tailored services  </p>
          <p className='text-muted'>specific to your needs.  </p>

          <h5 className='mt-5 '>Do better with money</h5>
          <p className='mb-0 text-muted'>
            With initiatives like <a href='#' style={{ color: 'blue', textDecoration: 'none' }}>Nudge</a> and <a href='#' style={{ color: 'blue', textDecoration: 'none' }}>Kill Switch</a>, we don't just          </p>
          <p className='mb-0 text-muted'>facilitate transactions, but actively help you do better </p>
          <p className='text-muted'>with your money. </p>
        </div>
        <div className='col-6 '>
          <img src='Media/Images/ecosystem.png' style={{ width: '100%', height: 'auto', marginTop: '40px' }} alt='Ecosystem' />
          <div className='mt-3 offset-3'>
            <a href='#' className='me-4' style={{ color: 'blue', textDecoration: 'none' }}>
              Explore our products <i className="fa-solid fa-arrow-right-long"></i>
            </a>
            <a href='#' style={{ color: 'blue', textDecoration: 'none' }}>
              Try Kite demo <i className="fa-solid fa-arrow-right-long"></i>
            </a>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Stats