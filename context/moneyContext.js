
import React from "react";


const MoneyContext = React.createContext({
    moneyType: "USD",
    setMoneyType: () => {}
  });

export default MoneyContext;