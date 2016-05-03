import React from "react";

import { Link } from "react-router";

const dropdownsHandle = () => {
    $("[data-dropdown-id]").each(function () {
        var $dropdown = $(this);
        var id = $dropdown.attr("data-dropdown-id");
        var $dropdownContent = $("[data-for-dropdown-id='"+id+"']");
        $dropdownContent.appendTo("body");

        $dropdown.bind("mouseenter", function () {
            $(this).addClass("-hover");
            $(this).find(".c-link").addClass("-hover");
        });

        $dropdown.bind("mouseleave", function () {
            $(this).removeClass("-hover");
            $(this).find(".c-link").removeClass("-hover");
        });

        $dropdown.bind("click", function () {
            if ($(this).hasClass("-opened")) {
                $(window).trigger("c-dropdown.closed", ["c-dropdown.closed.force"]);
            } else {
                $(window).trigger("popups.close");
                $(".-opened").removeClass(".-opened");
                $(this).addClass("-opened");
                $(window).trigger("c-dropdown.opened", [$(this).attr("data-dropdown-id")]);
            }
            return false;
        });
    });

    $(window).bind("c-dropdown.change", function (event, data, value) {
        var $item = $(".-opened[data-dropdown-id='" + data + "']");
        $item.children().html(value);
    });

    $(window).bind("c-dropdown.closed", function (event, reason, data, value) {
        var selector = "";
        if (reason == undefined) {
            selector = ":not(.-hover)";
        }

        if (reason == "c-dropdown.closed.select") {
            $(window).trigger("c-dropdown.change", [data, value]);
        }

        $(".-opened[data-dropdown-id]" + selector).removeClass("-opened -hover -active");
        $(".c-dropdown_content__opened" + selector)
            .removeClass()
            .addClass("c-dropdown_content")
            .removeAttr("style")
            .unbind();

        if ($(".c-dropdown_content.-hover").length == 0) {
            $(document).unbind("click.c-dropdown");
            $(window).unbind("resize.c-dropdown");
        }
    });

    $(window).bind("c-dropdown.opened", function (event, data) {

        var $dropdownCaller = $(".-opened[data-dropdown-id='" + data + "']");
        var $dropdownContent = $("[data-for-dropdown-id='" + data + "']");

        var subPixelFix = 0;
        var ie8PixelFix = 0;
        var buttonFix = 0;

        $("html").addClass("html__dropdownOpening");

        var callerWidth = $dropdownCaller.outerWidth();
        var callerOffset = $dropdownCaller.offset();

        $dropdownContent.addClass("c-dropdown_content__opened");
        var contentWidth = $dropdownContent.outerWidth();
        var contentPaddings = contentWidth - $dropdownContent.width();

        $dropdownContent.css({
            top: callerOffset.top + $dropdownCaller.outerHeight() - 2,
            left: callerOffset.left + buttonFix,
            // временно убрал ?
            width: (callerWidth > contentWidth ? callerWidth : contentWidth) - contentPaddings + subPixelFix - ie8PixelFix
        });

        var forceChangeAlignment = $dropdownContent[0].getBoundingClientRect().right > ($(window).width() - 10);

        if (contentWidth > callerWidth || forceChangeAlignment) {
            if ($dropdownCaller.attr("data-dropdown-align") == "right" || forceChangeAlignment) {
                $dropdownContent.addClass("c-dropdown_content__right");
                $dropdownContent.css({
                    left: callerOffset.left + callerWidth - contentWidth + subPixelFix + buttonFix
                });
            } else {
                $dropdownCaller.addClass("c-dropdown_content__left");
            }
        };

        var dropdownContentDimensions = $dropdownContent[0].getBoundingClientRect();
        var delta = 0;

        if (dropdownContentDimensions.top < 0 || dropdownContentDimensions.bottom > $(window).height()) {

            dropdownContentDimensions.top < 0 ? (delta = -dropdownContentDimensions.top) : 0;
            dropdownContentDimensions.bottom > $(window).height() ? (delta = $(window).height() - dropdownContentDimensions.bottom) : 0;
            dropdownContentDimensions.top < 0 && dropdownContentDimensions.bottom > $(window).height() ? (delta = 0) : (delta = delta);

            $dropdownContent.css("top", $dropdownContent.offset().top + delta + 1);
        }

        setInterval(function () {
            $("html").removeClass("html__dropdownOpening");
        }, 0);

        $dropdownContent.bind("mouseenter", function () {
            $dropdownContent.addClass("-hover");
            $dropdownCaller.addClass("-hover");
        });

        $dropdownContent.bind("mouseleave", function () {
            $dropdownContent.removeClass("-hover");
            $dropdownCaller.removeClass("-hover");
        });

        $dropdownContent.find(".c-link").bind("click", function () {
            if (!$(this).hasClass("c-link__unbinded")) {
                if ($dropdownCaller.attr("data-dropdown-selectable") == "true") {
                    $dropdownContent.find(".c-link").removeClass("-checked");
                    $(this).addClass("-checked");
                    $(window).trigger("c-dropdown.closed", ["c-dropdown.closed.select", $(".c-dropdown_content__opened").attr("data-for-dropdown-id"), $(this).text()]);
                } else {
                    $(window).trigger("c-dropdown.closed", ["c-dropdown.closed.force"]);
                }
                if ($(this).hasClass("-checked")) return false;
                //return false; // костыль для отсутвующей обработки данных
            };
        });

        $(document).bind("click.c-dropdown", function () { // IE8 does not support click event on window object
            $(window).trigger("c-dropdown.closed");
        });

        $(window).bind("resize.c-dropdown lightbox__opened", function () {
            if (!$("html").hasClass("html__dropdownOpening")) { // IE8 resize event break flow
                $(window).trigger("c-dropdown.closed", ["c-dropdown.closed.force"]);
            }
        });
    });    
};


class Header extends React.Component {

    componentDidMount() {
        dropdownsHandle();
    }

    componentWillUnmount() {
    }
    
    render(){
        const { children } = this.props;

        return (
            <div className="header">
                <div className="c-wrapper">
                    <div className="header_items">
                        <span dangerouslySetInnerHTML={{__html:
                            '<a href="http://skbkontur.ru" target="_blank" title="СКБ Контур" class="kontur_projectName">' +
                                'к' +
                                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="125" height="30" viewBox="0 0 125 30" version="1.1" class="kontur-projects__svg" style=" margin: 0 -76px -9px -24px; ">' +
                                '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                                    '<g id="logo">' +
                                         '<path fill="#7ea82b" id="kontur-logo-cloud" d="M41.47 8.66C41.13 8.01 40.74 7.51 40.27 7.14 39.01 6.16 37.43 5.59 35.74 5.59 33.18 5.59 30.87 6.87 29.62 9.34 29.38 9.81 29.2 10.47 29.18 11 28.65 11.04 28.04 11.11 27.65 11.37 26.02 12.46 24.94 14.31 24.94 16.41 24.94 19.75 27.68 22 31.05 22L41.1 22C44.87 22 47.95 18.95 47.95 15.21 47.95 12.35 46.16 9.9 43.64 8.9 42.98 8.64 42.17 8.59 41.47 8.66ZM40.93 19.99L31.29 19.99C28.93 19.99 27.01 18.59 27.01 16.3 27.01 15 27.64 13.79 28.66 13.01 28.91 12.82 29.41 12.75 29.87 12.71 30.8 12.63 31.01 12.9 31.02 11.71 31.02 11.23 31.26 10.71 31.38 10.4 32.09 8.61 33.97 7.64 35.78 7.64 37.14 7.64 38.42 8.09 39.38 8.96 39.65 9.2 39.66 9.82 39.7 10.23 39.75 10.72 40.02 10.88 40.72 10.55 41.12 10.37 41.7 10.34 42.27 10.47 44.4 10.95 45.91 12.93 45.91 15.14 45.91 17.81 43.68 19.99 40.93 19.99Z"></path>' +
                                    '</g>' +
                                '</g>' +
                                '</svg>нтур.<span style=" color: #7ea82b ">ОФД</span>' +
                            '</a>'}} />
                        <span className="header_organization">ООО «Золотой пятачок»</span>
                    </div>
                    <div className="header_items">
                        <span className="header_settings c-dropdown c-dropdown__pseudo" data-dropdown-id="Settings" data-dropdown-align="left">Настройки и оплата</span>
                        <div className="c-dropdown_content" data-for-dropdown-id="Settings">
                            <div class="c-dropdown_list">
                                <a href="#" className="c-dropdown_list_item c-link">Организация</a>
                                <Link to="/cashbox" className="c-dropdown_list_item c-link" activeClassName="-active">Кассы</Link>
                            </div>
                            <div className="c-dropdown_hr"></div>
                            <div className="c-dropdown_content_payment">
                                <div className="c-dropdown_content_payment_name">Оплачено 10 касс</div>
                                <div className="c-dropdown_content_payment_date">до 15 февраля 2017</div>
                                <div className="c-dropdown_content_payment_button">
                                    <span className="c-button" id="PaymentToggle2">
                                        <span className="c-button_content">Оплата и продление</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Link to="/?" className="header_support">Помощь</Link>
                        <Link to="/?" className="header_account">Мстислав Ростропович</Link>
                        <span className="header_logout"><Link to="/logout">Выйти</Link></span>
                    </div>

                </div>
            </div>
        );
    }
}

export default Header;
