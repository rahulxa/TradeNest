import React from "react";

function RightSection({ imageURL, productName, productDesription, learnMore }) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5" style={{ marginTop: "135px" }}>
          <h1>{productName}</h1>
          <p>{productDesription}</p>
          <div>
            <a href='#' style={{ color: 'blue', textDecoration: 'none' }}>
              Learn More <i className="fa-solid fa-arrow-right-long"></i>
            </a>
          </div>
        </div>
        <div className="col-6">
          <img src={imageURL} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;