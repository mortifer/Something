import React from "react";

import Notifications from "./Notifications";
import Tasks from "./Tasks";
import Graphs from "./Graphs";

import { connect } from 'react-redux';
import "./report.less";

function Report({ error, empty, model }) {
    if (empty) {
        if (error) {
            return <div>Error: {error}</div>
        }
        else {
            return <div>Loading...</div>   
        }            
    }

    return (
        <div className="report">
            <div className="report_left">
                <Graphs model={model} />
            </div>
            <div className="report_right">
                <Notifications />
                <Tasks />
            </div>
        </div>
    );
}

export default connect(
    state => ({ 
        empty: state.getIn(['report', 'empty']), 
        error: state.getIn(['report', 'error']), 
        model: state.getIn(['report', 'empty']) ? undefined : state.getIn(['report', 'data']).toJS(),
        tasks: state.getIn(['report', 'empty']) ? undefined : state.getIn(['report', 'tasks']).toJS(),
        notifications: state.getIn(['report', 'empty']) ? undefined : state.getIn(['report', 'notifications']).toJS(),
    })
)(Report);
