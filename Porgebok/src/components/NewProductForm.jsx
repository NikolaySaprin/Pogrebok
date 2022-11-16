import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Button, Form,
} from 'react-bootstrap';

export default function NewProductForm({
  setProducts, showProductsHandler, cats, setCats,
}) {
  const [input, setInput] = useState({});
  //   const [error, setError] = useState(null);
  const changeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    fetch('/api/v1/cats')
      .then((res) => res.json())
      .then((data) => setCats(data))
      .catch((err) => console.log(err));

    fetch('/api/v1/prods')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const submitHandlerProd = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/v1/prods', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    const data = await response.json();
    setProducts((prev) => [...prev, data]);
    setInput({});
    showProductsHandler();
  };
  return (
    <Form onSubmit={submitHandlerProd} className="mt-3 mb-4">
      <Form.Group className="mb-3">
        <Form.Select name="category_id" onChange={(e) => setInput((prev) => ({ ...prev, category_id: e.target.value }))}>
          <option> Выберите категорию</option>
          {cats?.map((el) => (
            <option value={el.id} key={el.id}>
              {el.name}
              {' '}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

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
        Добавить продукт
      </Button>
    </Form>
  );
}
