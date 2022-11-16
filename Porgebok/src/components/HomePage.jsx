import React from 'react';
import { Container } from 'react-bootstrap';

export default function HomePage({ currUser }) {
  return (
    <Container>
      <h2 className="text-center mt-5 mb-2">Добро пожаловать в уютный погребок.</h2>
      {currUser.id ? (
        <h3 className="text-center mt-5 mb-2">
          Приятного дня,
          {' '}
          {currUser.name}
          .
        </h3>
      ) : (
        <h3 className="text-center mt-5 mb-2">Зарегистрируйтесь или авторизируйтесь, чтобы начать пользоваться сервисом.</h3>)}
    </Container>
  );
}
