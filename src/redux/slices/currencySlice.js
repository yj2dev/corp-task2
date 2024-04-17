import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";

const currencyList = ["USD", "CAD", "KRW", "HKD", "JPY", "CNY"];

const initialState = {
  baseDate: null,
  currencyList,
  rateLog: currencyList.reduce((cur, key) => {
    cur[key] = {};
    return cur;
  }, {}),
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setRateLog(state, action) {
      const { amount, from, to, date, rate } = action.payload;

      console.log("redux >> ", amount, from, to, date, rate);

      return produce(state, (draft) => {
        // if (!draft.rateLog[from]) {
        //   draft.rateLog[from] = {};
        // }

        // if (draft.rateLog[from][to] !== undefined) {
        draft.rateLog[from][to] = rate;
        draft.baseDate = date;
        // }
      });

      // if (!rate) {
      //   getExchangeRate(from, to, amount)
      //     .then(({ baseDate, fromCurrency, toCurrency, rate }) => {
      //       return produce(state, (draftState) => {
      //         draftState.rateLog[fromCurrency][toCurrency] = rate;
      //         draftState.baseDate = baseDate;
      //       });
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
      // }
    },
  },
});

export const { setRateLog } = currencySlice.actions;
export default currencySlice;
