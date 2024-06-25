import React from "react";
import { Link } from "react-router-dom";

function Team() {
  return (
    <div className="container mb-5">
      <div className="row p-3 mt-5">
        <h2 className="text-center text-muted ">People</h2>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="media/images/me.png"
            style={{ borderRadius: "100%", width: "50%" }}
          />
          <h4 className="mt-4">Rahul Acharya</h4>
          <h6>Developer</h6>
        </div>
        <div className="col-6 p-3 mt-4">
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <p>
            Connect on <Link style={{ textDecoration: "none" }} to={"/"}>Homepage</Link> / <Link style={{ textDecoration: "none" }}>TradingQ&A</Link> /{" "}
            <Link style={{ textDecoration: "none" }}>Twitter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;