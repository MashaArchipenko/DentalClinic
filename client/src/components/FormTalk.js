import React from 'react'
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap'
import s from './styles/formTalk.module.css'

export default function FormTalk() {
    return (
        <Container className={s.contaiter}>
            <Row>
                <Col>
                <Form className={s.form}>
                    <h3>Ask manager</h3>
                    <Form.Group>
                        <Form.Label>Enter Email or phone number</Form.Label>
                        <Form.Control type="text" placeholder="Enter e-mail or phone number"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Enter u ask</Form.Label>
                        <Form.Control as="textarea" className={s.textArea}  type="text" placeholder="Enter ask"/>
                    </Form.Group>
                    <Button className={s.button} type="submit">Ok</Button>
                </Form>
                </Col>
                <Col>
                <Card className={s.card}>
                    <Card.Img />
                    <Card.Body>
                        <Card.Title>Ask Manager</Card.Title>
                        <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                             Duis fringilla at quam sed congue. Aenean a tempus metus.
                              Vestibulum finibus risus at eros maximus, et tempor augue consequat.
                               Nunc tincidunt ipsum vel ipsum pulvinar, sit amet consectetur augue ultricies.
                                Suspendisse porttitor suscipit ante, et varius mi sagittis eu. Curabitur
                                 ultricies risus ipsum, vitae euismod dolor dictum ac. In consequat eros mi,
                                  quis egestas quam tincidunt vel. Class aptent taciti sociosqu ad litora torquent
                                   per conubia nostra, per inceptos himenaeos. Nulla iaculis blandit arcu id ultrices.
                                    Donec at libero ut quam condimentum malesuada. Nulla facilisi.</Card.Text>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    )
}
