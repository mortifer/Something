import React from "react";

import { Link } from "react-router";

class Tasks extends React.Component {
    render() {
        return (
            <div className="tasks">
                <h2 className="tasks_title">Задачи</h2>
                <div className="tasks_item">
                    <Link to="/?" className="link">Продлить обслуживание у оператора фискальных данных</Link>
                    <span>до 15.03.2016</span>
                </div>
                <div className="tasks_item">
                    <Link to="/?" className="link">Перерегистрировать кассу «Павильон на Сурикова»</Link>
                    <span>до 27.03.2016</span>
                </div>
            </div>
        );
    }
}

export default Tasks;
