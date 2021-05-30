import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom'

export const AddCardInfo = () => {
    const { id } = useParams();
    const [cardInfo, setCardInfo] = useState({
        userName:'',
        date: '',
        doctorName: '',
        complaints: '',
        treatment: '',
        cardId: ''

    })
    const { request, loading } = useHttp()

    const handleGetCard = useCallback(async () => {
        try {
            const data = await request(`/api/card/getCard/${id}`, 'GET', null)
            setCardInfo({...cardInfo,date:data.date,cardId:data._id,doctorName:data.doctorName,userName:data.userId.name})
        } catch (error) {

        }
    }, [request])

    useEffect(() => {
        handleGetCard()
    }, [handleGetCard])

    if (loading) {
        return <Loader />
    }

    const handleChangeForm=(event)=>
    {
        setCardInfo({...cardInfo,[event.target.name]:event.target.value})
    }

    const handleSaveChanges=()=>
    {
        console.log(cardInfo)
    }

    return (
        <Form onSubmit={handleSaveChanges}>
            <Form.Group>
                <Form.Label>Дата</Form.Label>
                <Form.Control type="text" value={cardInfo.date} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Врач</Form.Label>
                <Form.Control type="text" value={cardInfo.doctorName} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Жалобы</Form.Label>
                <Form.Control type="textarea" name="complaints" onChange={handleChangeForm} value={cardInfo.complaints} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Лечение</Form.Label>
                <Form.Control type="textarea" name="treatment" onChange={handleChangeForm} value={cardInfo.treatment} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Пациент</Form.Label>
                <Form.Control type="text" value={cardInfo.userName} />
            </Form.Group>
            <Button type='submit'>Save</Button>
        </Form>
    )
}