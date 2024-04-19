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

      return produce(state, (draft) => {
        if (!draft.rateLog[from]) {
          draft.rateLog[from] = {};
        }

        try {
          if (!draft.rateLog[from].hasOwnProperty(to)) {
            draft.rateLog[from] = { [to]: rate };
          }
        } catch (err) {}
      });
    },
  },
});

export const { setRateLog } = currencySlice.actions;
export default currencySlice;
