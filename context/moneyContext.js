import React from "react";

const MoneyContext = React.createContext({
  moneyType: 'USD',
  setMoneyType: () => {}
});


export const setMoneyTypeInContext = async (context) => {
  try {
    // Check if the flag is set in local storage
    const moneytpe = localStorage.getItem("moneyType");

    if (!moneytpe) {
      const ipResponse = await fetch('http://ip-api.com/json');
      if (ipResponse.ok) {
        const userLocation = await ipResponse.json();

        let moneyType;
        if (userLocation.country === 'Mexico') {
          moneyType = 'USD';
        } else if (userLocation.country === 'India') {
          moneyType = 'EUR';
        } else if (userLocation.country === 'Spain') {
          moneyType = 'MXN';
        }

        context.setMoneyType(moneyType);
        localStorage.setItem("moneyType",moneyType)
      }
    }
  } catch (error) {
    console.error("Error fetching user location:", error);
  }
};
export default MoneyContext;
