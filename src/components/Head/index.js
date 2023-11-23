import React from "react";

import { Header, Title, User, PersonIconStyle } from "./style";

export function Head() {
  return (
    <Header>
      <Title>4° batalhão de Infantaria Mecanizado</Title>
      <User>
        <PersonIconStyle />
        <p> Portaria</p>
      </User>
    </Header>
  );
}
