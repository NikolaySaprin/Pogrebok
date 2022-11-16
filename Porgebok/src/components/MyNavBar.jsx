import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Button, Nav, Navbar, Container,
} from 'react-bootstrap';

export default function MyNavBar({ currUser, logOutHandler }) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Погребок</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">Домой</NavLink>
            <Nav className="me-auto">
              {currUser.id
                ? (
                  <>
                    <NavLink className="nav-link" to="/products">Все продукты</NavLink>
                    <Nav.Link className="active">
                      <span>
                        Привет,
                        {' '}
                        {currUser.name}
                      </span>
                    </Nav.Link>
                    <Nav className="pipe-separate mgL t-light-green left">
                      <Button className="nav-link" onClick={logOutHandler} variant="link">
                        Выйти
                      </Button>
                    </Nav>

                  </>
                )
                : (
                  <>
                    <Nav className="pipe-separate t-light-green left"><NavLink className="nav-link" to="/auth/registration">Регистрация</NavLink></Nav>
                    <Nav className="pipe-separate t-light-green left"><NavLink className="nav-link" to="/auth/authorization">Войти</NavLink></Nav>
                  </>
                )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
