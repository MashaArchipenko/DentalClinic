import { useContext, useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap'
import { useParams,useHistory } from 'react-router';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook'

export const CreateSheduleTable = ({ shedule }) => {
    const nowDate = Date.now();
    //const endDate = Date.setDate(Date.getDate + 7)
    //const startTime = new Date().setHours(9);
    //const endTime = new Date().setHours(18);
    const { token} = useContext(AuthContext)
    const history=useHistory();
    const [date, setDate] = useState("")
    const { request, loading } = useHttp()
    const [time, setTime] = useState("09:00");
    const { id } = useParams();
    const [message, setMessage] = useState('');

    const handleSave = async event => {
        event.preventDefault();
        try {
            const data = await request(`/api/shedule/appointment/${id}`, 'POST', { date, time },
                {
                    Authorization: `Bearer ${token}`
                })
            setMessage(data.message);
        } catch (error) {

        }

    }
    if(loading)
    {
        <Loader />
    }

    useEffect(()=>
    {
        if(message ==='Save')
        {
            history.push('/getAppointment')
        }
    },[message])

    const handleAppointment = async event => {
        try {
            const data = await request('/api/shedule/appointment', 'POST', { ...shedule[parseInt(event.target.value)] },
                {
                    Authorization: `Bearer ${token}`
                })
            setMessage(data.message)
        } catch (error) {

        }
    }
    const createBody = () => {
        const values = shedule.map((item, index) => {
            return (
                <tr>
                    <th>{index}</th>
                    <th>{new Date(item.date).toLocaleDateString()}</th>
                    <th>{item.time}</th>
                    <th><Button value={index} onClick={handleAppointment}>Save</Button></th>
                </tr>
            )
        })
        return values
    }

    if (!shedule || !shedule.length) {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Выберите дату</Form.Label>
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={event => setDate(event.target.value)}
                        min={nowDate} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Выберите время</Form.Label>
                    <Form.Control
                        type="time"
                        min="09:00"
                        max="17:30"
                        value={time}
                        onChange={event => setTime(event.target.value)}
                        step="00:30" />
                </Form.Group>
                <Button onClick={handleSave}>Записаться</Button>
            </Form>
        )
    }

    if (message) {
        return (<div>{message}</div>)
    }

    else if(shedule) {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Дата</th>
                        <th>Время</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {createBody()}
                </tbody>
            </Table>
        )
    }
}

