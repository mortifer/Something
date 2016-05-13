import React from "react";
import {Link, IndexLink} from "react-router";

import "./statistics.less";

import {Motion, spring} from 'react-motion';

import DatePicker from "ui/DatePicker";
import Loader from "ui/Loader";

import Upgrades from "retail-ui/lib/Upgrades";
Upgrades.enableHeight34();

import { Change, StatisticsRequestUpdate } from "./Statistics.reducer"

function formatMoney(money, tag, showRur) {
    var tmp = money.toFixed(2).split(".");
    return (tag == "div" ?
        <div>{parseInt(tmp[0]).toLocaleString()}<span>,{tmp[1]}{showRur ? <span className="rur">&nbsp;₽</span> : null}</span></div>:
        <td>{parseInt(tmp[0]).toLocaleString()}<span>,{tmp[1]}{showRur ? <span className="rur">&nbsp;₽</span> : null}</span></td>);
}

var isBarChartInteractive = false;
var BarChartInteractiveCount = 0;
function BarChartInteractive(bind) {
    // TODO: при смене диапазона ховеры хреново себя ведут
    var $colsContainers = $(".cols");
    var $cols = $colsContainers.find(".cols_col");
    var index;

    if (bind) {
        $(".statistics_list").append("<div class=\"cols_col_hoverContainer\"/>");
        $colsContainers.first().find(".cols_col").each( function(){
            $(".cols_col_hoverContainer").append("<div class=\"cols_col_hover\"/>");
            $(".cols_col_hoverContainer .cols_col_hover").last().css({
                top: $(this).parent().parent().position().top + $(this).parent().parent().height(),
                bottom: 0,
                left: $(this).position().left,
                width: $(this).width()
            })
        });

        $cols.each( function(){
            $(this).bind("mouseenter", function(){
                index = 0;
                $(this).addClass("-hover");
                $(this).parents(".cols").find(".cols_col").each( function(i){
                    if ($(this).hasClass("-hover"))
                        index = i + 1
                })
                $colsContainers.find(".cols_col:nth-child(" + index + ")").addClass("-hover");
                $(".cols_col_hover:nth-child(" + index + ")").addClass("-hover");
            });
            $(this).bind("mouseleave", function(){
                $cols.removeClass("-hover");
                $(".cols_col_hover").removeClass("-hover");
            });
        });
    } else {
        $cols.unbind();
        $(".cols_col_hoverContainer").remove();
    }
}

class BarChart extends React.Component {
    componentWillMount() {
        BarChartInteractiveCount++;
    }

    componentDidMount() {
        BarChartInteractiveCount--;
        if (!isBarChartInteractive && !BarChartInteractiveCount) {
            isBarChartInteractive = true;
            BarChartInteractive(isBarChartInteractive);
        }
    }

    componentWillReceiveProps() {
        BarChartInteractive(false);
        BarChartInteractive(true);
    }

    componentWillUnmount() {
        if (isBarChartInteractive) {
            isBarChartInteractive = false;
            BarChartInteractive(isBarChartInteractive);
            BarChartInteractiveCount = 0;
        }
    }

    render() {
        var { data, renderX = x => x } = this.props;
        var maxValue = data.map(item => item.y).reduce((x, y) => Math.max(x, y), 0);
        var colsClass = "cols cols__" + data.length;
        return (
            <div className={colsClass}>
                {data.map((item, i) => (
                    <Motion key={i} defaultStyle={{h: 0}} style={{h: spring((item.y / maxValue) * 100)}}>
                        {({h}) => (<div className="cols_col" style={{height: h + '%'}}>
                            <a>{renderX(item.x)}</a>
                        </div>)}
                    </Motion>
                ))}
            </div>
        );
    }
}

class Statistics extends React.Component {
    render(){
        const { form, statistics, statisticsUpdating, dispatch, error } = this.props;
        const { organizationId } = this.props.params;

        const onChange = data => dispatch({ type: Change, data: data });
        const onStatisticsRequestUpdate = () => dispatch({ type: StatisticsRequestUpdate });

        const monthNames = [ "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря" ]
        const weekDaysNames = [ "воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота" ]

        //const todayItem = table[table.length-1]
        //const yesterdayItem = table[table.length-2]

        const days = error ? 0 : (parseInt(new Date(new Date(form.to).toISOString().split("T")[0]).getTime()) -
        parseInt(new Date(new Date(form.from).toISOString().split("T")[0]).getTime())) / (24*60*60*1000)

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
                        <div className="statistics_summary_title">
                            По всей организации
                            {
                                formatMoney(
                                    statistics.map((c) => (
                                        c.reduce( (p,c) => ({ total: p.total + c.total }),{ total: 0 } )
                                    )).reduce( (p,c) => ( p+c.total ), 0 ),
                                    "div",
                                    true
                                )
                            }
                        </div>
                        {
                            statistics.length ?
                                days >= 1 ?
                                    <div className="statistics_list">
                                        {statistics.map((item, i) => (
                                            <div key={i} className="statistics_item">
                                                <Link to={`/${organizationId}/Statistics/SalesPoint/${item[0].groupId}`} className="link">{item[0].groupName}</Link>
                                                <div>
                                                    <BarChart
                                                        data={item.map(x => ({ x: new Date(x.date), y: x.total }))}
                                                        renderX={x => <span>{x.getDate() + " " + monthNames[x.getMonth()]}<span>, {weekDaysNames[x.getDay()]}</span></span>} />

                                                    { formatMoney(
                                                        item.reduce((p,c) => ({ total: p.total + c.total }),{ total: 0 } ).total
                                                        , "div", true) }
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    :
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
                                        {statistics.map((c) => ( c.reduce((p,c) => ({
                                            total: p.total + c.total,
                                            count: p.count + c.count,
                                            groupId: c.groupId,
                                            groupName: c.groupName
                                        }),{
                                            total: 0,
                                            count: 0,
                                            groupId: "",
                                            groupName: ""
                                        }))).map((item, i) => (
                                            <tr key={i}>
                                                <td>
                                                    <div><Link to={`/${organizationId}/Statistics/SalesPoint/${item.groupId}`} className="link">{item.groupName}</Link></div>
                                                </td>
                                                {formatMoney(item.total)}
                                                <td>{item.count.toLocaleString()}</td>
                                                {formatMoney(item.total/item.count)}
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                :
                                <div>что-то пошло не так</div>
                        }
                    </Loader>
                }
            </div>
        );
    }
}

export default Statistics;

