import React, { useContext, useState, useCallback, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import ShowReviews from '../components/ShowReviews'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import s from '../components/styles/formTalk.module.css'

export function AddReview() {

    const { token } = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [review, setReview] = useState([])
    const [reviewText, setReviewText] = useState("");
    const [message,setMessage]=useState("");

    const getReview = useCallback(async () => {
        try {
            const fetched = await request(`/api/review/getById`, 'GET', null,
                {
                    Authorization: `Bearer ${token}`
                })
            setReview(fetched)
        } catch (error) {

        }
    }, [token, request])

    useEffect(() => {
        getReview()
    }, [getReview,message])


    if (loading) {
        return <Loader />
    }

    const handleSave = async (event) => {
        event.preventDefault();
        try {
            const data = await request('/api/review/createReview', 'POST', { reviewText: reviewText }, {
                Authorization: `Bearer ${token}`
            })
            setMessage(data.message);
            setReviewText('');
        } catch (error) {
        }
    }

    return (
        <Container className={s.container} style = {{marginTop:'2%'}}>
            <Row>
                <Col>
                    <Form className={s.form}>
                        <h3>Enter review</h3>
                        <Form.Group>
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" placeholder="enter review" value={reviewText} onChange={e => setReviewText(e.target.value)} />
                        </Form.Group>
                        <Button type="submit"  onClick={handleSave}>Сохранить</Button>
                    </Form>
                </Col>
                <Col>
                    {!loading && review.length && <ShowReviews revs={review} />}
                    {!loading && !review.length && <p>Have no reviews</p>}
                </Col>
            </Row>
        </Container>
    )
}
