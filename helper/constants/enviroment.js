export default {
  dev: {
    // 'api_url': 'http://127.0.0.1:8000',
    api_url: "http://192.168.1.20:8000",
    /*keys*/
    url: "http://192.168.1.20:8000",
    googleTag: "GTM-5S9R35R",
    stripe: "pk_test_TYooMQauvdEDq54NiTphI7jx",
    currencyAPI: "3fa28279defc27ba7e9e82a68ed51eb93422baff",
    // 'googleMaps'     : 'AIzaSyBilUDOeh7Vt0FZYweSXzU0lStRAiXJjPk',
  },
  test: {
    // 'api_url': 'https://stage2.naw.mx:8000',
    api_url: "http://192.168.1.20:8000", //ankit
    // api_url: "http://192.168.1.31:8000",
    /*keys*/
    url: "http://192.168.1.20:8000", //ankit
    // url: "http://192.168.1.31:8000",
    googleTag: "GTM-5S9R35R",
    stripe: "pk_test_FrWxe6SMFv89p7w5Uxcjr5TR",
    currencyAPI: "3fa28279defc27ba7e9e82a68ed51eb93422baff",
    // 'googleMaps'     : 'AIzaSyBilUDOeh7Vt0FZYweSXzU0lStRAiXJjPk',
  },
  prod: {
    api_url: "https://api-prod.naw.mx",
    /*keys*/
    url: "http://naw.mx",
    googleTag: "GTM-5S9R35R",
    stripe: "pk_live_bRmubdxCLwd1iXNSs1RdUjxZ",
    currencyAPI: "3fa28279defc27ba7e9e82a68ed51eb93422baff",
    // 'googleMaps'     : 'AIzaSyBilUDOeh7Vt0FZYweSXzU0lStRAiXJjPk',
  },
};
