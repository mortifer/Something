import React from "react";
import { connect } from "react-redux";

import Input from "ui/Input";
import DatePicker from "ui/DatePicker";
import Dropdown, { MenuItem, Separator } from "ui/Dropdown";
import Checkbox from "ui/Checkbox";
import Select from "ui/Select";

import Upgrades from "retail-ui/lib/Upgrades"; 
Upgrades.enableHeight34();

import { Change, CashReceiptsRequestUpdate } from "./CashReceipts.reducer"

function CashReceipts({ form, cashreceipts, cashReceiptsUpdating, dispatch }) {
    const onChange = data => dispatch({ type: Change, data: data });
    const onCashReceiptsRequestUpdate = () => dispatch({ type: CashReceiptsRequestUpdate });

    return (
        <div>
            <h2>Чеки</h2>
            <span>Все чеки</span>
            <span>По номеру</span>
            <div>
                <DatePicker 
                    disabled={cashReceiptsUpdating}
                    defaultValue={new Date()} 
                    value={form.from} 
                    onChange={(e, value) => onChange({ from: value })} />
                &mdash;
                <DatePicker 
                    disabled={cashReceiptsUpdating}
                    defaultValue={new Date()} 
                    value={form.to} 
                    onChange={(e, value) => onChange({ to: value })} />
                <Select 
                    disabled={form.salesPointsUpdating || cashReceiptsUpdating}
                    items={form.salesPoints}
                    value={form.salesPoint}
                    onChange={(e, value) => { onChange({ salesPoint: value }); onCashReceiptsRequestUpdate(); }}
                />
                <Dropdown caption="Все кассиры">
                    <MenuItem onClick={() => alert("Clack")}>Clack</MenuItem>
                </Dropdown>
                <span>Сумма от </span>
                <Input 
                    disabled={cashReceiptsUpdating}
                    width={100} 
                    placeholder="0,00"
                    value={form.totalFrom || ""}
                    onBlur={onCashReceiptsRequestUpdate}
                    onChange={(e, value) => onChange({ totalFrom: value })} />
                до
                <Input 
                    disabled={cashReceiptsUpdating}
                    width={100} 
                    placeholder="0,00"
                    value={form.totalTo || ""}
                    onBlur={onCashReceiptsRequestUpdate}
                    onChange={(e, value) => onChange({ totalTo: value })} />
            </div>
            {cashReceiptsUpdating 
                ? <div>Loading...</div>
                : null}
            {cashreceipts.map((x, i) => <div key={i}>{JSON.stringify(x)}</div>)}
        </div>
    );
}

export default CashReceipts;
