import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../styles/globalStyles";

export const ContainerMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  animation: ease-in-out;
  transition: 1s;
  width: 280px;
  left: ${(props) => (props.menuOpen ? 0 : "-200px")};

  color: white;

  border-right: 0.2px solid #4a4646;
  min-height: 100vh;
  padding: 40px 20px 50px 15px;
  background-color: #353535;
  box-shadow: 0px 0px 10px #000;
`;

export const ContainerItems = styled.div`
  margin-top: 10px;
  height: 20px;
  margin-bottom: 20px;
`;
export const ContainerLogout = styled.button`
  display: flex;
  bottom: 20px;
  width: 100%;
  background: transparent;
  border: none;
padding-right: 15px;
  font-size: 17px;

  .iconLogout {
    color: ${colors.warning};
    position: absolute;
    bottom: 12px;
    width: 90%;
  }
  .iconExit {
 
    width: 10%;
    color: ${colors.warning};
  
   
 
    transform: rotateY(180deg);
  }
`;

export const ListLink = styled(Link)`
  text-decoration: none;
  color: white;
  display: flex;
  padding: 5px 10px;
  border-radius: 4px;
  align-items: center;
  background: ${(props) => (props.isActive ? "green" : "none")};
  transition: 0ms.5;
 justify-content: space-between;
  .icon {

  }

  &:hover {
    transition: 0.5s;
    color: #999;
    border: 0.3px solid #555;
  }
`;
