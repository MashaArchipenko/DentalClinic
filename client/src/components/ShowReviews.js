import { Card, Container } from "react-bootstrap";
import s from './styles/review.module.css'

export default function ShowReviews({ revs }) {

    const listItems = revs.map(item => {
        return (
            <Card className={s.review}>
                <Card.Header key={new Date(item.date).toLocaleDateString()}>{new Date(item.date).toLocaleDateString()}</Card.Header>
                <Card.Body key={item.reviewText}>{item.reviewText}</Card.Body>
            </Card>)
    })

    return <Container>{listItems}</Container>
}
