import React from "react";

class CashboxOwner extends React.Component {
    render() {
        const model = AppModel.Content.Cashbox.Registration.CashboxOwner;
        return (
            <div id="cashbox-owner" className="registration_block">
                <h3 className="registration_block_title">{model.Title}</h3>
            </div>
        );
    }
}

export default CashboxOwner;
