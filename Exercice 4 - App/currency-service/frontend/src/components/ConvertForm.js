import React, { useState } from 'react';
import { convertCurrency } from '../services/api';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';

// Liste des devises disponibles (limitée aux devises supportées par le backend)
const CURRENCIES = ['EUR', 'USD', 'GBP'];

export default function ConvertForm() {
    const [from, setFrom] = useState('EUR');
    const [to, setTo] = useState('USD');
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            if (!amount || amount <= 0) {
                throw new Error('Veuillez entrer un montant valide');
            }

            const res = await convertCurrency(from, to, amount);
            setResult(res.data.convertedAmount);
        } catch (err) {
            console.error('Erreur de conversion:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Erreur de connexion au serveur';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title>Conversion de devises</Card.Title>
                {error && (
                    <Alert variant="danger" className="mb-3">
                        {error}
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Montant</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            min="0"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            placeholder="Entrez le montant"
                            required
                        />
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="from">
                            <Form.Label>De</Form.Label>
                            <Form.Select
                                value={from}
                                onChange={e => setFrom(e.target.value)}
                            >
                                {CURRENCIES.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="to">
                            <Form.Label>En</Form.Label>
                            <Form.Select
                                value={to}
                                onChange={e => setTo(e.target.value)}
                            >
                                {CURRENCIES.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100"
                        disabled={loading}
                    >
                        {loading ? 'Conversion...' : 'Convertir'}
                    </Button>
                </Form>
                {result !== null && (
                    <Alert variant="success" className="mt-3">
                        <strong>{amount} {from} = {result} {to}</strong>
                    </Alert>
                )}
            </Card.Body>
        </Card>
    );
}