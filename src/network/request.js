import axios from "axios";

export const getRate = async (from, to, amount) => {
  // return {
  //   amount: 0.000755,
  //   from: "KRW",
  //   to: "USD",
  //   date: "2024-04-17",
  //   rate: 0.000755,
  // };

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
        amount: res.data.result,
        from: res.data.query.from,
        to: res.data.query.to,
        date: res.data.date,
        rate: res.data.info.rate,
      };
    })
    .catch((err) => err);
};
