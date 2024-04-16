import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";
import axios from "axios";
import { getExchangeRate } from "../../network/request";

const currencyList = ["USD", "CAD", "KRW", "HKD", "JPY", "CNY"];

const initialState = {
  fromCurrency: null,
  toCurrency: null,
  amount: null,
  baseDate: null,
  currencyList,
  // rateLog: {
  //   KRW: {
  //     USD: 0.32,
  //     CAD: 1.45,
  //   },
  // },
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
      // 설명: 변환할 통화 비율이 없으면 API 요청을 보내 비율을 갱신합니다.
      // 작성자: 이유진
      // 작성일: 2024.04.17 04:38

      const from = action.payload.fromCurrency;
      const to = action.payload.toCurrency;
      const amount = action.payload.amount;

      const rate = state.rateLog[from][to];

      console.log("redux rate >> ", rate);

      if (!rate) {
        console.log("요청");
        // 비동기 작업 완료 후에 produce 함수 호출
        getExchangeRate(from, to, amount)
          .then(
            ({ baseDate, resultAmount, fromCurrency, toCurrency, rate }) => {
              console.log("redux");
              console.log(
                baseDate,
                resultAmount,
                fromCurrency,
                toCurrency,
                rate,
              );

              return produce(state, (draftState) => {
                draftState.baseDate = baseDate;
                draftState.rateLog[fromCurrency][toCurrency] = rate;
              });
            },
          )
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
});

export const { setRateLog } = currencySlice.actions;
export default currencySlice;
