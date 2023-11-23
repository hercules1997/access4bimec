import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
        
    }`;

export const colors = {
  background: "#505050",
  text: "#F1AB21",
  black: "#000",
  secondary: " #d6d6ba",
  success: "#28a745",
  error: "red",
  warning: "#FECC00",
  info: "#808080",
  light: "#ffff",
  button: "#303030",
  dark: "#000",
  hover: "#909090",
  border: "#555555",
};
