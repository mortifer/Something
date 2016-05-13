import React from "react";
import {Link, IndexLink} from "react-router";

const navigationScrollHandler = () => {
    let $stickContainer = document.getElementsByClassName("navigation")[0];
    if ( $stickContainer.getBoundingClientRect().top < document.getElementsByClassName("header")[0].getBoundingClientRect().height ) {
        $stickContainer.classList.add("-sticked");
    } else {
        $stickContainer.classList.remove("-sticked");
    }
};

const scrollHandle = (enable) => {
    if (enable)
        document.addEventListener("scroll", navigationScrollHandler);
    else
        document.removeEventListener("scroll", navigationScrollHandler);
};

class Navigation extends React.Component {

    componentDidMount() {
        //scrollHandle(true);
    }

    componentWillUnmount() {
        //scrollHandle(false);
    }

    render(){
        const { organizationId } = this.props.params;

        return (
            <div className="navigation">
                <div className="navigation_list">
                    <IndexLink to={ "/" + organizationId }  className="navigation_item navigation_item__report" activeClassName="-active">Главная</IndexLink>
                    <Link to={ "/" + organizationId + "/Statistics" } className="navigation_item navigation_item__stat" activeClassName="-active">Статистика</Link>
                    <Link to={ "/" + organizationId + "/CashReceipts" } className="navigation_item navigation_item__cashReceipts" activeClassName="-active">Чеки</Link>
                </div>
            </div>
        );
    }
}

export default Navigation;
