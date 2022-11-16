import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Button, Form,
} from 'react-bootstrap';
import NewCatForm from './NewCatForm';
import NewProductForm from './NewProductForm';
import OneCatCard from './OneCatCard';
import OneProdCard from './OneProdCard';

export default function ProductsPage({
  cats, setCats, products, setProducts, oneProd,
}) {
  const [showCatsForm, setShowCatsForm] = useState(false);
  const [showProductsForm, setShowProductsForm] = useState(false);
  const showCatsHandler = () => {
    setShowCatsForm(!showCatsForm);
  };



  const showProductsHandler = () => {
    setShowProductsForm(!showProductsForm);
  };

  // костыль
  const clearFilerHandler = async () => {
    const response = await fetch('/api/v1/prods', { method: 'GET' });
    const data = await response.json();
    if (response.ok) {
      setProducts(data);
    } else {
      console.log('Something gone wrong');
    }
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

  return (
    <Container>
      <Row>
        <Col md={3} ms={3} className="text-center">
          <Row>
            <h5 className="text-center mt-3 mb-2">Категории</h5>
            <Button
              onClick={showCatsHandler}
              className="mt-2 mb-2"
              variant="secondary"
              type="button"
            >
              Создать категорию
            </Button>
            {showCatsForm && (
              <NewCatForm
                setCats={setCats}
                showCatsHandler={showCatsHandler}
              />
            )}
          </Row>
          <Row>
            <Button
              onClick={() => clearFilerHandler()} // костыль
              className="mt-2 mb-2"
              variant="secondary"
              type="button"
            >
              Все продукты
            </Button>
            {cats?.map((el) => (
              <OneCatCard
                key={el.id}
                cat={el}
                setCats={setCats}
                setProducts={setProducts}
              />
            ))}
          </Row>
        </Col>

        <Col md={9} ms={9} className="text-center">
          <Row>
            <h5 className="text-center mt-3 mb-2">Продукты</h5>
            <Button
              onClick={showProductsHandler}
              className="mt-2 mb-2"
              variant="secondary"
              type="button"
            >
              Создать продукт
            </Button>

            {showProductsForm && (
              <NewProductForm
                cats={cats}
                setCats={setCats}
                setProducts={setProducts}
                showProductsHandler={showProductsHandler}
              />
            )}
          </Row>
          <Row>
            {products?.map((el) => (
              <OneProdCard
                key={el.id}
                product={el}
                setProducts={setProducts}
              />
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
