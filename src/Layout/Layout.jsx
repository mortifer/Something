import React from "react";
import {Link, IndexLink} from "react-router";
import css from "./layout.less";

class Layout extends React.Component {
    render(){
        const { children } = this.props;

        return (
            <div className={css.block}>
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
