import React from "react";
//import popperJS from "popper.js";

import "./graphs.less";

import {Motion, spring} from 'react-motion';

function formatMoney(money) {
    var tmp = money.toFixed(2).split(".");
    return (<td>{parseInt(tmp[0]).toLocaleString()}<span>,{tmp[1]}</span></td>);
}

class BarChart extends React.Component {
    render() {
        var { data, renderX = x => x } = this.props;
        var maxValue = data.map(item => item.y).reduce((x, y) => Math.max(x, y), 0);
        return (
            <div className="cols cols__week">
                {data.map((item, i) => (
                    <Motion key={i} defaultStyle={{h: 0}} style={{h: spring((item.y / maxValue) * 100)}}>
                        {({h}) => (<div className="cols_col" style={{height: h + '%'}}>
                            {renderX(item.x)}
                        </div>)}
                    </Motion>
                ))}
            </div>
        );        
    }
}

export default function({ model: { table, graph } }) {
    const monthNames = [ "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря" ]
    const weekDaysNames = [ "воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота" ]

    const todayItem = table[table.length-1]
    const yesterdayItem = table[table.length-2]

    var tableFromStat = [
        {
            dateDescription: {
                title: 'Сегодня',
                rangeDescription: new Date(todayItem.date).getDate() + " " + monthNames[new Date(todayItem.date).getMonth()] + ", " +  weekDaysNames[new Date(todayItem.date).getDay()]
            },
            cashReceiptsTotal: todayItem.total,
            cashReceiptsCount: todayItem.count,
        }, {
            dateDescription: {
                title: 'Вчера',
                rangeDescription: new Date(yesterdayItem.date).getDate() + " " + monthNames[new Date(yesterdayItem.date).getMonth()] + ", " +  weekDaysNames[new Date(yesterdayItem.date).getDay()]
            },
            cashReceiptsTotal: yesterdayItem.total,
            cashReceiptsCount: yesterdayItem.count,
        }, {
            dateDescription: {
                title: '7 дней',
                rangeDescription:
                (
                    new Date(todayItem.date).getMonth() == new Date(table[0].date).getMonth() ?
                        (new Date(table[0].date).getDate() + "-" + new Date(todayItem.date).getDate() + " " + monthNames[new Date(todayItem.date).getMonth()]) :
                        (new Date(table[0].date).getDate() + " " + monthNames[new Date(table[0].date).getMonth()] + " - " + new Date(todayItem.date).getDate() + " " + monthNames[new Date(todayItem.date).getMonth()])
                )
            },
            cashReceiptsTotal: table.reduce(function(a, b) { return a + parseFloat(b.total) }, 0),
            cashReceiptsCount: table.reduce(function(a, b) { return a + parseInt(b.count) }, 0)
        }
    ];

    var graphFromStat = table.map((item, i) => (
        {
             cashReceiptsTotalValue: item.total,
             cashReceiptsCount: item.count,
             cashReceiptsMiddleValue: item.total/item.count,
             date: new Date(item.date)
         }
    ));

    return (
        <div className="graphs">
            <h2 className="graphs_title">По всей организации</h2>
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
                    {tableFromStat.map((item, i) => (
                        <tr key={i}>
                            <td>
                                <div>{item.dateDescription.title}</div>
                                {item.dateDescription.rangeDescription}
                            </td>
                            {formatMoney(item.cashReceiptsTotal)}
                            <td>{item.cashReceiptsCount.toLocaleString()}</td>
                            {formatMoney(item.cashReceiptsTotal/item.cashReceiptsCount)}
                        </tr>
                    ))}
                </tbody>
            </table>
                
            <BarChart 
                data={graphFromStat.map(x => ({ x: new Date(x.date), y: x.cashReceiptsTotalValue }))}
                renderX={x => <span>{x.getDate() + " " + monthNames[x.getMonth()]}<span>, {weekDaysNames[x.getDay()]}</span></span>} />
        </div>
    );
}
