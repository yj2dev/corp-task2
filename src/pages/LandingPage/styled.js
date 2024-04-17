import styled from "styled-components";

export const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  margin: 24px 16px;
  padding: 16px;
  border: 5px solid #000;
  width: 200px;

  input[type="text"]::-webkit-outer-spin-button,
  input[type="text"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="text"] {
    outline: none;
    border: 2px solid #000;
    //padding: 6px 8px;
    font-weight: 800;
    width: 100%;
  }

  section.input {
    width: 100%;
    display: flex;
    gap: 8px;
    margin-bottom: 8px;

    input {
      flex: 1;
    }
    select {
      flex: 1;
      outline: none;
      border: 2px solid #000;
    }
  }
  section.select-to-currency {
    border: 2px solid #000;
    min-height: 140px;

    ul {
      display: flex;
      padding: 0;
      margin: 0;
      justify-content: space-between;
      li {
        list-style: none;
        border-right: 1px solid #000;
        border-bottom: 1px solid #000;
        text-align: center;
        width: 100%;
      }
      li:last-child {
        border-right: none;
      }

      li.active {
        border-bottom: none;
      }
    }
    article.exchange-rate-result {
      overflow: hidden;
      margin: 12px;
      h4 {
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
`;
