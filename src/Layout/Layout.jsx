import React from "react";

import Header from "./Header";
import Navigation from "./Navigation";
import Content from "./Content";

class Layout extends React.Component {
    render(){
        const { children } = this.props;
        const { model }  = this.props.route;

        return (
            <form>
                <Header />
                <div className="c-wrapper">
                    <div className="middle">
                        <Navigation />
                        <Content model={model}>
                            { children }
                        </Content>
                    </div>
                </div>
            </form>
        );
    }
}

export default Layout;
