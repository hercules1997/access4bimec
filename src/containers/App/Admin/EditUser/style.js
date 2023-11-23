import styled, { keyframes } from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import ReactSelect from "react-select";
import { Button } from "../../../../components";
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
  background-color: #000;
  justify-content: center;
  align-items: center;
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
  background: #0b0b0bc4;
  position: absolute;
  min-height: 100vh;
  left: 0;
  top: 0;

  z-index: 101;
  backdrop-filter: blur(4px);
  transition: right 700ms ease;
  animation: ${fadeIn} 700ms ease-in-out;

  .buttonBack {
    display: flex;
    position: absolute;
    padding: 10px;
    font-size: 2rem;
    top: 20px;
    right: 430px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    color: #fff;
    background: #000;

    &:hover {
      background: #262626;
    }
  }
`;

export const LabelTitle = styled.label`
  display: flex;
  color: #ffaa;
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
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #202020;
    padding: 50px;

    width: 800px;
    color: #ffff;
    border: 0.2px solid #404040;




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
  color: #909090;
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
