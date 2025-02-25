import React from 'react'
import { Route, Routes } from "react-router-dom";

import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import News from "./News";
import Summary from "./Summary";
import WatchList from "./WatchList";
import AI from './AI';
// import { GeneralContextProvider } from "./GeneralContext";


function Dashboard() {
    return (
        <div className="dashboard-container">
            {/* <GeneralContextProvider> */}
            <WatchList />
            {/* </GeneralContextProvider> */}
            <div className="content">
                <Routes>
                    <Route exact path="/" element={<Summary />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/holdings" element={<Holdings />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/funds" element={<Funds />} />
                    <Route path="/AI" element={<AI />} />
                </Routes>
            </div>
        </div>
    )
}

export default Dashboard