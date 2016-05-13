import React from "react";

import Header from "./Header";
import Navigation from "./Navigation";
import Content from "./Content";

class Layout extends React.Component {
    render(){

        const { children } = this.props;
        const organizationId = this.props.params.organizationId || "";

        if (organizationId === "")
            return (
                <div className="c-wrapper">
                    <div className="middle">
                        <div className="content">
                            выйди и снова зайди
                        </div>
                    </div>
                </div>
            )
        else
            return (
                <div>
                    <Header />
                    <div className="c-wrapper">
                        <div className="middle">
                            <Navigation {...this.props} />
                            <Content>
                                { children }
                            </Content>
                        </div>
                    </div>
                </div>
            )
    }
}

export default Layout;
