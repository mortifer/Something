import React from "react";
import {Link, IndexLink} from "react-router";

import "./statistics.less";

import DatePicker from "ui/DatePicker";
import Loader from "ui/Loader";

import Upgrades from "retail-ui/lib/Upgrades";
Upgrades.enableHeight34();

import { Change, StatisticsRequestUpdate } from "./Statistics.reducer"

function formatMoney(money) {
    var tmp = money.toFixed(2).split(".");
    return (<td>{parseInt(tmp[0]).toLocaleString()}<span>,{tmp[1]}</span></td>);
}

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
                    <table>
                        <tbody>
                        <tr>
                            <td><div>Органисьон тоталь сумасьон</div></td>
                            { formatMoney(statistics.reduce( (p,c) => ( p+c.total ), 0)) }
                        </tr>
                        </tbody>
                    </table>
                    { statistics.length ?(
                        <table>
                            <thead>
                            <tr>
                                <td></td>
                                <td>Выручка, <span className="rur">₽</span></td>
                                <td>Чеки</td>
                                <td>Средний чек, <span className="rur">₽</span></td>
                            </tr>
                            </thead>
                            <tbody>
                            {statistics.map((item, i) => (
                                <tr key={i}>
                                    <td>
                                        <div><Link to={`/statistics/salesPoint?salesPointId=${item.groupId}`} className="link">{item.groupName}</Link></div>
                                    </td>
                                    {formatMoney(item.total)}
                                    <td>{item.count.toLocaleString()}</td>
                                    {formatMoney(item.total/item.count)}
                                </tr>
                            ))}
                            </tbody>
                        </table>


                    ) : (
                        <div>:(</div>
                    )}
                </Loader>
            }
        </div>
    );
}

export default Statistics;

