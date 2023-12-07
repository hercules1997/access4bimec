import styled, { keyframes } from "styled-components";
import { Button } from "../../../components";
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
  padding: 80px 40px;


`;
export const InputStyle = styled.input`
  width: 90%;
  height: 30px;
  background-color: ${colors.border};
  padding: 20px;
  color: ${colors.light};
  border: none;
  border-radius: 8px;

  &:focus {
    outline: ${colors.text};
  }
`;
export const ButtonStyle = styled(Button)`
  margin: 0;
  position: absolute;
  right: 30px;
  width: 40px;
  background: transparent;
  height: 35px;
`;



export const ButtonRegisterVisit = styled(Button)`
 
  border: none;
  border-radius: 8px;
  width: 120px;
  padding: 2px;
  opacity: 0.7;
  font-size: 12px;
  margin: 0;
  margin-left: 6px;
  cursor: pointer;
  color: ${colors.light};

  &:hover {
    opacity: 1;
  }



`;

export const ContainerList = styled.div`
  border: 1px solid #404040;
  padding: 10px;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 15px;
  background: #404040;
  box-shadow: 0px 0px 2px #d6d6ba;
  transition: top 2s ease;
  animation: ${fadeIn} 1s ease;

  .menu {
    display: none;
    animation: ${fadeIn} 1s ease;
    transition: top 2s ease;
  }
  .menu.open {
    display: flex;
    animation: ${fadeIn} 1s ease;
    transition: top 2s ease;
    top: 0;
  }
`;
export const ContainerSearch = styled.div`
  border: 1px solid ${colors.border};
  padding: 20px;
  border-radius: 8px;
  width: calc(100% - 350px);
  margin-bottom: 15px;

  background-color: #404040;
  box-shadow: 0px 0px 5px ${colors.black};
  transition: top 2s ease;
  position: fixed;
  top: 4px;
  animation: ${fadeIn} 1s ease;
`;
export const List = styled.div`
  width: 100%;
  display: flex;
  transition: 2s;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const FormSearch = styled.form`
  width: 100%;
  display: flex;

  transition: 2s;
  align-items: center;
  justify-content: space-between;
  text-align: center;

  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-items: center;
    justify-self: center;
    width: 100%;
    position: relative;
    height: 15px;
  }
`;
export const Image = styled.div`
  display: flex;
  width: 7%;
  img {
    width: 60px;
    border-radius: 10%;
  }
`;
export const Description = styled.div`
  width: 53%;
  color: ${colors.light};
  display: flexbox;
  justify-content: center;
  text-align: start;
  padding-left: 20px;
`;
export const Date = styled.div`
  width: 30%;
  color: ${colors.light};
  display: flexbox;
  justify-content: center;
  align-items: center;
`;
export const ButtonFinaly = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    color: ${colors.light};
    background: transparent;
    border: none;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: 1s;

    &:hover {
      color: ${colors.text};
    }
    &:active {
      opacity: 0.5;
    }
  }
`;

export const CardListPeople = styled.div`
  width: 50%;
  display: flex;
  color: ${colors.light};

  flex-direction: column;
  transition: 2s;
  div {
    display: flex;
    margin-top: 5px;
  }
`;
export const LabelList = styled.label`
  color: ${colors.hover};
  font-weight: bold;
`;
export const InforList = styled.p`
  padding-left: 15px;

`;
export const CardHistory = styled.div`
  width: 50%;
  border-left: 0.3px solid ${colors.border};
  color: ${colors.info};
  padding: 5px;
  display: flex;
  flex-direction: column;

  input {
    background: transparent;
    margin: 10px 40px;
    border: none;
    border-bottom: 0.5px solid ${colors.info};
text-align: center;
    width: 120px;
    padding: 5px;
    color: ${colors.light};
    outline: none;
    &:focus {
      border-bottom: 1px solid ${colors.text};
    }
  }

  span {
    font-weight: bold;
    text-align: center;
    align-items: center;
    color: ${colors.text};
    margin-bottom: 15px;
    justify-content: center;
    border-bottom: 1px solid ${colors.info};
  }

  p {
    color: ${colors.light};
    padding-left: 15px;
    margin-top: 5px;

    font-style: italic;
  }

  .searchdata {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .headerHistory {
    display: flex;
    width: 100%;

    justify-content: space-around;
  }

  ul {
    display: flex;
    width: 100%;
  }
  li {
    display: flex;
    justify-content: space-around;
    .infoLeft {
      border: none;
      display: flex;
      justify-content: start;
    }
    .infoRight {
      border: none;
    }
    padding: 5px;
    border: 1px solid gray;
    width: 100%;
    p {
      justify-content: center;
      align-items: center;
    }

    span {
      display: flex;
    }

    .div {
      display: flex;
      flex-direction: column;
      width: 50%;
      /* display: flex;
      width: 1px; */

      /* &::before {
        content: "";
        border: 1px dashed ${colors.info};
        height: 100%;
        margin-left: 20px;
      } */
    }
  }
  .rolHistory {
    overflow: auto;
    height: 140px;
    padding: 5px;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background: ${colors.background};
    }

    &::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 6px;
      border: 1px solid #989898;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }
  }
`;

export const CardContainer = styled.div`
  display: flex;
  width: 100%;
  border-top: 0.3px solid ${colors.border};
  margin-top: 20px;
  transition: 1s ease;
  opacity: ${(prop) => (prop.isVisible ? "1" : "0")};
  animation: ${fadeIn} 1s ease;
`;
