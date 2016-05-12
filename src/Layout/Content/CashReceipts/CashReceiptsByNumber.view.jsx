import React from "react";

import "./cashreceipts.less";

import { Link } from 'react-router';
import Input from "ui/Input";
import Loader from "ui/Loader";

import Upgrades from "retail-ui/lib/Upgrades"; 
Upgrades.enableHeight34();

import { Change, CashReceiptsRequestUpdate } from "./CashReceipts.reducer"

function formatMoney(money, isReturn) {
    var tmp = money.toFixed(2).split(".");
    return (<td>{ isReturn ? <span className="isReturn" />:null }{parseInt(tmp[0]).toLocaleString()}<span>,{tmp[1]}</span></td>);
}

class CashReceiptsByNumber extends React.Component {

    render() {
        const {form, cashReceipts, cashReceiptsUpdating, dispatch, error, children} = this.props;
        const onChange = data => dispatch({type: Change, data: data});
        const onCashReceiptsRequestUpdate = () => dispatch({type: CashReceiptsRequestUpdate});

        return (
            <div className="cashreceipts">
                <h2 className="cashreceipts_title">Чеки</h2>
                <div className="cashreceipts_searchType">
                    <span><a href="/CashReceipts/Common" className="link">Все чеки</a></span>
                    <span className="-active">Поиск по номеру</span>
                </div>
                <div className="cashreceipts_filters">
                    <div className="cashreceipts_filters_sums">
                        <span className="cashreceipts_filters_number">Номер чека</span>
                        <Input
                            disabled={cashReceiptsUpdating}
                            width={150}
                            placeholder=""
                            value={form.number || ""}
                            onBlur={onCashReceiptsRequestUpdate}
                            onChange={(e, value) => onChange({ number: value })}/>
                    </div>
                </div>

                {children}

                { error ?
                    <div className="validation validation__error">{error}</div> :
                    <Loader type="big" active={cashReceiptsUpdating}>
                        {
                            cashReceipts && cashReceipts.length ?
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
                                                {formatMoney(item.total, item.calculationType == "ReturnSell")}
                                                <td>
                                                    <Link to={`/CashReceipts/Number/${item.fnSerialNumber}/${item.documentId}`}
                                                          className="link">{item.number}</Link>
                                                    {item.calculationType == "ReturnBuy" || item.calculationType == "ReturnSell" ?
                                                        <span>Возврат</span> : null}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                ) : (
                                cashReceiptsUpdating ? null :
                                    <div className="cashreceipts_notFound">
                                        Не нашлось чеков с таким номером</div>
                            )
                        }
                    </Loader>
                }
            </div>
        );
    }
}

export default CashReceiptsByNumber;
