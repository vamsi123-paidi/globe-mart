import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Cart } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios'; // Axios for API requests
import "../model.css";

const categories = [
  'Beauty', 'Fragrances', 'Furniture', 'Groceries',
  'Laptops', 'Motorcycle', 'Smartphones',
  'Sunglasses', 'Tablets', 'Tops', 'Vehicle'
];

const Navbarcomponent = () => {
  const cart = useSelector((state) => state.products.cart);
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  // Modal state
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // User login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle show/hide of modals
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  // Check if the user is logged in by verifying the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    // Check if email and password are not empty
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      // Sending a POST request to the backend API
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      // Handle success (store token, update state, etc.)
      console.log(response.data);
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      setIsLoggedIn(true);
      alert("Login successful");

      handleCloseLogin(); // Close the login modal

    } catch (error) {
      if (error.response) {
        console.error('Login error:', error.response.data);  // Log detailed error from server
        alert(error.response.data);  // Show error message to user
      } else {
        console.error('Request error:', error.message);  // Log error if no response is received
        alert('An error occurred during login.');
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password
      });
      alert('Registration successful');
      handleCloseRegister(); // Close the register modal
    } catch (error) {
      if (error.response && error.response.data === 'User already exists') {
        alert('This email is already registered. Please try a different one.');
      } else {
        console.error('Registration error:', error);
        alert('An error occurred during registration.');
      }
    }
  };

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false);
    alert('Logged out successfully');
  };

  return (
    <>
      <Navbar expand="lg" className="bg-light text-dark mb-3 fixed-top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className='text-dark'>Babai Shopping</Navbar.Brand>
          <div className="d-flex justify-content-end">
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
          </div>
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            className="bg-light text-dark"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/" className="text-dark">Home</Nav.Link>
                <NavDropdown title="Categories" id="navbarScrollingDropdown" className="dropdown-title">
                  {categories.map((category) => (
                    <NavDropdown.Item
                      as={Link}
                      key={category}
                      to={`/products/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-dark"
                    >
                      {category}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
                <Nav.Link as={Link} to='/cart' className="position-relative text-dark">
                  <Cart size={24} aria-label="Cart" />
                  {totalItemsInCart > 0 && ( 
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalItemsInCart}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  )}
                </Nav.Link>

                {/* Conditionally render Login/Logout links */}
                {isLoggedIn ? (
                  <Nav.Link onClick={handleLogout} className="text-dark">Logout</Nav.Link>
                ) : (
                  <>
                    <Nav.Link onClick={handleShowLogin} className="text-dark">Login</Nav.Link>
                    <Nav.Link onClick={handleShowRegister} className="text-dark">Register</Nav.Link>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* Login Modal */}
      <Modal show={showLogin} onHide={handleCloseLogin} className="custom-modal">
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal-body">
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                className="custom-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                className="custom-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="custom-button">
              Login
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="custom-modal-footer">
          <Button variant="secondary" onClick={handleCloseLogin} className="custom-button">
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Register Modal */}
      <Modal show={showRegister} onHide={handleCloseRegister} className="custom-modal">
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal-body">
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                className="custom-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                className="custom-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Confirm password" 
                className="custom-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="custom-button">
              Register
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="custom-modal-footer">
          <Button variant="secondary" onClick={handleCloseRegister} className="custom-button">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbarcomponent;
