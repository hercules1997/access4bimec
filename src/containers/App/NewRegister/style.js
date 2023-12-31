import styled, { keyframes } from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import ReactSelect from "react-select";
import { Button } from "../../../components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  transition: top 2s ease;
  animation: ${fadeIn} 1s ease-in-out;


  .docUpload {
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
  }
`;

export const ContainerMaster = styled.div`
  width: 100%;
  text-align: start;

  h2 {
    margin-bottom: 50px;
    text-align: center;
    color: #fff;
  }
`;


export const LabelTitle = styled.label`
  display: flex;
color: #fff;
  left: 0;
  span {
    color: red;
    margin-left: 7px;
  }
`;
export const Cardform = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const Divisor = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;

  padding: 0;
  margin: 0;
`;
export const Items = styled.div`
  display: flex;
  padding: 40px;

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #404040;
    padding: 50px;


    width: 100%;
    color: #ffff;
    border: 0.2px solid #404040;

    .radioVehicle {
      display: flex;
      gap: 15px;
    }

    .radioVehicle > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .radioVehicle > div > input {
      margin-left: 15px;
    }
  }

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

  button {
    width: 100%;
    border: none;

    font-size: 1.4rem;
    cursor: pointer;
  }
`;

export const PersonIconStyle = styled(PersonIcon)``;


export const ButtonSubmit = styled(Button)`
  width: 650px;
  border: none;
  background: #252525;
  font-size: 1.4rem;
  cursor: pointer;

  &:hover {
    background: green;
  }
  &:active {
    opacity: 0.4 !important;
  }
`;
export const LabelUpload = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: ${(props) => (props.error ? "2px solid #FF0000" : "dashed 1px gray")};
  color: #232323;
  padding: 8px;
  width: 100%;
  gap: 3px;
  text-align: center;
  justify-content: center;
  border-radius: 8px;
  input {
    opacity: 0;
    width: 1px;
  }
`;
export const ReactSelectStyles = styled(ReactSelect)`
  color: black;
  background: black !important;

  .css-10wo9uf-option {
    background: black !important;
    outline: none;

    color: white;
  }

  .css-13cymwt-control {
    background: black;
  }
`;
