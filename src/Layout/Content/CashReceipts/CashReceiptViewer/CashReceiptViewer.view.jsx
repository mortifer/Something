import React from "react";
import { Link } from "react-router";

import "./cashreceipt.less";

function formatMoney(money) {
    var tmp = money.toFixed(2).split(".");
    return (<span>{parseInt(tmp[0]).toLocaleString()}<span>,{tmp[1]}</span></span>);
}

export default function CashReceiptsViewer ({ cashReceipt, loading, dispatch }) {
    if (loading) {
        return <div></div>
    }

    return (
        <div className="cashReceipt">
            <Link to="/CashReceipts" className="cashReceipt_close"></Link>

            <div className="cashReceipt_header">
                <div className="cashReceipt_title">{cashReceipt.title}</div>
                <div>ИНН: {cashReceipt.inn}</div>
                <div>Кассир: {cashReceipt.cashier}</div>
                <div>Смена: {cashReceipt.shiftNumber}</div>
                <div>Чек № {cashReceipt.number}</div>
            </div>
            <div className="cashReceipt_list">
                {cashReceipt.products.map((item, i) => (
                    <div key={i} className="cashReceipt_item">
                        <div>{item.name}</div>
                        <div>
                            <span>{item.count} * {formatMoney(item.price)}</span>
                            <span></span>
                            {formatMoney(item.total)}
                        </div>
                    </div>
                ))}
            </div>

            <div className="cashReceipt_total">
                <div>
                    <span>ИТОГ</span>
                    <span></span>
                    {formatMoney(cashReceipt.total)}
                </div>
            </div>

            <div className="cashReceipt_time">
                <span>{ new Date(cashReceipt.timestamp).toLocaleDateString() }</span>
                &nbsp;
                <span>{ new Date(cashReceipt.timestamp).toLocaleTimeString() }</span>
            </div>

            <div className="cashReceipt_footer">
                <div>
                    <span>ККТ №</span>
                    <span>{cashReceipt.cashboxRegNumber}</span>
                </div>
                <div>
                    <span>ФН №</span>
                    <span>{cashReceipt.fnSerialNumber}</span>
                </div>
                <div>
                    <span>ФПД</span>
                    <span>{cashReceipt.fiscalSignature}</span>
                </div>
            </div>

            <div className="cashReceipt_thanks">Спасибо за покупку, Дашкевич!</div>

        </div>
    )
}
