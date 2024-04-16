import store from "./redux/store";
import { Provider } from "react-redux";
import LandingPage from "./pages/LandingPage";

function App() {
  //   Q1. 기업에서 Redux를 사용하라 명시했을때 순수하게 Redux만 사용해야 하나요? 그렇지 않다면 리덕스를 사용하라 했을 때 관련 툴(redux-toolkit, query 등)을 쓰는 것도 상관없나요?
  //   A1.

  return (
    <Provider store={store}>
      <LandingPage />
    </Provider>
  );
}

export default App;
