import React from "react";
import { connect } from "react-redux";

import "./cashreceipts.less";

import Input from "ui/Input";
import DatePicker from "ui/DatePicker";
import Dropdown, { MenuItem, Separator } from "ui/Dropdown";
import Checkbox from "ui/Checkbox";
import Select from "ui/Select";

import Upgrades from "retail-ui/lib/Upgrades"; 
Upgrades.enableHeight34();

import { Change, CashReceiptsRequestUpdate } from "./CashReceipts.reducer"

function formatMoney(money) {
    var tmp = money.toFixed(2).split(".");
    return (<td>{parseInt(tmp[0]).toLocaleString()}<span>,{tmp[1]}</span></td>);
}


function CashReceipts({ form, cashReceipts, cashReceiptsUpdating, dispatch }) {
    const onChange = data => dispatch({ type: Change, data: data });
    const onCashReceiptsRequestUpdate = () => dispatch({ type: CashReceiptsRequestUpdate });

    return (
        <div className="cashreceipts">
            <h2 className="cashreceipts_title">Чеки</h2>
            <div className="cashreceipts_searchType">
                <span>Все чеки</span>
                <a href="#" className="link">Поиск по номеру</a>
            </div>
            <div className="cashreceipts_filters">
                <div className="cashreceipts_filters_dates">
                    <DatePicker
                        disabled={cashReceiptsUpdating}
                        defaultValue={new Date()}
                        value={form.from}
                        onChange={(e, value) => { onChange({ from: value });  onCashReceiptsRequestUpdate(); }} />
                    <span className="cashreceipts_filters_delimiter">&mdash;</span>
                    <DatePicker
                        disabled={cashReceiptsUpdating}
                        defaultValue={new Date()}
                        value={form.to}
                        onChange={(e, value) => { onChange({ to: value });  onCashReceiptsRequestUpdate(); }} />
                </div>
                <div className="cashreceipts_filters_salesPoints">
                    <Select
                        disabled={form.salesPointsUpdating || cashReceiptsUpdating}
                        items={form.salesPoints}
                        value={form.salesPoint}
                        onChange={(e, value) => { onChange({ salesPoint: value }); onCashReceiptsRequestUpdate(); }}
                    />
                </div>
                <div className="cashreceipts_filters_cashiers">
                    <Select disabled={true} />
                </div>
                <div className="cashreceipts_filters_sums">
                    <span className="cashreceipts_filters_sumsFrom">Сумма от</span>
                    <Input
                        disabled={cashReceiptsUpdating}
                        width={100}
                        placeholder="0,00"
                        value={form.totalFrom || ""}
                        onBlur={onCashReceiptsRequestUpdate}
                        onChange={(e, value) => onChange({ totalFrom: value })} />
                    <span className="cashreceipts_filters_sumsTo">до</span>
                    <Input
                        disabled={cashReceiptsUpdating}
                        width={100}
                        placeholder="0,00"
                        value={form.totalTo || ""}
                        onBlur={onCashReceiptsRequestUpdate}
                        onChange={(e, value) => onChange({ totalTo: value })} />
                    <span className="rur">₽</span>
                </div>
            </div>
            <div className="cashreceipts_filters_returns">
                <Checkbox>Только чеки на возврат</Checkbox>
            </div>

            {cashReceiptsUpdating ? <div>Loading...</div> : null}
            {
                cashReceipts.length ?
                    (
                        <table>
                            <thead>
                                <tr>
                                    <td>Время</td>
                                    <td>Сумма, <span className="rur">₽</span></td>
                                    <td>№ чека</td>
                                </tr>
                            </thead>
                            <tbody>
                                {cashReceipts.map((item, i) => (
                                    <tr key={i}>
                                        <td>{new Date(item.timestamp).toLocaleString("ru-RU")}</td>
                                        {formatMoney(item.total)}
                                        <td><a href={item.href} className="link">{item.fiscalDocumentNumber}</a></td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="2">x из y</td>
                                    <td><a href="#" className="link">Ещё 20 чеков</a></td>
                                </tr>
                            </tfoot>
                        </table>
                    ): (<div>ничего не найденно</div>)
            }
        </div>
    );
}

export default CashReceipts;