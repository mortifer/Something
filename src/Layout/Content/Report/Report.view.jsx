import React from "react";

import Notifications from "./Notifications/Notifications.view";
import Tasks from "./Tasks/Tasks.view";
import Graphs from "./Graphs/Graphs.view";

import { connect } from "react-redux";
import "./report.less";

function Report({ error, empty, model }) {
    if (empty) {
        if (error) {
            return <div>Error: {error}</div>
        }
        else {
            return <div></div>
        }            
    }

    return (
        <div className="report">
            <div className="report_left">
                <Graphs model={model} />
            </div>
            <div className="report_right">
                <Notifications notifications={model.notifications} />
                <Tasks tasks={model.tasks} />
            </div>
        </div>
    );
}

export default connect(
    state => ({ 
        empty: state.getIn(["report", "empty"]), 
        error: state.getIn(["report", "error"]), 
        model: state.getIn(["report", "empty"]) ? undefined : state.getIn(["report", "data"]).toJS()
    })
)(Report);
