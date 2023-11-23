import styled, { keyframes } from "styled-components";
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
export const Container = styled.div`
  width: calc(100vw - 400px);
  display: flex;
  min-height: 100vh;
`;
export const ContainerList = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;
  margin-left: 2%;
  width: 100%;

  transition: top 2s ease;
  animation: ${fadeIn} 2s ease-in-out;

  .resultFinal {
    display: flex;
    justify-content: space-around;
    color: #fff;
    text-align: center;
    gap: 10px;
    span {
      background: #353535;
      padding: 8px 30px;
      width: 100%;
    }
  }

  .resultFinal > span > p:last-child {
    color: orange;
  }
`;
