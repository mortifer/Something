import axios from "axios";
import React from "react";

import { Link, IndexLink } from "react-router";

import CashboxApplication from "./CashboxApplication";
import CashboxOwner from "./CashboxOwner";
import CashboxDevice from "./CashboxDevice";
import FiscalStorage from "./FiscalStorage";

import Button from "ui/Button";

import ScrollTo from "GSAPScrollToPlugin";

const hashNavigation = () => {
    const hashLinks = document.getElementsByClassName("registration_nav_item");
    Array.forEach( hashLinks, function(obj){ return obj.classList.remove("-active");});
    const hash = window.location.hash;
    let indexElement;
    if (hash.indexOf("#") != -1 ) {
        indexElement = Array.filter( hashLinks, function (obj){ return obj.href.indexOf(hash) != -1})[0];
        if ( document.querySelector(hash) )
            TweenLite.to(window, 0.5, { scrollTo: {y:(document.querySelector(hash).getBoundingClientRect().top + document.body.scrollTop - 70)}, ease: Back.easeInOut.config(1) });
    } else {
        indexElement = hashLinks[0];
        if ( document.body.scrollTop != 0 )
            TweenLite.to(window, 0.5, { scrollTo: {y: 0}, ease: Back.easeIn.config(1) });
    }
    indexElement.classList.add("-active");
};

const registrationScrollHandler = () => {
    let $stickContainer = document.getElementsByClassName("registration")[0];
    if ( $stickContainer.getBoundingClientRect().top < document.getElementsByClassName("header")[0].getBoundingClientRect().height ) {
        $stickContainer.classList.add("-sticked");
    } else {
        $stickContainer.classList.remove("-sticked");
    }
};

const lightpageScrollHandler = () => {
    let $stickContainer = document.getElementsByClassName("lightpage")[0];
    if ( $stickContainer.getBoundingClientRect().top < document.getElementsByClassName("header")[0].getBoundingClientRect().height ) {
        $stickContainer.classList.add("-sticked");
    } else {
        $stickContainer.classList.remove("-sticked");
    }
};

const lightpageCollapse = () => {
    //TweenLite.to(document.getElementsByClassName("lightpage")[0], 0.5, { width: 0, height:0 });
};

const scrollHandle = (enable) => {
    if (enable) {
        document.addEventListener("scroll", registrationScrollHandler);
        document.addEventListener("scroll", lightpageScrollHandler);
    } else {
        document.removeEventListener("scroll", registrationScrollHandler);
        document.removeEventListener("scroll", lightpageScrollHandler);
    }
};

class Registration extends React.Component {

    componentDidMount() {
        hashNavigation();
        scrollHandle(true);
    }

    componentDidUpdate(){
        hashNavigation();
    }

    componentWillUnmount() {
        lightpageCollapse();
        scrollHandle(false);
    }

    render() {
        const model = AppModel.Content.Cashbox.Registration;

        function _handleSubmit() {
            console.log(model);
            axios.post(
                "http://mp04lr1z.dev.kontur:3001/setModel",
                model
            ).then(function (response) {
                console.log("ok");
            }).catch(function (response) {
                console.log("huj");
            });
        }

        return (
            <div className="lightpage">
                <div className="lightpage_back"><h2><Link to="/cashbox">Кассы</Link></h2></div>
                <Link to="/cashbox" className="lightpage_close"></Link>

                <div className="lightpage_content">
                    <h2>Регистрационный учет кассы</h2>
                    <div className="registration">
                        <div className="registration_nav">
                            <IndexLink to="/cashbox/registration" className="registration_nav_item">Заявление в ИФНС</IndexLink>
                            <Link to="/cashbox/registration#cashbox-owner" className="registration_nav_item">Владелец кассы</Link>
                            <Link to="/cashbox/registration#cashbox-device" className="registration_nav_item">Кассовый аппарат </Link>
                            <Link to="/cashbox/registration#fiscal-storage" className="registration_nav_item">Фискальный накопитель</Link>
                        </div>
                        <div className="registration_content">
                            <CashboxApplication model={model.CashboxApplication} />
                            <CashboxOwner model={model.CashboxOwner} />
                            <CashboxDevice model={model.CashboxDevice} />
                            <FiscalStorage model={model.FiscalStorage} />
                            <Button use="success" size="large" onClick={_handleSubmit}>Отправить заявление</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration;

