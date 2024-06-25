import React from 'react'

function HeroProduct() {
  return (
    <div className="container border-bottom w-75 p-5" style={{ marginTop: "90px" }}>
      <div className="text-center p-3">
        <h1>Technology</h1>
        <h3 className="text-muted mt-3 fs-4">
          Sleek, modern and intuitive trading platforms
        </h3>

        <p className="mt-3 mb-5">
          Check out our{" "}
          <a href="" style={{ textDecoration: "none" }}>
            investment offerings{" "}
            <i className="fa-solid fa-arrow-right-long"></i>
          </a>
        </p>
      </div>
    </div>
  )
}

export default HeroProduct