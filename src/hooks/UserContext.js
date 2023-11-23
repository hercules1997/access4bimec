import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  // Grava dados do usuário no localStorange
  const putUserData = async (userInfo) => {
    setUserData(userInfo);
    await localStorage.setItem("acesso4bimec:users", JSON.stringify(userInfo));
  };

  // Remove dados do usuário no localStorange
  const logout = async () => {
    await localStorage.removeItem("acesso4bimec:users");
  };

  // Recupera dados do do usuário no localStorange
  useEffect(() => {
    const loadUserData = async () => {
      const clientInfo = await localStorage.getItem("acesso4bimec:users");

      if (clientInfo) {
        setUserData(JSON.parse(clientInfo));
      }
    };
    loadUserData();
  }, []);

  return (
    <UserContext.Provider value={{ putUserData, userData, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// EXPORTAÇÃO DAS FUNÇÕES
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used with Usercontext");
  }

  return context;
};

// VALIDAÇÃO DO PROPTYPES
UserProvider.propTypes = {
  children: PropTypes.node,
};
