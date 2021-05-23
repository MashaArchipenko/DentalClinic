import {useContext} from 'react'
import { Container, Col, Card, Row } from "react-bootstrap";
import { Link } from 'react-router-dom'
import s from './style/showDoctor.module.css'
import first from './personalImg/doctor.jpg'
import second from './personalImg/Male.jpg'
import third from './personalImg/man.jpg'
import fourth from './personalImg/women.jpg'
import { AuthContext } from '../context/AuthContext'


export default function ShowDoctor({ revs }) {
    
    const { isAuthenticated } = useContext(AuthContext)

    const listItems = revs.map(item => {
        let img = fourth;
        switch (item.name) {
            case "Pasha Ivanov":
                img = first;
                break;
            case "Oleg":
                img = second;
                break;
            case "Alex Svift":
                img = third;
                break;
            default:
                break;
        }
        return (
            <Col>
                <Card className={s.card}>
                    <Card.Img variant="top" src={img} />
                    <Card.Body>
                        <Card.Title>
                            {item.name}
                        </Card.Title>
                        <Card.Text>
                            {item.info}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer> Byrthday: {new Date(item.birthday).toLocaleDateString()}
                    </Card.Footer>
                    {isAuthenticated && <Link to= {`/appointment/${item.userId}`} className="btn btn-primary stretched-link">Зписаться на прием</Link>}
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