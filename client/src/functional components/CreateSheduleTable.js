import { useContext, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook'

export const CreateSheduleTable = ({ shedule }) => {
    const nowDate = Date.now();
    //const endDate = Date.setDate(Date.getDate + 7)
    const startTime = new Date().setHours(9);
    const endTime = new Date().setHours(18);
    const { token,userId } = useContext(AuthContext)
    const [date, setDate] = useState("");
    const { request, loading } = useHttp()
    const [time, setTime] = useState("");

    const handleSave = async (event) => {
        event.preventDefault();
        try {
            const data = await request('/api/client/addInfo', 'POST', { date,time },
                {
                    Authorization: `Bearer ${token}`
                })

        } catch (error) {
            
        }

    }

    


    if (!shedule) {
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
                        onChange={event => setTime(event.target.value)}
                        step="00:30" />
                </Form.Group>
                <Button onClick={handleSave}>Записаться</Button>
            </Form>
        )
    }

    else {
        const values = shedule.map(item => {
        if (Date.compare(nowDate, item.date) == -1 && startTime <= item.time) {

        }

    })
}

    return (
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Дата</th>
                    <th>Время</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </Table>
    )
}

