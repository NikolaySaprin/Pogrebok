import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './auth/AuthPage';
import HomePage from './HomePage';
import MyNavBar from './MyNavBar';
import RegistrationPage from './auth/RegistrationPage';
import ProductsPage from './ProductsPage';
import OneCatPage from './OneCatPage';
import OneProdPage from './OneProdPage';

export default function App({
  user, allCats, allProducts, oneCat, oneProd
}) {
  const [currUser, setCurrUser] = useState(user || {});
  const [cats, setCats] = useState(allCats || []);
  const [products, setProducts] = useState(allProducts || []);

  const logOutHandler = () => {
    fetch('/auth/logout')
      .then(() => setCurrUser({}));
  };
  return (
    <>
      <MyNavBar currUser={currUser} logOutHandler={logOutHandler} />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage currUser={currUser} />} />
          <Route path="/auth/registration" element={<RegistrationPage setCurrUser={setCurrUser} />} />
          <Route path="/auth/authorization" element={<AuthPage setCurrUser={setCurrUser} />} />
          <Route path="/products" element={<ProductsPage cats={cats} setCats={setCats} products={products} setProducts={setProducts} oneProd={oneProd} />} />
          <Route path="/products/cats/:id" element={<OneCatPage oneCat={oneCat} setCats={setCats} />} />
          <Route path="/products/prods/:id" element={<OneProdPage oneProd={oneProd} />} />
        </Routes>
      </Container>
    </>
  );
}
