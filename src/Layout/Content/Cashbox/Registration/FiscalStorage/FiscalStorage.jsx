import React from "react";

import Input from "ui/Input";
import DatePicker from "ui/DatePicker";

class FiscalStorage extends React.Component {
    render() {
        const {
            input1, input1_changedAsync,
            date1,  date1_changedAsync,
            input2, input2_changedAsync,
            input3, input3_changedAsync,
            input4, input4_changedAsync,
            date2,  date2_changedAsync,
            date3,  date3_changedAsync,
            input5, input5_changedAsync
        } = this.props;

        const model = AppModel.Content.Cashbox.Registration.FiscalStorage;
        
        return (
            <div id="fiscal-storage" className="registration_block">
                <h3 className="registration_block_title">Фискальный накопитель</h3>

                <div className="registration_block_row">
                    <label for="">Заводской №</label>
                    <Input defaultValue={input1} placeholder="input1" onChange={(el, value) => input1_changedAsync(value)} />
                </div>
                <div className="registration_block_row">
                    <label for="">Код модели</label>
                    <Input defaultValue={input2} placeholder="input2" onChange={(el, value) => input2_changedAsync(value)} />
                </div>
                <div className="registration_block_row">
                    <label for="">Наименование модели</label>
                    <Input defaultValue={input3} placeholder="input3" onChange={(el, value) => input3_changedAsync(value)} />
                </div>
                <div className="registration_block_row">
                    <label for="">Регистрационный №</label>
                    <Input defaultValue={input4} placeholder="input3" onChange={(el, value) => input4_changedAsync(value)} />
                </div>
                <div className="registration_block_row">
                    <label for="">Дата изготовления</label>
                    <DatePicker value={new Date(date1)} onChange={(el, value) => date1_changedAsync(value)} />
                </div>
                <div className="registration_block_row">
                    <label for="">Срок действия ключа</label>
                    <DatePicker value={new Date(date2)} onChange={(el, value) => date2_changedAsync(value)} />
                    &mdash;
                    <DatePicker value={new Date(date3)} onChange={(el, value) => date3_changedAsync(value)} />
                </div>
                <div className="registration_block_row">
                    <label for="">Код изготовителя</label>
                    <Input defaultValue={input5} placeholder="input3" onChange={(el, value) => input5_changedAsync(value)} />
                </div>
            </div>
        );
    }
}

export default FiscalStorage;
