import axios from "axios";

export const getExchangeRate = async (from, to, amount) => {
  return axios
    .get(
      `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
      {
        headers: {
          apikey: process.env.REACT_APP_EXCHANGE_RATE_API_KEY,
        },
      },
    )
    .then((res) => {
      console.log("res >> ", res);
      return {
        baseDate: res.data.date,
        resultAmount: res.data.result,
        fromCurrency: res.data.query.from,
        toCurrency: res.data.query.to,
        rate: res.data.info.rate,
      };
    })
    .catch((err) => err);
};
