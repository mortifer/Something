import React from "react";
import {Link, IndexLink} from "react-router";

class Layout extends React.Component {
    render(){
        const { children } = this.props;

        return (
            <div>
                <IndexLink to="/" activeClassName="-active">
                    Сводка
                </IndexLink>
                <Link to="/stat" activeClassName="-active">
                    Статистика
                </Link>
                <Link to="/cashbox" activeClassName="-active">
                    Кассы
                </Link>
                {children}
            </div>
        );
    }
}

export default Layout;