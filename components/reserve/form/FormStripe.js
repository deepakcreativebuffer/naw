import enviroment from '../../../helper/enviroment/environment'

import React, {Component} from 'react';

export default class Layout extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        let {handleInitStripe} = this.props
        let component =  this
        setTimeout(()=>{
            var stripe = window.Stripe(enviroment.stripe);
            var elements = stripe.elements();

            var style = {
                base: {
                // Add your base input styles here. For example:
                fontSize: '1em',
                color: "#32325d",
                border: "solid",
                borderWidth: "1px"
                }
            };

            var card = elements.create('card', {style: style});
            card.mount('#card-element');
            handleInitStripe(stripe, card)
        }, 4000)
    }

    render(){
        
        return <>
            <form action="/charge" method="post" id="payment-form" onSubmit={this.handleSendToken}>
                <div className="col-12 sty-uty-input-3 padding-1" id="card-element">
                </div>

                <button className="hidden_element" type="button"></button>
            </form>
        </>
    }
    
}
