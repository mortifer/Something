import React from "react";
import axios from "axios";
import {Motion, spring} from 'react-motion';

function formatMoney(money) {
    return money;
}

class BarChart extends React.Component {
    render() {
        var { data, renderX = x => x } = this.props;

        var maxValue = data.map(item => item.y).reduce((x, y) => Math.max(x, y), 0);
        return (
            <div className="cols cols__week" id="MainGraph">
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
    return (
        <div className="graphs">
            <h2 className="graphs_title">По всей организации</h2>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td>Выручка, <span class="rur">₽</span></td>
                        <td>Чеки</td>
                        <td>Средний чек, <span class="rur">₽</span></td>
                    </tr>
                </thead>
                <tbody>
                    {table.map((item, i) => (
                        <tr key={i}>
                            <td>
                                <div>{item.dateDescription.title}</div>
                                {item.dateDescription.rangeDescription}
                            </td>
                            <td>{formatMoney(item.cashReceiptsTotal)}</td>
                            <td>{item.cashReceiptsCount}</td>
                            <td>{formatMoney(item.cashReceiptsMean)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
                
            <BarChart 
                data={graph.cols.map(x => ({ x: new Date(2016, 5, 10), y: x.cashReceiptsTotalValue }))} 
                renderX={x => <span>{x.toLocaleDateString("ru-RU")}</span>} />
        </div>
    );
}
