import styled from 'styled-components'

export const CardHistoryStyle = styled.div`
  width: 50%;
  border-left: 0.3px solid #555;
  color: #909090;
  padding: 5px;
  display: flex;
  flex-direction: column;

  input {
    background: transparent;
    margin: 10px 40px;
    border: 0.5px solid gray;
    border-radius: 5px;

    padding: 5px;
    color: #fff;
    outline: none;

    &:focus {
      background: #565656;
    }
  }

  span {
    font-weight: bold;
    text-align: center;
    align-items: center;
    color: orange;
    margin-bottom: 15px;
    justify-content: center;
    border-bottom: 1px solid gray;
  }

  p {
    color: #fff;
    padding-left: 15px;
    margin-top: 5px;

    font-style: italic;
  }

  .headerHistory {
    display: flex;
    width: 100%;

    justify-content: space-around;
  }
  li {
    display: flex;
    justify-content: space-around;

    p {
      width: 100% !important;
    }

    span {
      display: flex;
      width: 100%;
    }

    .traco {
      display: flex;
      width: 1px;

      &::before {
        content: "";
        border: 1px dashed gray;
        height: 100%;
        margin-left: 20px;
      }
    }
  }
  .rolHistory {
    overflow: auto;
    height: 200px;
    padding: 5px;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #565656;
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
`
