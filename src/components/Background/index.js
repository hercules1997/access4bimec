/*
Componente de fundo do login e cadastro

*/

import React from "react";

import background from "../../assets/logo.png";
import { Container, Logo } from "./style";

export function Background() {
  return (
    <Container>
      <Logo src={background} />
    </Container>
  );
}
