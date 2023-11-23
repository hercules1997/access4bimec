import styled from "styled-components";
import { SideMenu } from "../../components";
 import MenuIcon from "@mui/icons-material/Menu";

export const Container = styled.div`
  background: #555;
  width: 100%;
  display: flex;
`;
export const SideMenuStyle = styled(SideMenu)`
  width: 20%;
  position: fixed;
  left: ${(props) => (props.menuOpen ? 0 : "-200px")};
`;
export const ContainerItems = styled.div`
  display: flex;
  animation: ease-in-out;
  transition: 1s;
  width: 100%;
  margin-left: ${(props) => (props.menuOpen ? "20%" : "60px")};
`;
 export const MenuIconStyle = styled(MenuIcon)`
   position: fixed;
   background-color: #404040;
   font-size: 3rem !important;
   border-radius: 8px;
   color: #fff;
   padding: 10px;
   z-index: 100 !important;
   cursor: pointer;
   left: ${(props) => (props.menuOpen ? 0 : "15px")};
   top: 5px;

   &:hover {
     background-color: #565656;
   }
 `;