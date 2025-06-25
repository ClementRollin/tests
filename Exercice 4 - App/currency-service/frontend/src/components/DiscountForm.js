import React, { useState } from 'react';
import { applyDiscount } from '../services/api';
import { Form, Button, Card } from 'react-bootstrap';

export default function DiscountForm() {
    const [prix, setPrix] = useState('');
    const [pourcentage, setPourcentage] = useState('');
    const [finalPrice, setFinalPrice] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await applyDiscount(prix, pourcentage);
        setFinalPrice(res.data.prixFinal);
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title>Remise</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Prix</Form.Label>
                        <Form.Control type="number" value={prix} onChange={e => setPrix(e.target.value)} placeholder="Entrez le prix" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>% Remise</Form.Label>
                        <Form.Control type="number" value={pourcentage} onChange={e => setPourcentage(e.target.value)} placeholder="Pourcentage" />
                    </Form.Group>
                    <Button variant="danger" type="submit" className="w-100">
                        Appliquer
                    </Button>
                </Form>
                {finalPrice != null && <Card.Text className="mt-3">Prix final: <strong>{finalPrice}</strong></Card.Text>}
            </Card.Body>
        </Card>
    );
}