import React from "react";
import { connect } from "react-redux";

import "./cashreceipts.less";

import Input from "ui/Input";
import DatePicker from "ui/DatePicker";
import Checkbox from "ui/Checkbox";
import Select from "ui/Select";
import Loader from "ui/Loader";

import Upgrades from "retail-ui/lib/Upgrades"; 
Upgrades.enableHeight34();

import { Change, CashReceiptsRequestUpdate } from "./CashReceipts.reducer"

function formatMoney(money, isReturn) {
    var tmp = money.toFixed(2).split(".");
    return (<td>{ isReturn ? <span className="isReturn" />:null }{parseInt(tmp[0]).toLocaleString()}<span>,{tmp[1]}</span></td>);
}

function CashReceipts({ form, cashReceipts, cashReceiptsUpdating, dispatch, error }) {
    const onChange = data => dispatch({ type: Change, data: data });
    const onCashReceiptsRequestUpdate = () => dispatch({ type: CashReceiptsRequestUpdate });

    return (
        <div className="cashreceipts">
            <h2 className="cashreceipts_title">Чеки</h2>
            <div className="cashreceipts_searchType">
                <span className="-active">Все чеки</span>
                <span><a href="#" className="link">Поиск по номеру</a></span>
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

            { error ?
                <div className="validation validation__error">{error} - тут реально ошибка, т.к. диапазон дат неверный. </div> :
                <Loader type="big" active={cashReceiptsUpdating} >
                    {
                        cashReceipts.items && cashReceipts.items.length ?
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
                                    {cashReceipts.items.map((item, i) => (
                                        <tr key={i}>
                                            <td>{new Date(item.timestamp).toLocaleString("ru-RU")}</td>
                                            {formatMoney(item.total, item.calculationType == "ReturnSell")}
                                            <td>
                                                <a href={`cashReceipt?documentId=${item.documentId}`} className="link">{item.number}</a>
                                                {item.calculationType == "ReturnBuy" || item.calculationType == "ReturnSell"  ? <span>Возврат</span> : null}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <td colSpan="2">20 из {cashReceipts.count}</td>
                                        <td><a href="#" className="link">Ещё 20 чеков</a></td>
                                    </tr>
                                    </tfoot>
                                </table>
                            ) : (
                                <div>ничего не найденно</div>
                            )
                    }
                </Loader>
            }
        </div>
    );
}

export default CashReceipts;
