import styled from "styled-components";
import { Button } from "../../../components";

const ContainerItens = styled.div`
  width: 100%;
  min-height: 100vh;
  align-items: center;
  display: flex;
  flex-direction: column;

  justify-content: center;
  padding: 30px 0px;
  color: #ffffff;

  h2 {
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;

    input {
      background-color: transparent;
      height: 35px;
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }

      font-size: 1rem;
      padding: 15px;

      outline: none;
      border: none;
      border-bottom: ${(props) =>
        props.error ? "1px solid red" : "1px solid gray"} !important;
      color: white;
      &:focus {
        border-bottom: 1px solid orange !important;
      }
    }

    select {
      background-color: transparent;
      height: 35px;
      color: white;
      padding: 5px;
      outline: none;
      border: none;
      border-bottom: 1px solid gray;

      &:focus {
        border-bottom: 1px solid orange !important;
      }
      &::placeholder {
        color: gray;
      }

      option:not(:first-child) {
        background-color: #424242;
        color: #fff;
      }

    }
    .container-button {
      gap: 10px;
      display: flex;
      width: 100%;
    }

    .optionRadio {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }

   
  }
`;
const CardRegister = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  background-color: #363636;
  padding: 30px;
  border-radius: 8px;
  gap: 10px;
`;
const ButtonStyle = styled(Button)`
  background-color: green;
  padding: 5px;
  font-size: 1rem;
`;

export { CardRegister, ContainerItens, ButtonStyle };
