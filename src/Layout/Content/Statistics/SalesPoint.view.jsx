import React from "react";
import { Link } from "react-router";

import "./statistics.less";


function SalesPoint() {

    return (
        <div className="statistics">
            <h2 className="statistics_title"><Link to="/statistics" className="link">Статистика</Link></h2>
            <div className="lightPage">
                <Link to="/statistics" className="lightPage_close"></Link>
                по точке
            </div>
        </div>
    );
}

export default SalesPoint;

