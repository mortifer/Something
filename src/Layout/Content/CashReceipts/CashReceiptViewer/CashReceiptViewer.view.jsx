import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";

import "./cashreceipt.less";

function formatMoney(money) {
    var tmp = money.toFixed(2).split(".");
    return (<span>{parseInt(tmp[0]).toLocaleString()}<span>,{tmp[1]}</span></span>);
}

class CashReceiptsViewer extends React.Component {

    componentDidMount(){
    }

    componentDidUpdate() {
        // const { cashReceipt } = this.props;
        //
        if ( ReactDOM.findDOMNode(this).getElementsByClassName("cashReceipt_content").length ) {
             ReactDOM.findDOMNode(this).parentNode.style.minHeight = (ReactDOM.findDOMNode(this).getElementsByClassName("cashReceipt_content")[0].getBoundingClientRect().height - 80) + "px"
        }
        //
        // const anchorLink = $("[href*='"+cashReceipt.fnSerialNumber+"/"+cashReceipt.documentId+"']");
        // const anchorContainer = $(anchorLink).parents("table").parent()[0];
        //
        // if (anchorLink.length)
        //     if (!$(anchorContainer).find(".cashreceipts_list_anchor").length) {
        //         $(anchorContainer).append("<div class=\"cashreceipts_list_anchor\" />")[0];
        //         $(anchorContainer).find(".cashreceipts_list_anchor").css({top: anchorLink.parents("tr").position().top + anchorLink.parents("tr").outerHeight(true)  })
        //     }

        //ReactDOM.findDOMNode(this).parentNode.getElementsByClassName("[href*='"+cashReceipt.fnSerialNumber+"/"+cashReceipt.documentId+"']").style.outline = "solid 1px #cc0000";
    }

    componentWillUnmount(){
        ReactDOM.findDOMNode(this).parentNode.style.minHeight = "auto";
        //$(".cashreceipts_list_anchor").remove();
    }

    render() {
        const { cashReceipt, loading, backUrl, dispatch } = this.props;
        const { organizationId } = this.props.params;
        const localBackUrl = "/" + organizationId + "/CashReceipts/" + backUrl;

        if (loading) {
            return <div></div>
        }

        return (
            <div className="cashReceipt">
                <Link to={localBackUrl} className="cashReceipt_close"></Link>
                <div className="cashReceipt_content">

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
            </div>
        )

    }
}
export default CashReceiptsViewer

// export default function CashReceiptsViewer ({ cashReceipt, loading, backUrl, dispatch }) {
//
//     backUrl = "/CashReceipts/" + backUrl;
//
//     if (loading) {
//         return <div></div>
//     }
//
//     return (
//         <div className="cashReceipt">
//             <Link to={backUrl} className="cashReceipt_close"></Link>
//             <div className="cashReceipt_content">
//
//                 <div className="cashReceipt_header">
//                     <div className="cashReceipt_title">{cashReceipt.title}</div>
//                     <div>ИНН: {cashReceipt.inn}</div>
//                     <div>Кассир: {cashReceipt.cashier}</div>
//                     <div>Смена: {cashReceipt.shiftNumber}</div>
//                     <div>Чек № {cashReceipt.number}</div>
//                 </div>
//                 <div className="cashReceipt_list">
//                     {cashReceipt.products.map((item, i) => (
//                         <div key={i} className="cashReceipt_item">
//                             <div>{item.name}</div>
//                             <div>
//                                 <span>{item.count} * {formatMoney(item.price)}</span>
//                                 <span></span>
//                                 {formatMoney(item.total)}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//
//                 <div className="cashReceipt_total">
//                     <div>
//                         <span>ИТОГ</span>
//                         <span></span>
//                         {formatMoney(cashReceipt.total)}
//                     </div>
//                 </div>
//
//                 <div className="cashReceipt_time">
//                     <span>{ new Date(cashReceipt.timestamp).toLocaleDateString() }</span>
//                     &nbsp;
//                     <span>{ new Date(cashReceipt.timestamp).toLocaleTimeString() }</span>
//                 </div>
//
//                 <div className="cashReceipt_footer">
//                     <div>
//                         <span>ККТ №</span>
//                         <span>{cashReceipt.cashboxRegNumber}</span>
//                     </div>
//                     <div>
//                         <span>ФН №</span>
//                         <span>{cashReceipt.fnSerialNumber}</span>
//                     </div>
//                     <div>
//                         <span>ФПД</span>
//                         <span>{cashReceipt.fiscalSignature}</span>
//                     </div>
//                 </div>
//
//                 <div className="cashReceipt_thanks">Спасибо за покупку, Дашкевич!</div>
//
//             </div>
//         </div>
//     )
// }
