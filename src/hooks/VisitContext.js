 // Importando os módulos
 import PropTypes from "prop-types";
 import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getVisits,
  getVisitsRegisters,
  getVisitStatus,
  getUsers,
} from "../services/getData";
 // Variável para receber a criação do contexto
 const VisitContext = createContext({});

//  Função do contexto
 export const VisitProvider = ({ children }) => {
   const [visits, setVisits] = useState([]);
   const [visitsRegisters, setVisitsRegisters] = useState([]);
   const [visitStatus, setVisitStatus] = useState([]);
   const [usuario, setUsuario] = useState([]);

  //  Função para atualizar o localStorage
  

  //  Função dentro do useEffect para carregar o localStorage quando sofrer alteração
   useEffect(() => {
     async function getAllData() {
        Promise.all([
          getVisits(),
          getVisitsRegisters(),
          getVisitStatus(),
          getUsers(),
        ])
          .then(
            ([visits, visitsRegisters, status, usuario]) => {
              setVisits(visits);
              setVisitsRegisters(visitsRegisters);
              setVisitStatus(status);
              setUsuario(usuario);
            }
          )
          .catch((error) => console.error(error));
     };

     getAllData();
   }, []);

    //Retorno do contexto
   return (
     <VisitContext.Provider
       value={{
         visits,
         visitsRegisters,
         visitStatus,
         usuario,
         setVisitStatus,
         setUsuario,
         setVisits,

       }}
     >
       {children}
     </VisitContext.Provider>
   );
 };

 // Exportando o contexto
 export const useVisits = () => {
   const context = useContext(VisitContext);
   if (!context) {
     throw new Error("useVisits must be used with Visitscontext");
   }
   return context;
 };

//  Prototipando o children
 VisitProvider.propTypes = {
   children: PropTypes.node,
 };
