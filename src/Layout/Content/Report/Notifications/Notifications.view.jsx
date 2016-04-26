import React from "react";

import './notifications.less'

import { Link } from "react-router";

export default function({notifications}){
    return (
        <div className="notifications">
            <h2 className="notifications_title">Уведомления</h2>
            {notifications.map(notification => (
                <div className="notifications_item">
                   <Link to="/?" className="link">{notification.text}</Link>
                </div>
            ))}
        </div>
    );    
}
