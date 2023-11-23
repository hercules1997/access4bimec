import PropTypes from "prop-types";
import React, { useState } from "react";

import paths from "../../constants";

import {
  NewRegister,
  Status,
  ListPeopleRegister,
  GenerateReport,
  Deshboard,
  RegisterVisit,
  NewUsers,
  Users,
} from "../../containers";
import { Container, ContainerItems, MenuIconStyle } from "./style";
import { SideMenu } from "../../components";
import { EditRegister } from "./EditRegister";
import { EditUser } from "./Admin/EditUser";

function App({ path }) {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <Container>
      <MenuIconStyle onClick={() => setMenuOpen(!menuOpen)}></MenuIconStyle>
      <SideMenu menuOpen={menuOpen} path={path} />

      <ContainerItems menuOpen={menuOpen}>
        {path === paths.Cadastro && <NewRegister path={paths.Cadastro} />}
        {path === paths.ListRegisters && (
          <ListPeopleRegister path={paths.ListRegisters} />
        )}
        {path === paths.RegisterOpen && (
          <RegisterVisit path={paths.RegisterOpen} />
        )}
        {path === paths.Deshboard && <Deshboard path={paths.Deshboard} />}
        {path === paths.EditRegister && (
          <EditRegister path={paths.EditRegister} />
        )}
        {path === paths.Status && <Status path={paths.Status} />}
        {path === paths.CreateUsers && <NewUsers path={paths.CreateUsers} />}
        {path === paths.Users && <Users path={paths.Status} />}
        {path === paths.EditUser && <EditUser path={paths.EditUser} />}
        {path === paths.GenerateReport && (
          <GenerateReport path={paths.GenerateReport} />
        )}
      </ContainerItems>
    </Container>
  );
}

App.propTypes = {
  path: PropTypes.string,
};

export default App;
