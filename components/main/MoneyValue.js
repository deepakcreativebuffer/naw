import React, { Component, Fragment } from 'react';
import MoneyContext from '../../context/moneyContext';
import constants from '../../helper/enviroment/environment'


class MoneyValue extends Component {

    constructor() {
        super();
        this.state = {
            Tmxn: 0,
            Teur: 0,
        };
    }

    componentWillMount = () => {
      this.getExchange()
  
    }

    getExchange = () => {
        fetch(`https://api.getgeoapi.com/v2/currency/convert?api_key=${constants.currencyAPI}&from=USD`).
            then(res => res.json()).
            then(data => {
                console.log(data.rates.rate)
                this.setState({ Tmxn: data.rates.MXN.rate })
                this.setState({ Teur:  data.rates.EUR.rate })
            })
    }

   

    render() {
        return (
            <MoneyContext.Consumer>
                {({ moneyType, setMoneyType }) => (

                    <Fragment>{
                        moneyType === 'MXN' ?

                            `$ ${(this.props.price * 19.9022).toFixed(2)} ${moneyType}` :
                            moneyType === 'EUR' ?
                                `$ ${(this.props.price * 0.9496).toFixed(2)} ${moneyType}` :
                                `$ ${this.props.price} ${moneyType}`
                    }</Fragment>

                )}
            </MoneyContext.Consumer>
        );
    }
}


export default MoneyValue;