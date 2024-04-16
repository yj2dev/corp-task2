import { Container } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { getRateLog, setRateLog } from "../../redux/slices/currencySlice";

// Q1. 나는 코딩중 변수명이 제일 어렵다. 길고 이해되는 변수명 vs 약어를 썻지만 짧은 변수명
// A1.
const LandingPage = () => {
  const dispatch = useDispatch();

  const currencyState = useSelector((state) => state.currencySlice);

  const [inputAmount, setInputAmount] = useState(null);

  const [showDropMenu, setShowDropMenu] = useState(false);

  const [selectedFromCurrency, setSelectedFromCurrency] = useState(
    currencyState.currencyList[2],
  );

  const [selectedToCurrency, setSelectedToCurrency] = useState(
    currencyState.currencyList[0],
  );

  const [exchangedInfo, setExchangedInfo] = useState({
    baseDate: null,
    fromCurrency: null,
    toCurrency: null,
    resultAmount: null,
    rate: null,
  });

  const getExchangeRate = () => {
    return currencyState.rateLog[selectedFromCurrency][selectedToCurrency];
  };

  const onChangeInputAmount = (e) => {
    let value = e.target.value.replaceAll(",", "");
    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setInputAmount(value);

    const isRate = getExchangeRate();
    console.log("isRate", isRate);

    if (!isRate) {
      dispatch(
        setRateLog({
          fromCurrency: selectedFromCurrency,
          toCurrency: selectedToCurrency,
          amount: value,
        }),
      );
    }
  };

  const convertedAmount = (amount) => {
    const rate =
      currencyState.rateLog[selectedFromCurrency][selectedToCurrency];

    return parseInt(inputAmount?.replaceAll(",", "")) * rate;
  };

  return (
    <Container>
      <input type="text" value={inputAmount} onChange={onChangeInputAmount} />
      <ul>
        {currencyState.currencyList.map(
          (currency, index) =>
            currency !== selectedFromCurrency && (
              <li key={index} onClick={() => setSelectedFromCurrency(currency)}>
                {currency}
              </li>
            ),
        )}
      </ul>
      {selectedFromCurrency}
      <ul>
        {currencyState.currencyList.map(
          (currency, index) =>
            currency !== selectedFromCurrency && (
              <li
                key={index}
                onClick={() => setSelectedToCurrency(currency)}
                className={selectedToCurrency === currency && "active"}
              >
                {currency}
              </li>
            ),
        )}
      </ul>

      {inputAmount &&
        currencyState.rateLog[selectedFromCurrency][selectedToCurrency] && (
          <article className="exchange-rate-result">
            <h3>
              {selectedToCurrency}&nbsp;
              {convertedAmount(inputAmount)}
            </h3>
            기준일:
            <br />
            {currencyState.baseDate}
          </article>
        )}
    </Container>
  );
};

export default LandingPage;
