import styled from "styled-components";

export const Container = styled.div`
  margin: 24px 16px;
  padding: 16px;
  border: 4px solid #000;
  width: 200px;

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;
