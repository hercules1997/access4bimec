import styled, { keyframes } from "styled-components";
import { colors } from "../../../styles/globalStyles";
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 40px;
  transition: top 2s ease-in-out;
  animation: ${fadeIn} 1s ease-in-out;
  .vazio {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80vh;

    color: #969696;
    font-size: 3rem;
  }
`;
export const ContainerList = styled.div`
  padding: 10px;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 15px;
  background: #404040;
  box-shadow: 0px 0px 2px #d6d6ba;

  .title {
    color: ${colors.hover};
    margin-bottom: 5px;
  }
`;
export const List = styled.div`
  width: 100%;
  display: flex;

  align-items: center;
  justify-content: center;
  text-align: center;
`;
export const Image = styled.div`
  display: flex;
  width: 7%;
  img {
    margin-left: 20px;
    width: 50px;
    height: 50px;
    border-radius: 10%;
  }
`;
export const Description = styled.div`
  width: 53%;
  color: ${colors.light};
  display: flexbox;
  justify-content: center;
`;

export const DateStyle = styled.div`
  width: 30%;
  color: ${colors.light};
  display: flexbox;
  justify-content: center;
  align-items: center;

  .status {
    color: #4dff00;
  }
`;
export const ButtonFinaly = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    color: ${colors.light};
    background: transparent;
    font-size: 1rem;
    color: red;
    border: dashed 1px red;
    padding: 15px 5px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
      background: #ef3030;
      color: ${colors.light};
      transition: 0.5s;
    }
    &:active {
      opacity: 0.5;
    }
  }
`;
