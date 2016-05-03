import React from "react";
import {Link} from "react-router";

class Cashbox extends React.Component {
    render() {
        return (
            <div>
                <h2>Кассы</h2>
                <Link to="/cashbox/registration">Зарегистрировать новую кассу</Link>
            </div>
        );
    }
}

export default Cashbox;
