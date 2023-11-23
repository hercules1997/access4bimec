import styled from 'styled-components'

const ComponentButton = styled.button`
  background-color: #fa9600;
  height: 45px;

  margin-top: 20px;
  font-size: 1.5rem;
  font-weight: 700;

  outline: none;
  border: none;
  border-radius: 6px;
  color: white;

  cursor: pointer;
  /* box-shadow: 0px 12px 35px black; */

  &:hover {
    background-color: #ffb000;
  }

  &:active {
    opacity: 0.6;
  }

`
export { ComponentButton }