import React from "react";

export default function CashReceiptsViewer({ cashReceipt, loading, dispatch }) {
    if (loading) {
        return <div>Loading ...</div>
    }
    return <div>{JSON.stringify(cashReceipt)}</div>;
}
