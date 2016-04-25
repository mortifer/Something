import React from "react";
import {Link} from "react-router";

class Cashbox extends React.Component {
    render() {
        const model = AppModel.Content.Cashbox;        
        return (
            <div>
                <h2>{model.Title}</h2>
                <Link to="/cashbox/registration">Зарегистрировать новую кассу</Link>
            </div>
        );
    }
}

export default Cashbox;
