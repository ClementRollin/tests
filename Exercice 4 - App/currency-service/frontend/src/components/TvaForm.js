import React, { useState } from 'react';
import { calculateTTC } from '../services/api';
import { Form, Button, Card } from 'react-bootstrap';

export default function TvaForm() {
    const [ht, setHt] = useState('');
    const [taux, setTaux] = useState('20');
    const [ttc, setTtc] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await calculateTTC(ht, taux);
        setTtc(res.data.ttc);
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title>Calcul TVA</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>HT</Form.Label>
                        <Form.Control type="number" value={ht} onChange={e => setHt(e.target.value)} placeholder="Entrez HT" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Taux (%)</Form.Label>
                        <Form.Control type="number" value={taux} onChange={e => setTaux(e.target.value)} placeholder="Entrez le taux" />
                    </Form.Group>
                    <Button variant="success" type="submit" className="w-100">
                        Calculer
                    </Button>
                </Form>
                {ttc != null && <Card.Text className="mt-3">TTC: <strong>{ttc}</strong></Card.Text>}
            </Card.Body>
        </Card>
    );
}