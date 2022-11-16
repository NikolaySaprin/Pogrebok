import React, { useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export default function OneCatPage({ oneCat, setCats }) {
  const [cat, setCat] = useState(oneCat || {}); // одна категория
  //   const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/v1/cats/${id}`)
      .then((res) => res.json())
      .then((data) => setCat(data));
  }, []);

  const editHandler = () => {
    setEdit(!edit);
  };

  const changeHandler = (e) => {
    setCat((prev) => ({ ...prev, [e.target.name]: e.target.value })); // одну меняем
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(`/api/v1/cats/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(cat),
    })
      .then(() => {
        navigate('/products');
      })
      .catch(console.log);
  };
  return (

    <Card className="mb-2">
      {edit ? (
        <Form onSubmit={submitHandler} className="mt-3 mb-4">
          <Form.Group className="mb-3" controlId="formBasicEmail0">
            <Form.Control
              name="name"
              value={cat.name || ''}
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
              value={cat.text || ''}
              onChange={changeHandler}
              type="text"
              placeholder="Описание"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail2">
            <Form.Control
              name="img"
              value={cat.img || ''}
              onChange={changeHandler}
              type="text"
              placeholder="Ссылка на картинку"
            />
          </Form.Group>
          <Button
            className="mt-1"
            variant="secondary"
            type="submit"
          >
            Готово
          </Button>
        </Form>

      ) : (
        <>
          <Card.Img variant="top" src={cat?.img} />
          <Card.Body>
            <Card.Title>{cat?.name}</Card.Title>
            <Card.Text>{cat?.text}</Card.Text>
            <Button
              onClick={editHandler}
              className="mt-2 mx-3"
              variant="secondary"
              type="button"
            >
              Редактировать
            </Button>
          </Card.Body>
        </>
      ) }

    </Card>
  );
}
