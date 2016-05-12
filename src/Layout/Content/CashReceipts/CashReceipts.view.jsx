import React from "react";
import { connect } from "react-redux";

import "./cashreceipts.less";

import { Link } from 'react-router';
import Input from "ui/Input";
import DatePicker from "ui/DatePicker";
import Checkbox from "ui/Checkbox";
import Select from "ui/Select";
import Loader from "ui/Loader";

import Upgrades from "retail-ui/lib/Upgrades"; 
Upgrades.enableHeight34();

import { Change, CashReceiptsRequestUpdate, CashReceiptsRequestNextPage } from "./CashReceipts.reducer"

function formatMoney(money, isReturn) {
    var tmp = money.toFixed(2).split(".");
    return (<td>{ isReturn ? <span className="isReturn" />:null }{parseInt(tmp[0]).toLocaleString()}<span>,{tmp[1]}</span></td>);
}

class CashReceipts extends React.Component {

    render() {
        const {form, cashReceipts, cashReceiptsUpdating, dispatch, error, children} = this.props;
        const onChange = data => dispatch({type: Change, data: data});
        const onCashReceiptsRequestUpdate = () => dispatch({type: CashReceiptsRequestUpdate});
        const onNextPage = () => dispatch({type: CashReceiptsRequestNextPage});

        return (
            <div className="cashreceipts">
                <h2 className="cashreceipts_title">Чеки</h2>
                <div className="cashreceipts_searchType">
                    <span className="-active">Все чеки</span>
                    <span><a href="/CashReceipts/Number" className="link">Поиск по номеру</a></span>
                </div>
                <div className="cashreceipts_filters">
                    <div className="cashreceipts_filters_dates">
                        <DatePicker
                            disabled={cashReceiptsUpdating}
                            defaultValue={new Date()}
                            value={form.from}
                            onChange={(e, value) => { onChange({ from: value });  onCashReceiptsRequestUpdate(); }}/>
                        <span className="cashreceipts_filters_delimiter">&mdash;</span>
                        <DatePicker
                            disabled={cashReceiptsUpdating}
                            defaultValue={new Date()}
                            value={form.to}
                            onChange={(e, value) => { onChange({ to: value });  onCashReceiptsRequestUpdate(); }}/>
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
                        <Select
                            disabled={form.cashiersUpdating || cashReceiptsUpdating}
                            items={form.cashiers}
                            value={form.cashier}
                            onChange={(e, value) => { onChange({ cashier: value }); onCashReceiptsRequestUpdate(); }}
                        />

                    </div>
                    <div className="cashreceipts_filters_sums">
                        <span className="cashreceipts_filters_sumsFrom">Сумма от</span>
                        <Input
                            disabled={cashReceiptsUpdating}
                            width={100}
                            placeholder="0,00"
                            value={form.totalFrom || ""}
                            onBlur={onCashReceiptsRequestUpdate}
                            onChange={(e, value) => onChange({ totalFrom: value })}/>
                        <span className="cashreceipts_filters_sumsTo">до</span>
                        <Input
                            disabled={cashReceiptsUpdating}
                            width={100}
                            placeholder="0,00"
                            value={form.totalTo || ""}
                            onBlur={onCashReceiptsRequestUpdate}
                            onChange={(e, value) => onChange({ totalTo: value })}/>
                        <span className="rur">₽</span>
                    </div>
                </div>
                <div className="cashreceipts_filters_returns"> 
                    <Checkbox checked={form.isOnlyReturn}
                              onChange={(e, value) =>{ onChange({ isOnlyReturn: value }); onCashReceiptsRequestUpdate(); }}>Только чеки на возврат</Checkbox>
                </div>

                {children}

                { error ?
                    <div className="validation validation__error">{error}</div> :
                    <Loader type="big" active={cashReceiptsUpdating}>
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
                                                    <Link to={`/CashReceipts/Common/${item.fnSerialNumber}/${item.documentId}`}
                                                          className="link">{item.number}</Link>
                                                    {item.calculationType == "ReturnBuy" || item.calculationType == "ReturnSell" ?
                                                        <span>Возврат</span> : null}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <td colSpan="2">{cashReceipts.items.length} из {cashReceipts.count}</td>
                                            <td>
                                                {cashReceipts.items.length < cashReceipts.count
                                                    ? <a className="link" onClick={onNextPage}>Ещё 20 чеков</a>
                                                    : null}
                                            </td>
                                        </tr>
                                        </tfoot>
                                    </table>
                                ) : (
                                cashReceiptsUpdating ? null :
                                    <div className="cashreceipts_notFound">
                                        Не нашлось подходящих чеков по данным условиям поиска</div>
                            )
                        }
                    </Loader>
                }
            </div>
        );
    }
}

export default CashReceipts;
