import React from "react";

import { Link } from "react-router";

import './tasks.less'

export default function ({ tasks }) {
    return (
        <div className="tasks">
            <h2 className="tasks_title">Задачи</h2>
            {tasks.map(task => (
                <div className="tasks_item">
                    <Link to="/?" className="link">{task.text}</Link>
                    <span>до {(new Date(task.tillDate)).toLocaleDateString()}</span>
                </div>))}
        </div>
    );
}
