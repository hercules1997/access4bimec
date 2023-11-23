import styled, { keyframes } from "styled-components";
import { Button } from "../../../components";
import DatePicker from "react-datepicker";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const ContainerItens = styled.div`
  width: 100%;
  min-height: 100vh;
  align-items: center;
  display: flex;
  transition: top 1s ease-in-out;
  animation: ${fadeIn} 1s ease-in-out;

  justify-content: center;

  color: #ffffff;
`;
const CardRegister = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  background-color: #353535;
  padding: 30px;
  border-radius: 8px;
  gap: 10px;

  tbody,
  thead,
  td,
  tr {
    width: 100%;
    justify-content: center;
    text-align: center;
    padding: 1px;
  }

  tbody,
  thead {
    background: #969696;
    color: #000;
  }

  th,
  td {
    color: #000;
    padding: 3px;
  }

  .container-filter {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  .header-report {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .header-report > p:last-child {
    color: orange;
  }

  .table-container {
    text-align: center;
  }

  .pdf-table {
    margin: 0 auto;
    border: 1px solid #000;
  }

  button {
    padding: 5px;
    margin-top: 5px;
  }
`;
const ButtonStyle = styled(Button)`
  padding: 3px;
  justify-content: right;
  width: 100px;
  height: 30px;
  font-size: 1rem;
  float: right;
`;
const DatePickerStyle = styled(DatePicker)`
  padding: 5px;
  background: transparent;
  justify-content: center;
  border: none;
  border-bottom: 1px solid gray;
  width: 100%;
  outline: none;
  text-align: center;
  font-size: 1rem;
  color: #ffff;

  &:focus {
    border-bottom: 1px solid orange;
  }
`;

export { CardRegister, ContainerItens, ButtonStyle, DatePickerStyle };
