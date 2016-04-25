import React from "react";

import Notifications from "./Notifications";
import Tasks from "./Tasks";
import Graphs from "./Graphs";

class Report extends React.Component {
    render() {
        const {} = this.props;
        const model = AppModel.Content.Report;

        return (
            <div className="report">
                <div className="report_left">
                    <Graphs />
                </div>
                <div className="report_right">
                    <Notifications />
                    <Tasks />
                </div>
            </div>

        );
    }
}

export default Report;
