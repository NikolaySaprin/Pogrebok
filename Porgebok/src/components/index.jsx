import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const container = document.getElementById('root');

ReactDOMClient.hydrateRoot(
  container,
  <BrowserRouter>
    <App {...window.initState} />
  </BrowserRouter>,
);
