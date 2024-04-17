import { Container } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setRateLog } from "../../redux/slices/currencySlice";
import { getRate } from "../../network/request";

// Q1. 나는 코딩중 변수명이 제일 어렵다. 길고 이해되는 변수명 vs 약어를 썻지만 짧은 변수명
//     유저가 선택한 통화명을 나타내는 변수명을 만든다고 하면 selectedFromCurrency와 from 중 고민이 된다. 어짜피 이 컴포넌트는 통화를 다루는 컴포넌트이기 때문에 from 만 적어도 상관없을것 같지만 다른 개발자가 보기에도 그럴까?
// A1.
const LandingPage = () => {
  const dispatch = useDispatch();

  const currencyState = useSelector((state) => state.currencySlice);

  const [inputAmount, setInputAmount] = useState("");
  const [selectFrom, setSelectFrom] = useState(currencyState.currencyList[2]);
  const [selectTo, setSelectTo] = useState(currencyState.currencyList[0]);

  const [showDropMenu, setShowDropMenu] = useState(false);

  const [loading, setLoading] = useState(false);

  // Q2. 함수가 서로에게 의존되어 있는데 이럴땐 함수를 풀고 하나로 만드는게 괜찮을까?
  //     내가 함수로 나눈 이유는 각각의 코드에 대한 역할명을 부여하기 위해서이다.
  // A2.

  const isRate = (from, to) => {
    return currencyState.rateLog[from][to];
  };

  const runGetRate = async () => {
    const res = await getRate(selectFrom, selectTo, 1);
    dispatch(setRateLog(res));
  };

  const getCheckRate = () => {
    const rate = isRate(selectFrom, selectTo);

    if (rate === undefined) {
      if (loading) return;
      setLoading(true);
      runGetRate();
      setLoading(false);
    } else {
    }
  };

  useEffect(() => {
    getCheckRate();
  }, [selectTo, selectFrom]);

  useEffect(() => {
    getCheckRate();
  }, []);

  const onChangeInputAmount = (e) => {
    let value = e.target.value.replaceAll(",", "");

    if (isNaN(value)) return;

    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setInputAmount(value);

    const rate = isRate(selectFrom, selectTo);

    if (!rate) {
      dispatch(
        setRateLog({
          fromCurrency: selectFrom,
          toCurrency: selectTo,
          amount: value,
        }),
      );
    }
  };

  const convertAmount = (amount) => {
    const rate = isRate(selectFrom, selectTo);
    return parseInt(amount?.replaceAll(",", "")) * rate;
  };

  return (
    <Container>
      <section className="input">
        <input type="text" value={inputAmount} onChange={onChangeInputAmount} />

        <select
          value={selectFrom}
          onChange={(e) => {
            console.log(e.target.value);
            setSelectFrom(e.target.value);
          }}
        >
          {currencyState.currencyList.map((currency, index) => (
            <option
              key={index}
              value={currency}
              // onClick={() => setSelectFrom(currency)}
            >
              {currency}
            </option>
          ))}
        </select>
      </section>
      <section className="select-to-currency">
        <ul>
          {currencyState.currencyList.map(
            (currency, index) =>
              currency !== selectFrom && (
                <li
                  key={index}
                  onClick={() => setSelectTo(currency)}
                  className={selectTo === currency && "active"}
                >
                  {currency}
                </li>
              ),
          )}
        </ul>

        {inputAmount && currencyState.rateLog[selectFrom][selectTo] && (
          <article className="exchange-rate-result">
            <h3>
              {selectTo}&nbsp;
              {convertAmount(inputAmount)}
            </h3>
            <h4>
              기준일:
              <br />
              {currencyState.baseDate}
            </h4>
          </article>
        )}
      </section>
    </Container>
  );
};

export default LandingPage;
