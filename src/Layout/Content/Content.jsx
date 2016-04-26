import React from "react";
import {Link, IndexLink} from "react-router";

class Content extends React.Component {
    render(){
        const { children } = this.props;

        return (
            <div className="content">
                {children}
            </div>
        );
    }
}

export default Content;
