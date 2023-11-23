import styled from "styled-components";
import { Background } from "../../../components/Background";
import { Button } from "../../../components";
import { colors } from "../../../styles/globalStyles";

export const All = styled.div`
  display: flex;
  padding: 10px 40px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: #000;

  span {
    color: #ffff;
    padding-top: 20px;
  }
`;
export const ContainerMaster = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  /* box-shadow: 0 0 58px #606060; */
  border-radius: 18px;
  @media (max-width: 1030px) {
    display: flex;
    flex-direction: column;
  }
`;

export const ContainerBlock = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 800px) {
    display: block;
  }
`;

export const ButtonStyle = styled(Button)`
  background: green;
  justify-content: center;
  width: 50% ;
  align-items: center;
  text-align: center;
  font-size: 1rem;
  padding: 2px 10px;
  /* max-width: min-content; */
`;

export const BackgroundStyle = styled(Background)``;
export const ContainerItens = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #fff;

  justify-content: center;
  text-align: center;
  align-items: center;
  border-radius: 22px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding: 20px;
    gap: 5px;

    h2,
    h3 {
      color: ${colors.light};
      margin-bottom: 10px;
    }

    div {
      width: 70% !important;
      display: flex;

      input {
        margin: 5px 0px 10px 0px;
        border: none;
        border-bottom: 1px solid gray;
        outline: none;
        padding: 10px;
        line-height: 12px;
        font-size: 1rem;
        width: 100%;
        background: transparent;
        color: #909090;

        &:focus {
          border-bottom: 1px solid orange !important;
        }
      }

      @media (max-width: 1030px) {
        margin-top: 5px;
        padding: 0px;
      }
    }
  }
`;
export const Label = styled.label`
  text-align: start;
  width: 10%;
  font-weight: 700;
`;
export const BlockAccess = styled.div`
  display: flex;
  flex-direction: column;

  div {
    flex-direction: column;
    align-items: start;
  }
`;
export const Input = styled.input`
  margin: 15px;
  border: solid 0.5px #505050;
  color: #ffff;
  padding: 10px;
  background-color: #555555;
  box-shadow: 0 0 5px #202020;
  border-radius: 8px;
  outline: none;

  &::placeholder {
    color: #a9a9a9;
    font-style: italic;
  }
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &:focus {
    border: 1px solid #f0ae10;
    background: #a8a8a8;
    color: #202020;
  }
  width: 90%;
  border: ${(props) => (props.error ? "2px solid red" : "none")};
`;
