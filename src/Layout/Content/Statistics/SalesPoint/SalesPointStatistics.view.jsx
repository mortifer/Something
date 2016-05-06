import React from "react";
import { Link } from "react-router";

import "../statistics.less";

import DatePicker from "ui/DatePicker";
import Loader from "ui/Loader";

import Upgrades from "retail-ui/lib/Upgrades";
Upgrades.enableHeight34();

import { Change, SalesPointStatisticsRequestUpdate } from "./SalesPointStatistics.reducer"

function SalesPointStatistics({ form, salesPointStatistics, salesPointStatisticsUpdating, dispatch, error }) {

    const onChange = data => dispatch({ type: Change, data: data });
    const onSalesPointStatisticsRequestUpdate = () => dispatch({ type: SalesPointStatisticsRequestUpdate });

    const salesPointName = salesPointStatistics.length ? salesPointStatistics[0].groupName : "";

    return (
        <div className="lightpage">
            <div className="lightpage_back"><h2><Link to="/statistics" className="link">Статистика</Link></h2></div>
            <Link to="/statistics" className="lightpage_close"></Link>

            <div className="lightpage_content">

                <div className="statistics">
                    <h2 className="statistics_title">{salesPointName}</h2>
                    <div className="statistics_filters">
                        <div className="statistics_filters_dates">
                            <DatePicker
                                disabled={salesPointStatisticsUpdating}
                                defaultValue={new Date()}
                                value={form.from}
                                onChange={(e, value) => { onChange({ from: value });  onSalesPointStatisticsRequestUpdate(); }} />
                            <span className="statistics_filters_delimiter">&mdash;</span>
                            <DatePicker
                                disabled={salesPointStatisticsUpdating}
                                defaultValue={new Date()}
                                value={form.to}
                                onChange={(e, value) => { onChange({ to: value });  onSalesPointStatisticsRequestUpdate(); }} />
                        </div>
                    </div>
                    {JSON.stringify(salesPointStatistics)}
                    <div className="statistics_perSalesPoint">
                        <div>
                            Выручка, ₽<br/>
                            42 551,35<br/>
                            Наличными 31 656,18<br/>
                            Безналичными 10 895,17<br/>
                        </div>
                        <div>
                            Всего чеков<br/>
                            22<br/>
                            Смена<br/>
                            08:57 — 19:03<br/>
                            Смена<br/>
                            08:57 — открыта
                        </div>
                        <div>
                            Средний чек, ₽<br/>
                            1 934,15
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesPointStatistics;

