import React from "react";
import { Link } from "react-router";

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
            <div className="lightpage_back"><h2><Link to="/Statistics" className="link">Статистика</Link></h2></div>
            <Link to="/Statistics" className="lightpage_close"></Link>

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
                    {/*JSON.stringify(salesPointStatistics)*/}
                    <div className="statistics_perSalesPoint">
                        <div>
                            <div className="statistics_perSalesPoint_title">Выручка, ₽</div>
                            <div className="statistics_perSalesPoint_totals">42 551<span>,35</span></div>
                            <div className="statistics_perSalesPoint_numbers"><label>Наличными</label> <div>31 656<span>,18</span></div></div>
                            <div className="statistics_perSalesPoint_numbers"><label>Безналичными</label> <div>10 895<span>,17</span></div></div>
                        </div>
                        <div>
                            <div className="statistics_perSalesPoint_title">Всего чеков</div>
                            <div className="statistics_perSalesPoint_totals">22</div>
                            <div className="statistics_perSalesPoint_common">
                                <div>Смена</div>
                                08:57 — 19:03
                            </div>
                            <div className="statistics_perSalesPoint_common">
                                <div>Смена</div>
                                08:57 — открыта
                            </div>
                        </div>
                        <div>
                            <div className="statistics_perSalesPoint_title">Средний чек, ₽</div>
                            <div className="statistics_perSalesPoint_totals">1 934<span>,15</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesPointStatistics;

