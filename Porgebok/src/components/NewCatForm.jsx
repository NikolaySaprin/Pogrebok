import React, { useState } from 'react';
import {
  Container, Row, Col, Button, Form,
} from 'react-bootstrap';

export default function NewCatForm({ setCats, showCatsHandler }) {
  const [input, setInput] = useState({});
  //   const [error, setError] = useState(null);
  const changeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandlerCat = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/v1/cats', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    const data = await response.json();
    setCats((prev) => [...prev, data]);
    setInput({});
    showCatsHandler();
  };
  return (
    <Form onSubmit={submitHandlerCat} className="mt-3 mb-4">
      <Form.Group className="mb-3" controlId="formBasicEmail0">
        <Form.Control
          name="name"
          value={input.name || ''}
          onChange={changeHandler}
          type="text"
          placeholder="Название"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail1">
        <Form.Control
          as="textarea"
          rows={3}
          name="text"
          value={input.text || ''}
          onChange={changeHandler}
          type="text"
          placeholder="Описание"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail2">
        <Form.Control
          name="img"
          value={input.img || ''}
          onChange={changeHandler}
          type="text"
          placeholder="Ссылка на картинку"
        />
        {/* <Form.Text className="text-muted">
          {error && <span className="redText">{error}</span>}
        </Form.Text> */}
      </Form.Group>
      <Button
        className="mt-1"
        variant="secondary"
        type="submit"
      >
        Добавить категорию
      </Button>
    </Form>
  );
}
