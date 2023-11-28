import PropTypes from 'prop-types'
import React from 'react'

import { UserProvider } from './UserContext'

// PASSANDO PROPS DAS FUNÇÕES TORNANDO ELAS DISPONIVEL PARA APLICAÇÃO TODA

const AppProvider = ({ children }) => (
  <UserProvider>
   {children}
  </UserProvider>
);

AppProvider.propTypes = {
  children: PropTypes.node
}

export default AppProvider
