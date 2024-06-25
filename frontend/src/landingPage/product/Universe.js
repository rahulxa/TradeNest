import React from "react";

function Universe() {
    return (
        <div className="container mt-5 mb-5">
            <div className="row text-center">
                <h1>The Zerodha Universe</h1>
                <p>
                    Extend your trading and investment experience even further with our
                    partner platforms
                </p>

                <div className="col-4 p-3 mt-5">
                    <img src="Media/Images/smallcase-logo.png" style={{ width: "150px", height: "auto" }} />
                    <p className="text-small text-muted">Thematic investment platform</p>
                </div>
                <div className="col-4 p-3 mt-5">
                    <img src="Media/images/streak-logo.png" style={{ width: "150px", height: "auto" }} />
                    <p className="text-small text-muted">Algo & strategy platform</p>
                </div>
                <div className="col-4 p-3 mt-5">
                    <img src="Media/images/sensibull-logo.svg" style={{ width: "150px", height: "auto" }} />
                    <p className="text-small text-muted">Options trading platform</p>
                </div>
                <div className="col-4 p-3 mt-5">
                    <img src="Media/images/zerodhafundhouse.png" style={{ width: "150px", height: "auto" }} />
                    <p className="text-small text-muted">Asset Management</p>
                </div>
                <div className="col-4 p-3 mt-5">
                    <img src="Media/images/tijori.svg" style={{ width: "150px", height: "auto" }} />
                    <p className="text-small text-muted">Fundamental Research platform</p>
                </div>
                <div className="col-4 p-3 mt-5">
                    <img src="Media/images/ditto-logo.png" style={{ width: "150px", height: "auto" }} />
                    <p className="text-small text-muted">Insurance</p>
                </div>
                <button className='mt-4 p-2 btn btn-primary fs-5 mb-5' style={{ width: "15%", margin: "0 auto" }}>Sign up now</button>
            </div>
        </div>
    );
}

export default Universe;