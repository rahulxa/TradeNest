import React from 'react'
import { Link } from 'react-router-dom'

function HeroAbout() {
  return (
    <div className='container mt-5'>
      <div className='row mb-5'>
        <h1 className='fs-2 text-muted text-center' style={{ marginTop: "120px" }}>We pioneered the discount broking model in India.</h1>
        <h1 className='fs-2 text-muted text-center'> Now, we are breaking ground with our technology. </h1>
      </div>
      <div className='row p-5 mt-5' style={{ marginLeft: "50px" }}>
        <div className='border-top w-85'></div>
        <div className='col-6 text-muted mt-5 p-5'   >
          <p style={{ lineHeight: "1.8" }}>We kick-started operations on the 15th of August, 2010<br></br>
            with the goal of breaking all barriers that traders and<br></br>
            investors face in India in terms of cost, support, and<br></br>
            technology. We named the company Zerodha, a<br></br>
            combination of Zero and "Rodha", the Sanskrit word for<br></br>
            barrier.</p>

          <p style={{ lineHeight: "1.8" }}>
            Today, our disruptive pricing models and in-house<br></br>
            technology have made us the biggest stock broker in<br></br>
            India.
          </p>

          <p style={{ lineHeight: "1.8" }}>Over 1+ Crore clients place millions of orders every day<br></br>
            through our powerful ecosystem of investment<br></br>
            platforms, contributing over 15% of all Indian retail<br></br>
            trading volumes.</p>
        </div>
        <div className='col-6 text-muted mt-5 p-5' >
          <p style={{ lineHeight: "1.8" }}>In addition, we run a number of popular open online <br></br>
            educational and community initiatives to empower retail<br></br>
            traders and investors. <br></br>
          </p>

          <p style={{ lineHeight: "1.8" }}>
            <Link style={{ textDecoration: "none" }}>Rainmatter</Link> , our fintech fund and incubator, has invested<br></br>
            in several fintech startups with the goal of growing the <br></br>
            Indian capital markets.
          </p>

          <p style={{ lineHeight: "1.8" }}>And yet, we are always up to something new every day. <br></br>
            Catch up on the latest updates on our blog or see what <br></br>
            the media is <Link style={{ textDecoration: "none" }}>Saying about us</Link>. <br></br>
          </p>
        </div>
      </div>
    </div>
  )
}

export default HeroAbout