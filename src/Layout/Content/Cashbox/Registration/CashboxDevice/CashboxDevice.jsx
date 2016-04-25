import React from "react";

import Input from "ui/Input";
import DatePicker from "ui/DatePicker";
import Checkbox from "ui/Checkbox";
//import Kladr from "ui/Kladr";

class CashboxDevice extends React.Component {
    
    render() {
        const model = AppModel.Content.Cashbox.Registration.CashboxDevice;

        function _handleChange(el,value,path) {
            var current = model;
            var path = path.split('.');
            path.forEach(function(p,index, arr){
                if (index > 0 && index < arr.length - 1) current = current[p];
            });
            current[path[path.length - 1]] = (typeof value == "object" ? value.toJSON():value);
        }

        return (
            <div id="cashbox-device" className="registration_block">
                
                <h3 className="registration_block_title">{model.Title}</h3>

                <div className="registration_block_row">
                    <label for="">Заводской №</label>
                    <Input defaultValue={model.Form.Input1} placeholder="input1" onChange={(el, value) => _handleChange(el,value,"model.Form.Input1")} />
                </div>
                <div className="registration_block_row">
                    <label for="">Дата изготовления</label>
                    <DatePicker defaultValue={new Date()} onChange={(el, value) => _handleChange(el,value,"model.Form.Date1")} />
                </div>
                <div className="registration_block_row">
                    <label for="">Код модели</label>
                    <Input placeholder="input2" />
                </div>
                <div className="registration_block_row">
                    <label for="">Наименование модели</label>
                    <Input placeholder="input3" />
                </div>
                <div className="registration_block_row">
                    <label for="">Код изготовителя</label>
                    <Input placeholder="input4" />
                </div>

                <p>Если касса будет использоваться в особых условиях, отметьте их:</p>

                <div className="registration_checkboxList">
                    <div className="registration_checkboxList_item"><Checkbox>Для развозной торговли</Checkbox></div>
                    <div className="registration_checkboxList_item"><Checkbox>Для разносной торговли</Checkbox></div>
                    <div className="registration_checkboxList_item"><Checkbox>Для расчетов в сети интернет</Checkbox></div>
                    <div className="registration_checkboxList_item"><Checkbox>В местностях, отдаленных от сетей связи</Checkbox></div>
                    <div className="registration_checkboxList_item"><Checkbox>Работает только в автономном режиме</Checkbox></div>
                    <div className="registration_checkboxList_item"><Checkbox>В составе платежного терминала или банкомата</Checkbox></div>
                </div>

                <div className="registration_block_row">
                    <label for="">Адрес установки кассы</label>
                    {/*<Kladr />*/}
                </div>
                
            </div>
        );
    }
}

export default CashboxDevice;
