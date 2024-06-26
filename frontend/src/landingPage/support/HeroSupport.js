import React from 'react'

function HeroSupport() {
  return (
    <section className="container-fluid mt-5 p-5" id="supportHero" >
      <div className="p-5 " id="supportWrapper">
        <h4 style={{ marginLeft: "-115px" }}>Support Portal</h4>
        <a className='fs-5' href="" style={{marginRight:"-110px"}}>Track Tickets</a>
      </div>
      <div className="row p-5 m-3">
        <div className="col-6 p-3">
          <h1 className="fs-4" style={{ marginTop: "-60px" }}>
            Search for an answer or browse help topics to create a ticket
          </h1>
          <input
            placeholder="Eg. how do I activate F&O, Why is my order getting rejected ..."
            className="form-control text-muted ps-4"
            style={{ marginTop: "40px", width: "700px" }}
          />
          <br />
          <div className="link-container mt-3">
            <a href="">Track account opening</a>
            <a href="">Track segment activation</a>
            <a href="">Intraday margins</a>
          </div>
          <div className='link-container mt-3'>
            <a href="">Kite user manual</a>
          </div>
        </div>
        <div className="col-6 p-3">
          <h1 className="fs-3" style={{ marginLeft: "70px" }}>Featured</h1>
          <ol style={{ marginLeft: "85px" }} className='fs-5 '>
            <li className='mt-3 '>
              <a href="" className='feature-list'>Current Takeovers and Delisting - January 2024</a>
            </li>
            <li className='mt-4'>
              <a href="" className='feature-list'>Latest Intraday leverages - MIS & CO</a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  )
}

export default HeroSupport