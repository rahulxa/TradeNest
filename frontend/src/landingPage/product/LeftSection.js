import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6">
          <img src={imageURL} />
        </div>
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDesription}</p>
          <div>
            <a href='#' style={{ color: 'blue', textDecoration: 'none' }}>
              Try demo <i className="fa-solid fa-arrow-right-long"></i>
            </a>
             <a href='#' style={{ color: 'blue', textDecoration: 'none', marginLeft:"90px" }}>
              Learn more <i className="fa-solid fa-arrow-right-long"></i>
            </a>
          </div>
          <div className="mt-3">
            <a href={googlePlay}>
              <img src="Media/Images/google-Play-badge.svg" />
            </a>
            <a href={appStore}>
              <img
                src="Media/Images/appstore-badge.svg"
                style={{ marginLeft: "50px" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;