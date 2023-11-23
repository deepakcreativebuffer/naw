import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "../../routes";
import i18n from "../../helper/i18n/config";

var slug = require("slug");

import endPoints from "../../helper/core_services/endpoints/adventure";
import endPoints1 from "../../helper/core_services/endpoints/destination";

import request from "../../helper/core_services/core/requestService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import constants from "../../helper/enviroment/environment";
import { links } from "../../helper/constants/links/externals";
import MoneySwitch from "./MoneySwitch";
import { isDate } from "date-fns";

const logo = "/static/img/favicons/app/logo.png";
const iconEsp = "/static/img/favicons/language/esp.svg";
const iconEn = "/static/img/favicons/language/en.svg";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenMenu: false,
      isOpen: false,
      elementsDestination: [],
      elementsActivities: [],
    };
  }
  componentWillMount = () => {
    this.handleDestination();
    this.handleActivities();
  };

  componentDidMount() {
    this.handleScroll();
    document.addEventListener("click", this.handleClick, false);
  }

  componentWillUnmount = () => {
    document.removeEventListener("click", this.handleClick, false);
  };

  handleClick = (e) => {
    if (!ReactDOM.findDOMNode(this).contains(e.target)) {
      this.setState({ isOpen: false });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.valueLanguage != this.props.valueLanguage) {
      this.handleDestination();
      this.handleActivities();
    }
  }

  handleDestination = async () => {
    //let { dataDestination } = this.props;
    let { valueLanguage } = this.props;
    let result = await request(
      endPoints1.get_destination,
      null,
      null,
      valueLanguage
    );
    let dataDestination = result.objects;
    console.log("dataDestination>>>", dataDestination);
    let elementsDestination = [];
    let tempArray = [];
    let cont = -1;
    let limit = parseInt(dataDestination.length / 2);
    dataDestination.map((element, i) => {
      let { uuid, name } = element;
      tempArray.push(
        // <Link route={'searchDestination'} params={{destination: slug(name).toLowerCase()}} key={`destination_${i}`}>
        <Link to={`${constants.url}/adventures/${slug(name).toLowerCase()}`}>
          <DropdownItem className="sty-uty-font-12-2" onClick={this.toggle}>
            {name}
          </DropdownItem>
        </Link>
        // </Link>
      );
      cont++;
      if (cont == limit || i == dataDestination.length - 1) {
        elementsDestination.push(
          <div className="col-6" key={`dest_comp_${i}`}>
            {tempArray}
          </div>
        );
        tempArray = [];
        cont = 0;
      }
      return null;
    });

    this.setState({ elementsDestination });
  };

  handleActivities = async () => {
    let { valueLanguage } = this.props;
    let result = await request(
      endPoints.get_adventure_type,
      null,
      null,
      valueLanguage
    );
    let dataAdventure = result?.objects;

    let elementsActivities = [];
    let tempArray = [];
    let cont = -1;
    let limit = parseInt(dataAdventure?.length / 2);
    dataAdventure?.map((element, i) => {
      let { uuid, name } = element;
      tempArray.push(
        // <Link route={'searchActivity'} params={{destination: 'all', adventure: 'all', activity: slug(name).toLowerCase()}} key={`activity_${i}`}>
        <a
          href={`${constants.url}/adventures/all/all/${slug(
            name
          ).toLowerCase()}`}
        >
          <DropdownItem className="sty-uty-font-12-2" onClick={this.toggle}>
            {name}
          </DropdownItem>
        </a>
        // </Link>
      );
      cont++;
      if (cont == limit || i == dataAdventure.length - 1) {
        elementsActivities.push(
          <div className="col-6" key={`acti_comp_${i}`}>
            {tempArray}
          </div>
        );
        tempArray = [];
        cont = 0;
      }
      return null;
    });

    this.setState({ elementsActivities });
  };

  handleScroll = () => {
    window.onscroll = function () {
      scroll();
    };
    var barr = document.getElementById("id-barNav");

    function scroll() {
      //var height 		= document.body.scrollTop
      var height = document.documentElement.scrollTop;

      if (height > 80) {
        barr.classList.add("sty-nav-animation");
        barr.classList.remove("sty-nav-animation-two");
        document.getElementById("logo-img").src =
          "/static/img/favicons/app/logo2.png";
      } else {
        barr.classList.remove("sty-nav-animation");
        barr.classList.add("sty-nav-animation-two");
        document.getElementById("logo-img").src =
          "/static/img/favicons/app/logo.png";
      }
    }
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleShowMenu = (e) => {
    let { isOpenMenu } = this.state;
    let add = document.getElementById("id-principal-menu-add");
    let menu = document.getElementById("id-principal-menu");

    if (!isOpenMenu) {
      add.style.visibility = "visible";
      menu.style.visibility = "visible";
      menu.classList.add("sty-principal-menu-animation-1");
      add.classList.add("sty-principal-menu-animation-1");
      menu.addEventListener("animationend", () => {
        if (event.animationName !== "showMenu") {
          return;
        }
        menu.classList.remove("sty-principal-menu-animation-1");
        add.classList.remove("sty-principal-menu-animation-1");
      });
    }
    if (isOpenMenu) {
      menu.classList.add("sty-principal-menu-animation-2");
      add.classList.add("sty-principal-menu-animation-2");
      menu.addEventListener("animationend", () => {
        if (event.animationName !== "hideMenu") {
          return;
        }
        menu.style.visibility = "hidden";
        add.style.visibility = "hidden";
        menu.classList.remove("sty-principal-menu-animation-2");
        add.classList.remove("sty-principal-menu-animation-2");
      });
    }

    e.currentTarget.classList.toggle("is-active");
    this.state["isOpenMenu"] = !isOpenMenu;
  };

  handleChangeLanguage = (e) => {
    let { setLanguage } = this.props;
    let language = e.currentTarget.id;
    localStorage.setItem("lang", language);
    setLanguage(language);
    i18n.changeLanguage(language);
  };

  render() {
    let { valueLanguage } = this.props;
    let { elementsDestination, elementsActivities } = this.state;
    if (valueLanguage == "") {
      valueLanguage = "es";
    }
    let tagFlag =
      valueLanguage == "es" ? i18n.t("nav:lang_es") : i18n.t("nav:lang_en");
    let tagLan = valueLanguage == "es" ? iconEsp : iconEn;

    console.log("sahjhhhj", i18n.t("nav:destinations"));
    console.log("");

    return (
      <>
        <Navbar
          dark
          expand="md"
          className="sty-navbar sty-nav-animation-two"
          onMouseOver={this.handleHover}
          onMouseOut={this.handleOut}
          id="id-barNav"
        >
          <Link route="index">
            <a className="navbar-brand">
              <div className="sty-logo">
                <img src={logo} alt="logotipo quiera" id="logo-img" />
              </div>
            </a>
          </Link>

          {/* ///////////////////// */}
          <div className="sty-container-language">
            <MoneySwitch />
            <UncontrolledDropdown className="sty-container-element">
              <DropdownToggle nav>
                <div className="sty-language sty-justify-content">
                  <div className="icon-language">
                    <img src={tagLan} width="16" height="16" />
                  </div>
                  &nbsp;
                  <div className="tag">{tagFlag}</div>&nbsp;&nbsp;
                  <div>
                    <span className="down">
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        width="8"
                        height="8"
                      />
                    </span>
                  </div>
                </div>
              </DropdownToggle>
              <DropdownMenu className="">
                <DropdownItem
                  id="es"
                  className="sty-uty-font-14-1 sty-justify-content-vertical sty-select-language"
                  onClick={this.handleChangeLanguage}
                >
                  <div className="sty-icon">
                    <img src={iconEsp} width="16" height="16" />
                  </div>
                  <div className="sty-tag">{i18n.t("nav:lang_es")}</div>
                </DropdownItem>
                <DropdownItem
                  id="en"
                  className="sty-uty-font-14-1 sty-justify-content-vertical sty-select-language"
                  onClick={this.handleChangeLanguage}
                >
                  <div className="sty-icon">
                    <img src={iconEn} width="16" height="16" />
                  </div>
                  <div className="sty-tag">{i18n.t("nav:lang_en")}</div>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          {/* ///////////////// */}

          <NavbarToggler onClick={this.toggle} />
          <Collapse
            className="sty-content-elements"
            isOpen={this.state.isOpen}
            navbar
          >
            <Nav className="ml-auto sty-justify-content" navbar>
              <UncontrolledDropdown
                nav
                inNavbar
                className="sty-container-element"
              >
                <DropdownToggle nav>
                  {i18n.t("nav:destinations")}&nbsp;&nbsp;
                  <span className="down">
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      width="16"
                      height="16"
                    />
                  </span>
                </DropdownToggle>
                <DropdownMenu className="sty-uty-drop-menu-content-2">
                  <div className="col-12">
                    <div className="row">{elementsDestination}</div>
                  </div>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown
                nav
                inNavbar
                className="sty-container-element"
              >
                <DropdownToggle nav>
                  {i18n.t("nav:activities")}
                  <span className="down">
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      width="16"
                      height="16"
                    />
                  </span>
                </DropdownToggle>
                <DropdownMenu className="sty-uty-drop-menu-content-2">
                  <div className="col-12">
                    <div className="row">{elementsActivities}</div>
                  </div>
                  {/* <DropdownItem divider />
                  <DropdownItem>
                    Test 3
                  </DropdownItem> */}
                </DropdownMenu>
              </UncontrolledDropdown>

              <NavItem className="sty-container-element">
                <Link route="contact">
                  <a className="nav-link">{i18n.t("nav:contact")}</a>
                </Link>
              </NavItem>
              <NavItem className="sty-container-element">
                <a className="nav-link" href={links.blog}>
                  {i18n.t("nav:blog")}
                </a>
              </NavItem>
              <NavItem className="sty-container-element">
                <Link route="about_us">
                  <a className="nav-link">{i18n.t("nav:about")}</a>
                </Link>
              </NavItem>

              <UncontrolledDropdown
                nav
                inNavbar
                className="sty-container-element sty-content-hidden-resp"
              >
                <DropdownToggle nav>
                  <div className="sty-language sty-justify-content">
                    <div className="icon-language">
                      <img src={tagLan} width="16" height="16" />
                    </div>
                    &nbsp;
                    <div className="tag">{tagFlag}</div>&nbsp;&nbsp;
                    <div>
                      <span className="down">
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          width="16"
                          height="16"
                        />
                      </span>
                    </div>
                  </div>
                </DropdownToggle>
                <DropdownMenu className="">
                  <DropdownItem
                    id="es"
                    className="sty-uty-font-14-1 sty-justify-content-vertical sty-select-language"
                    onClick={this.handleChangeLanguage}
                  >
                    <div className="sty-icon">
                      <img src={iconEsp} width="16" height="16" />
                    </div>
                    <div className="sty-tag">{i18n.t("nav:lang_es")}</div>
                  </DropdownItem>
                  {/* <DropdownItem divider /> */}
                  <DropdownItem
                    id="en"
                    className="sty-uty-font-14-1 sty-justify-content-vertical sty-select-language"
                    onClick={this.handleChangeLanguage}
                  >
                    <div className="sty-icon">
                      <img src={iconEn} width="16" height="16" />
                    </div>
                    <div className="sty-tag">{i18n.t("nav:lang_en")}</div>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <div className="moneySwitch">
                <MoneySwitch nav inNavbar />
              </div>
            </Nav>
          </Collapse>
        </Navbar>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    valueLanguage: state.reducerNavigation.valueLanguage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: (stateLanguage) => {
      dispatch({ type: "STATE_LANGUAGE", stateLanguage });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
