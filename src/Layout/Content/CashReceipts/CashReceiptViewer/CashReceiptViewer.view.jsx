import React from "react";

export default function CashReceiptsViewer({ cachReceipt, loading, dispatch }) {
    if (loading) {
        return <div>Loading ...</div>
    }
    return <div>{cachReceipt.someValueCashReceipt}</div>;
}
