import { Card, Container } from "react-bootstrap";

export default function ShowReviews({ revs }) {

    const listItems = revs.map(item => {
        return (
            <Card style={{ color: 'white' }}>
                <Card.Header key={new Date(item.date).toLocaleDateString()}>{new Date(item.date).toLocaleDateString()}</Card.Header>
                <Card.Body key={item.reviewText}>{item.reviewText}</Card.Body>
            </Card>)
    })

    return <Container>{listItems}</Container>
}
