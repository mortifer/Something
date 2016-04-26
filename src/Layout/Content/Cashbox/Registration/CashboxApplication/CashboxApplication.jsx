import React from "react";
import Input from "ui/Input";

export default function CashboxApplication({ model, onChange }) {
    return (
        <div className="registration_block">
            <h3 className="registration_block_title">{model.Title}</h3>
            
            <p>Укажите код инспекции, в котрой надо зарегистрировать кассу</p>
            <div className="registration_block_row">
                <label for="">Код ИФНС</label>
                <Input
                    value={model.Form.IfnsCode}
                    placeholder="IfnsCode"
                    onChange={(e, v) => onChange({ Form: { IfnsCode: v } })} />
            </div>
        </div>
    );
}
