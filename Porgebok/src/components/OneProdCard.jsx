import React, { useState } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function OneProdCard({ product, setProducts }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const deleteHandler = async (id) => {
    const response = await fetch(`/api/v1/prods/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setProducts((prev) => prev.filter((el) => el.id !== id));
      navigate('/products');
    } else {
      setError('Something gone wrong');
    }
  };

  return (
    <Col md={6}>
      <Card className="mb-2">
        <Card.Body>
          <Card.Title>{product?.name || ''}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Категория:
            {' '}
            {product?.Category?.name || 'без категории'}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Владелец :
            {' '}
            {product?.User?.name || ''}
          </Card.Subtitle>
          <Button
            // onClick={() => navigate(`/${task.id}`)}
            className="mt-2 mx-3"
            variant="secondary"
            type="button"
          >
            Подробнее/редактировать
          </Button>
          <Button
            onClick={() => deleteHandler(product.id)}
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
