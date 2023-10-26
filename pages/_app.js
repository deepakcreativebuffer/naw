import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";
import { reducer as formReducer } from 'redux-form';
import navigation from '../helper/reducers/reducer'
import MoneyContext from "../context/moneyContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/scss/styles.scss"

const reducer = combineReducers({
    form: formReducer,
    reducerNavigation: navigation
});

/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
* @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR 
*/
const makeStore = (initialState, options) => {
    return createStore(reducer, initialState);
};

class MyApp extends App {
    constructor(props) {
        super(props);
        this.state = {
          moneyType: props.moneyType || "USA",
          setMoneyType: this.setMoneyType
        };
      } 


  
    setMoneyType = moneyType => {
        this.setState({ moneyType });
    };
 
    // state = {
    //     moneyType: "USA",
    //     setMoneyType: this.setMoneyType
    // };

    static async getInitialProps({ Component, ctx }) {
            try {
              const ipResponse = await fetch('http://ip-api.com/json');
              if (ipResponse.ok) {
                const userLocation = await ipResponse.json(); 

                let moneyType;
                if (userLocation.country === 'India') {
                  moneyType = 'USD';                  
                } else if(userLocation.country === 'Mexico') {
                  moneyType = 'MXN';
                } else if (userLocation.country === 'Spain'){
                    moneyType = 'EUR';
                }
      
                // Pass the moneyType as a prop to your component
                const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
                return { pageProps, moneyType };
              } else {
                console.error('Failed to fetch IP location data');
              }
            } catch (error) {
              console.error('Error while fetching IP location data:', error);
            }
        
            const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
            return { pageProps, moneyType: 'USD' };
          }


    render() {
        const { Component, pageProps, store  } = this.props;
        return (
            <Container>
                <MoneyContext.Provider value={this.state}>
                    <Provider store={store}>
                        <Component {...pageProps} />
                    </Provider>
                </MoneyContext.Provider>

            </Container>
        );
    }

}

export default withRedux(makeStore)(MyApp);