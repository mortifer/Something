import React from "react";

import "./statistics.less";

import DatePicker from "ui/DatePicker";
import Loader from "ui/Loader";

import Upgrades from "retail-ui/lib/Upgrades";
Upgrades.enableHeight34();

import { Change, StatisticsRequestUpdate } from "./Statistics.reducer"

function Statistics({ form, statistics, statisticsUpdating, dispatch, error }) {
    const onChange = data => dispatch({ type: Change, data: data });
    const onStatisticsRequestUpdate = () => dispatch({ type: StatisticsRequestUpdate });
    
    return (
        <div className="statistics">
            <h2 className="statistics_title">Статистика</h2>
            <div className="statistics_filters">
                <div className="statistics_filters_dates">
                    <DatePicker
                        disabled={statisticsUpdating}
                        defaultValue={new Date()}
                        value={form.from}
                        onChange={(e, value) => { onChange({ from: value });  onStatisticsRequestUpdate(); }} />
                    <span className="statistics_filters_delimiter">&mdash;</span>
                    <DatePicker
                        disabled={statisticsUpdating}
                        defaultValue={new Date()}
                        value={form.to}
                        onChange={(e, value) => { onChange({ to: value });  onStatisticsRequestUpdate(); }} />
                </div>
            </div>

            { error ?
                <div className="validation validation__error">{error}</div> :
                <Loader type="big" active={statisticsUpdating} >
                    {
                        statistics.length ?
                            (<div>:)</div>) : (<div>:(</div>)
                    }
                </Loader>
            }
        </div>
    );
}

export default Statistics;

