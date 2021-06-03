import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import s from './style/about.module.css'
import img from './img/image1.jpg'

export const News = () => {
    return (
        <Container>
            <Row>
                <Col  className={s.col}> <img src={img} alt="picturee" className={s.image} /></Col>
                <Col  className={s.col}>
                    <h2>День донора</h2>
                    Nam interdum feugiat placerat. Nullam id sollicitudin mi,
                    vitae ultricies dui. Phasellus gravida laoreet lacinia.
                    Praesent aliquam finibus velit non tincidunt. Interdum
                    et malesuada fames ac ante ipsum primis in faucibus.
                    Sed aliquet venenatis nisi sit amet accumsan. Vivamus
                    sodales elementum laoreet. Nulla fringilla cursus sapien,
                    at convallis ipsum scelerisque ut. Nulla imperdiet lobortis auctor.
                    Donec a risus quis massa luctus porttitor quis ut ante. Nam maximus
                    enim sapien, in consectetur elit maximus a. Nunc ante velit, dapibus
                    id nunc at, molestie sagittis ipsum. Vestibulum sollicitudin convallis ex vel mollis.
                </Col>
            </Row>
        </Container>
    )
}
