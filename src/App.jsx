import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "./styled";

function App() {
  const [value, setValue] = useState(null);

  const [showDropMenu, setShowDropMenu] = useState(false);

  const fromCurrencyList = ["USD", "CAD", "KRW", "HKD", "JPY", "CNY"];
  const [selectedFromCurrency, setSelectedFromCurrency] = useState(
    fromCurrencyList[0],
  );

  const toCurrencyList = ["USD", "CAD", "KRW", "HKD", "JPY", "CNY"];
  const [selectedToCurrency, setSelectedToCurrency] = useState(
    toCurrencyList[0],
  );

  const [exchangedInfo, setExchangedInfo] = useState({
    result: null,
    baseDate: null,
    toCurrency: null,
  });

  useEffect(() => {}, []);
  const getExchangeRate = (to, from, amount) => {
    axios
      .get(
        `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
        {
          headers: {
            apikey: process.env.REACT_APP_EXCHANGE_RATE_API_KEY,
          },
        },
      )
      .then((res) => {
        setExchangedInfo({
          result: res.data.result,
          baseDate: res.data.date,
          toCurrency: res.data.query.to,
        });
      })
      .catch((err) => err);
  };

  const onChangeValue = (e) => {
    let inputValue = e.target.value.replaceAll(",", "");
    inputValue = inputValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue(inputValue);
  };

  return (
    <Container>
      <input type="text" value={value} onChange={onChangeValue} />
      <ul>
        {fromCurrencyList.map((currency, index) => (
          <li key={index} onClick={() => setSelectedFromCurrency(currency)}>
            {currency}
          </li>
        ))}
      </ul>
      {selectedFromCurrency}
      <ul>
        {toCurrencyList.map((currency, index) => (
          <li key={index} onClick={() => setSelectedToCurrency(currency)}>
            {currency}
          </li>
        ))}
      </ul>
      {selectedToCurrency}
      <button
        onClick={() => {
          getExchangeRate(
            selectedToCurrency,
            selectedFromCurrency,
            value.replaceAll(",", ""),
          );
        }}
      >
        변환
      </button>
      {exchangedInfo && exchangedInfo.toCurrency} <br />
      {exchangedInfo && exchangedInfo.result}
      <br />
      {exchangedInfo && exchangedInfo.baseDate}
    </Container>
  );
}

export default App;
