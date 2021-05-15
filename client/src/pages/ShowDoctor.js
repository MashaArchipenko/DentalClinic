import { Container, Col, Card, Row } from "react-bootstrap";
import { Link } from 'react-router-dom'
import s from './style/showDoctor.module.css'

export default function ShowDoctor({ revs }) {

    const listItems = revs.map(item => {
        return (
            <Col>
                <Card className={s.card}>
                    <Card.Title>
                        {item.name}
                    </Card.Title>
                    <Card.Text>
                        {item.info}
                    </Card.Text>
                <Card.Footer> Byrthday: {new Date(item.birthday).toLocaleDateString()}
                </Card.Footer>
                <Link to="/" className="btn btn-primary stretched-link">Зписаться на прием</Link>
               </Card>
            </Col>
        )
    })

    const createGrid = () => {
        let resultArray = [];

        if (listItems.length < 4) {
            return <Row>{listItems}</Row>
        }

        while (listItems.length > 3) {
            resultArray.push(listItems.splice(0, 3))
        }

        resultArray.push(listItems);

        let array = resultArray.map(i => {
            return <Row>{i}</Row>
        })
        console.log(resultArray)
        return array;
    }

    return <Container>
        {createGrid()}
    </Container>
}