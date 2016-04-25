import React from "react";

import { Link } from "react-router";

class Notifications extends React.Component {
    render() {
        const { } = this.props;
        const model = AppModel.Content.Report.Notifications;

        return (
            <div className="notifications">
                <h2 className="notifications_title">{model.Title}</h2>
                <div className="notifications_item">
                   <Link to="/?" className="link">Касса «№ 2 на 8 марта»: получена регистрационная карта</Link>
                </div>
            </div>
        );
    }
}

export default Notifications;
