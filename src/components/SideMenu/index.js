/* eslint-disable jsx-a11y/alt-text */
import { LogoutOutlined } from "@mui/icons-material";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";

import paths from "../../constants/index";
import { useUser } from "../../hooks/UserContext";
import listLinks from "./menu-list";
import {
  ContainerItems,
  ContainerMenu,
  ListLink,
  ContainerLogout,
} from "./style";
import { Logo } from "../Logo";

export function SideMenu({ path, menuOpen }) {
  const { logout, userData } = useUser();
  const navigate = useNavigate();

  return (
    <ContainerMenu menuOpen={menuOpen}>
      <Logo />

      <hr></hr>
      {listLinks.map(
        (item) =>
          (userData.admin && userData.s2 || !item.adminOnly  && !item.s2 ) && (
            <ContainerItems key={item.id}>
              <ListLink to={item.link} isActive={path === item.link}>
                {item.label}
                <item.icon className="icon" to={item.link} />
              </ListLink>
            </ContainerItems>
          )
      )}
      <hr></hr>
      <ContainerLogout
        onClick={() => {
          logout();
          navigate(paths.Login);
        }}
      >
        <ListLink className="iconLogout" style={{ color: "#ffc107" }}>
          Sair
          <LogoutOutlined className="iconExit" />
        </ListLink>
      </ContainerLogout>
    </ContainerMenu>
  );
}

SideMenu.propTypes = {
  path: PropTypes.string,
};
