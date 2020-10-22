import React, { useState, useContext } from 'react';
import logo from './../static/img/logo.jpg';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarText
} from 'reactstrap';
import UserContext from './../context/UserContext';
import AuthService from './../services/AuthService';

const Menu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    setUser(null);
    AuthService.signOut();
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo" className="auto_img" />
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link className="nav-link" to="/dashboards">Dashboards</Link>
            </NavItem>
            {user ? 
            <NavItem>
              <Link className="nav-link" to="/dashboards" onClick={logout}>Logout</Link>
            </NavItem>: null}
          </Nav>
          <NavbarText>Domo Embed Demo</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Menu;