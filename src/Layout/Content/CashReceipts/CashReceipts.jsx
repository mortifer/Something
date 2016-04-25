import React from "react";

import Input from "ui/Input";
import DatePicker from "ui/DatePicker";
import Dropdown from "ui/Dropdown";
const {MenuItem, Separator} = Dropdown;
import Checkbox from "ui/Checkbox";

import Upgrades from 'retail-ui/lib/Upgrades'; 
Upgrades.enableHeight34();

class CashReceipts extends React.Component {
    render() {
        const {} = this.props;
        const model = AppModel.Content.CashReceipts; 

        return (
            <div className="report">
                <h2>{model.Title}</h2>
                <span>Все чеки</span>
                <span>По номеру</span>
                <div>
                    <DatePicker defaultValue={new Date()} onChange={(el, value) => {}} />
                    &mdash;
                    <DatePicker defaultValue={new Date()} onChange={(el, value) => {}} />
                    <Dropdown caption="Магазин на 8 Марта">
                        <MenuItem onClick={() => alert('Clack')}>Clack</MenuItem>
                    </Dropdown>
                    <Dropdown caption="Все кассиры">
                        <MenuItem onClick={() => alert('Clack')}>Clack</MenuItem>
                    </Dropdown>
                    Сумма от
                    <Input defaultValue="" placeholder="input1" onChange={(el, value) => {}} />
                    до
                    <Input defaultValue="" placeholder="input1" onChange={(el, value) => {}} />
                </div>

            </div>
        );
    }
}

export default CashReceipts;
