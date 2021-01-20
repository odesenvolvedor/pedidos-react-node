import React from 'react';

import { Container } from './styles';

export const title = 'Início';

function Main() {
  return (
    <Container>
      <img
        src="https://www.tempotelecom.com.br/wp-content/uploads/2018/11/Tempo-AzulSVG.svg"
        height="256"
        alt="Tempo Telecom"
      />
      <h1>Olá!</h1>
      <p>Seja bem vindo ao teste de Fernando Campos de Oliveira.</p>
    </Container>
  );
}

export default Main;
