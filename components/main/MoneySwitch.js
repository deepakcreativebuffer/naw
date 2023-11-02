import React, { Component, Fragment } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import MoneyContext from '../../context/moneyContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
const dolarIcon = "/static/img/moneyIcons/dolar_icon.png"
const euroIcon = "/static/img/moneyIcons/euro_icon.png"
const pesoIcon = "/static/img/moneyIcons/peso_icon.png"
const dolarIconW = "/static/img/moneyIcons/dolar_icon_white.png"
const euroIconW = "/static/img/moneyIcons/euro_icon_white.png"
const pesoIconW = "/static/img/moneyIcons/peso_icon_white.png"
import Image from 'next/image';

class MoneySwitch extends Component {
    render() {
        return (
            <MoneyContext.Consumer>
                {({ moneyType, setMoneyType }) => {
                    return (
                        <Fragment>
                            {this.props.onFooter === true ? (
                                <UncontrolledDropdown className="sty-container-element">
                                    <DropdownToggle nav>
                                        <div className='borderboxMoney'>
                                            <div className="sty-language sty-justify-content">
                                                <div className="tag" style={{ marginRight: 7 }}>
                                                    {moneyType === 'USD' ?
                                                        <div className='icon-moneyF'>
                                                            <Image src={dolarIconW} width={15} height={15} loading='lazy' />
                                                            <p>{moneyType}</p>
                                                        </div>
                                                        : moneyType === 'MXN' ?
                                                            <div className='icon-moneyF'>
                                                                <Image src={pesoIconW} width={15} height={16} loading='lazy' />
                                                                <p>{moneyType}</p>
                                                            </div>
                                                            :
                                                            <div className='icon-moneyF'>
                                                                <Image src={euroIconW} width={13} height={13} loading='lazy' />
                                                                <p>{moneyType}</p>
                                                            </div>}
                                                </div>
                                                <div>
                                                    <span className="down"><FontAwesomeIcon icon={faChevronDown} width='16' height='16' /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </DropdownToggle>
                                    <DropdownMenu className="drop-footer">
                                        <DropdownItem
                                            id="USD"
                                            className="sty-uty-font-14-1 sty-justify-content-vertical sty-select-language"
                                            onClick={() => {setMoneyType("USD"); }}>
                                            <div className="sty-tag"><Image src={dolarIcon} width={15} height={16} style={{ marginBottom: 3 }} loading='lazy' /> USD</div>
                                        </DropdownItem>
                                        <DropdownItem
                                            id="MXN"
                                            className="sty-uty-font-14-1 sty-justify-content-vertical sty-select-language"
                                            onClick={() =>{ setMoneyType("MXN");}}>
                                            <div className="sty-tag"><Image src={pesoIcon} width={15} height={16} style={{ marginBottom: 3 }} /> MXN</div>
                                        </DropdownItem>
                                        <DropdownItem
                                            id="EUR"
                                            className="sty-uty-font-14-1 sty-justify-content-vertical sty-select-language"
                                            onClick={() => {setMoneyType("EUR");}}>
                                            <div className="sty-tag"><Image src={euroIcon} width={15} height={15} style={{ marginBottom: 3 }} /> EUR</div>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            ) : (
                                <UncontrolledDropdown className="sty-container-element">
                                    <DropdownToggle nav>
                                        <div className="boxMoney sty-language sty-justify-content money-switch">
                                            <div className="tag">
                                                {moneyType === 'USD' ? (
                                                    <div className='icon-money' >
                                                        <Image src={dolarIconW} width={15} height={16} />
                                                        <p>{moneyType} </p>
                                                    </div>
                                                ) : moneyType === 'MXN' ? (
                                                    <div className='icon-money'>
                                                        <Image src={pesoIconW} width={15} height={16} />
                                                        {moneyType}
                                                    </div>
                                                ) : (
                                                    <div className='icon-money'>
                                                        <Image src={euroIconW} width={15} height={16} />
                                                        {moneyType}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <span className="down"><FontAwesomeIcon icon={faChevronDown} className="down-icon" style={{ marginLeft: 25 }} width='16' height='16' /></span>
                                            </div>
                                        </div>
                                    </DropdownToggle>
                                    <DropdownMenu className="">
                                        <DropdownItem
                                            id="USD"
                                            className="sty-uty-font-14-1 sty-justify-content-vertical sty-select-language"
                                            onClick={() => {setMoneyType("USD");}}>
                                            <div className="sty-tag"><Image src={dolarIcon} width={15} height={16} style={{ marginBottom: 3 }} /> USD</div>
                                        </DropdownItem>
                                        <DropdownItem
                                            id="MXN"
                                            className="sty-uty-font-14-1 sty-justify-content-vertical sty-select-language"
                                            onClick={() => {setMoneyType("MXN");}}>
                                            <div className="sty-tag"><Image src={pesoIcon} width={15} height={16} style={{ marginBottom: 3 }} /> MXN</div>
                                        </DropdownItem>
                                        <DropdownItem
                                            id="EUR"
                                            className="sty-uty-font-14-1 sty-justify-content-vertical sty-select-language"
                                            onClick={() => {setMoneyType("EUR");}}>
                                            <div className="sty-tag"><Image src={euroIcon} width={15} height={15} style={{ marginBottom: 3 }} /> EUR</div>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            )}
                        </Fragment>
                    );
                }}
            </MoneyContext.Consumer>
        );
    }
}

export default MoneySwitch;
