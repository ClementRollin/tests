import React from 'react';
import ConvertForm from './components/ConvertForm';
import TvaForm from './components/TvaForm';
import DiscountForm from './components/DiscountForm';
import { Container, Row, Col } from 'react-bootstrap';

export default function App() {
  return (
      <Container className="py-5">
        <h1 className="text-center mb-4">Currency Service UI</h1>
        <Row className="g-4">
          <Col md={4}><ConvertForm /></Col>
          <Col md={4}><TvaForm /></Col>
          <Col md={4}><DiscountForm /></Col>
        </Row>
      </Container>
  );
}