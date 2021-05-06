import React from 'react'
import { Card } from 'react-bootstrap'
import s from './styles/Info.module.css'
import firstLogo from './img/proteseLogo1.jpg'
import secondLogo from './img/qualityLogo.jpg'
import third from './img/whiteningLogo.jpg'
import fourth from './img/bracketsLogo.jpg'
import fifth from './img/cariesLogo.jpg'
import six from './img/image 3.jpg'
import seven from './img/image 4.jpg'
import eight from './img/image 5.png'

export default function Info() {
    return (
        <div className={s.forGrid}>
            <Card className={s.gridItem}>
                <Card.Header>Header</Card.Header>
                <Card.Body>
                    <Card.Title> Card Title </Card.Title>
                    <img src={firstLogo}  alt="Logo pic"/>
                </Card.Body>
            </Card>

            <Card className={s.gridItem}>
                <Card.Header>Header</Card.Header>
                <Card.Body>
                    <Card.Title> Card Title </Card.Title>
                    <img src={secondLogo}  alt="Logo pic"/>
                </Card.Body>
            </Card>

            <Card className={s.gridItem}>
                <Card.Header>Header</Card.Header>
                <Card.Body>
                    <Card.Title> Card Title </Card.Title>
                    <img src={third}  alt="Logo pic"/>
                </Card.Body>
            </Card>

            <Card className={s.gridItem}>
                <Card.Header>Header</Card.Header>
                <Card.Body>
                    <Card.Title> Card Title </Card.Title>
                    <img src={fourth}  alt="Logo pic"/>
                </Card.Body>
            </Card>

            <Card className={s.gridItem}>
                <Card.Header>Header</Card.Header>
                <Card.Body>
                    <Card.Title> Card Title </Card.Title>
                    <img src={fifth}  alt="Logo pic"/>

                </Card.Body>
            </Card>

            <Card className={s.gridItem}>
                <Card.Header>Header</Card.Header>
                <Card.Body>
                    <Card.Title> Card Title </Card.Title>
                    <img src={six}  alt="Logo pic"/>
                </Card.Body>
            </Card>
        </ div>
    )
}
