import React, { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'

function AddInfo() {
    const { token,userId } = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [message, setMessage] = useState('');
    const history = useHistory()

    const [form, setForm] = useState(
        {
            name: '',
            adress: '',
            phone: '',
            byrthday: ''
        }
    )

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const handleSave = async (event) => {
        event.preventDefault();
        try {
            const data = await request('/api/client/addInfo', 'POST', { ...form },
                {
                    Authorization: `Bearer ${token}`
                })
            setMessage(data.message);
        } catch (error) {

        }
    }

    if (loading) {
        return <Loader />
    }

    if(message === "Ok") history.push(`/watchInfo/${userId}`)


    return (
        <Form>
            <Form.Group>
                <Form.Label>Введите ФИО</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Введите ФИО"
                    name="name"
                    value={form.name}
                    onChange={changeHandler} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Введите адрес</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Введите адрес"
                    name="adress"
                    value={form.adress}
                    onChange={changeHandler} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Введите номер телефона</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="+375*********"
                    name="phone"
                    value={form.phone}
                    onChange={changeHandler} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Дата рождения</Form.Label>
                <Form.Control
                    type="date"
                    name="byrthday"
                    value={form.byrthday}
                    onChange={changeHandler} />
            </Form.Group>
            <Button onClick={handleSave}>Сохранить</Button>
        </Form>
    )
}

export default AddInfo
