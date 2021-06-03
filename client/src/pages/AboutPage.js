import { Container, Row, Col } from 'react-bootstrap'
import clinic from './img/clinic.jpg'
import person from './img/person.jpeg'
import s from './style/about.module.css'


export const AboutPage = () => {
    return (
        <Container>
            <Row>
                <Col className={s.col}><img src={clinic} alt="picturee" className={s.image} /></Col>
                <Col className={s.col}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop publishin</Col>
            </Row>
            <Row>
                <Col className={s.col}>Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Integer tristique,
                est suscipit tincidunt dignissim, tortor sem sagittis elit,
                mollis luctus justo risus eu diam. Nulla efficitur vitae nulla ut malesuada.
                Duis scelerisque consectetur nibh, at mollis arcu tristique quis.
                Mauris lacinia libero velit, eget faucibus leo volutpat vitae.
                Nullam iaculis pellentesque augue, vitae varius magna dictum ut.
     Curabitur vestibulum feugiat purus quis cursus. In hac habitasse platea dictumst.</Col>
                <Col className={s.col}><img src={person} alt="picturee" className={s.image} /></Col>
            </Row>
        </Container>
    )
}
