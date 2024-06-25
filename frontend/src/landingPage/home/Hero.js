import React from 'react'

function Hero() {
  return (
    <div className='container p-5 mt-5'>
      <div className='row text-center'>
        <div className="d-flex justify-content-center mb-5">
          <img src='media/images/HomeHero.png' alt='Hero image' style={{ width: '70%', height: 'auto' }} />
        </div>
        <h1 className='mt-5 fw-semibold'>Invest in everything</h1>
        <p className='mt-2'>Online platform to invest in stocks, derivatives, mutual funds, and more</p>
        <button className='mt-4 p-2 btn btn-primary fs-5 mb-5' style={{ width: "15%", margin: "0 auto" }}>Sign up now</button>
      </div>
    </div>
  );
}

export default Hero