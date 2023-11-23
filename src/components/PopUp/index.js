import React from "react";
import { ContainerPopUp, CardPopUp } from "./style.js";
export const PopUp = ({ isOpen, onConfirm, onCancel, ...rest }) => {
  if (!isOpen) return null;

  return (
    <ContainerPopUp className="popup">
      <CardPopUp className="popup-content">
        <h3>ATENÇÃO!</h3>
        <p>
          Deseja finaliza a visita?
          <span> *Verifique se foi entregue o crachá!*</span>
        </p>
        <span>
          <button onClick={onCancel}>Não</button>
          <button {...rest} onClick={onConfirm}>
            Sim
          </button>
        </span>
      </CardPopUp>
    </ContainerPopUp>
  );
};
