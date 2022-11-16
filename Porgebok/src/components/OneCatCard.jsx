import React, { useState } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function OneCatCard({ cat, setCats, setProducts }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const deleteHandler = async (id) => {
    const response = await fetch(`/api/v1/cats/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setCats((prev) => prev.filter((el) => el.id !== id)); // все категории не путай Гошан!
      navigate('/products');
    } else {
      setError('Something gone wrong');
    }
  };

  const filterHandler = async (id) => {
    const response = await fetch(`/api/v1/gagaga/${id}`, { method: 'GET' });
    const data = await response.json();
    if (response.ok) {
      setProducts(data);
    } else {
      setError('Something gone wrong');
    }
  };

  return (
    <Col>
      <Card className="mb-2">
        <Card.Body>
          {/* <Card.Title>{cat.name}</Card.Title> */}
          {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
          <Button
            onClick={() => filterHandler(cat.id)}
            className="mt-2 mx-3"
            variant="secondary"
            type="button"
          >
            Показать все
            {' '}
            {cat.name || ''}
          </Button>
          <Button
            onClick={() => navigate(`/products/cats/${cat.id}`)}
            className="mt-2 mx-3"
            variant="secondary"
            type="button"
          >
            Подробнее/редактировать
          </Button>
          <Button
            onClick={() => deleteHandler(cat.id)}
            className="mt-2 mx-3"
            variant="danger"
            type="button"
          >
            Удалить
          </Button>
        </Card.Body>
        {error}
      </Card>

    </Col>

  );
}
