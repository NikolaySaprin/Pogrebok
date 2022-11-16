import React, { useState } from 'react';
import {
  Button, Form, Row, Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function RegistrationPage({ setCurrUser }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });
  const inputHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('/auth/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    const data = await response.json();
    if (response.ok) {
      setCurrUser(data);
      navigate('/');
    } else {
      console.log(data.message);
      setError(data.message);
    }
  };

  return (
    <>
      <Row className="mt-5">
        <Col>
          <h3 className="text-center">Путник, зарегистрируйся, пожалуйста!</h3>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mt-3">
        <Col md={6}>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-4" controlId="formBasicEmail0">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={input.name}
                onChange={inputHandler}
                placeholder="Введите имя"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicEmail1">
              <Form.Label>Email адрес</Form.Label>
              <Form.Control
                type="email"
                placeholder="Введите email"
                name="email"
                value={input.email}
                onChange={inputHandler}
              />

            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Пароль"
                name="password"
                value={input.password}
                onChange={inputHandler}
              />
            </Form.Group>
            <Button className="mt-3" variant="secondary" type="submit">
              Отправить
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}
