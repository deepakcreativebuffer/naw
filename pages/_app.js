import React, { Component } from "react";
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

export const setMoneyTypeInContext = async (context) => {
  try {
    const moneytpe = localStorage.getItem("moneyType");
    if(!moneytpe){
    const ipResponse = await fetch('http://ip-api.com/json');
    if (ipResponse.ok) {
      const userLocation = await ipResponse.json();
      
      console.log("userLocation",userLocation)
      let moneyType;
      if (userLocation.country === 'Spain') {
        moneyType = 'USD';
      } else if (userLocation.country === 'India') {
        moneyType = 'EUR';
      } else if (userLocation.country === 'Mexico') {
        moneyType = 'MXN';
      }else{
        moneyType = 'USD';
      }
      localStorage.setItem("moneyType",moneyType)
      context.setMoneyType(moneyType);
    }}else{
      context.setMoneyType(moneytpe)
    }
  } catch (error) {
    console.error("Error fetching user location:", error);
  }
};

class MyApp extends App {
  constructor(props) {
    super(props);

    this.state = {
      moneyType: null, // Set the initial moneyType to null
      setMoneyType: this.setMoneyType
    };
  }

  async componentDidMount() {
    // Call setMoneyTypeInContext to set the money type based on the user's location
    await setMoneyTypeInContext(this);
  }

  setMoneyType = moneyType => {
    this.setState({ moneyType });
    localStorage.setItem("moneyType",moneyType);
  };

  render() {
    const { Component, pageProps, store } = this.props;
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
