import { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { Form, Button, Table, Container } from 'react-bootstrap'
import s from './Style/style.module.css'

export const AddMaterial = () => {
    const { request, loading } = useHttp()
    const [material, setMaterial] = useState([{
        name: '',
        count: ''
    }])
    const [newMaterial, setNewMaterial] = useState({
        name: '',
        count: ''
    })
    const handleGetMaterial = useCallback(async () => {
        try {
            const data = await request(`/api/material/all`, 'GET', null)
            setMaterial(data)
        } catch (error) {

        }
    }, [request])

    useEffect(() => {
        handleGetMaterial()
    }, [handleGetMaterial])

    if (loading) {
        return <Loader />
    }

    const renderMaterial = () => {
        if (!material && !material.length) {
            return <p>Haven't price list</p>
        }

        let itemList = material.map((item, index) => {
            return (
                <tr>
                    <td>{index}</td>
                    <td>{item.name}</td>
                    <td>{item.count}</td>
                </tr>
            )
        })
        return (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>count</th>
                    </tr>
                </thead>
                <tbody>
                    {itemList}
                </tbody>
            </Table>
        )
    }

    const handleChangeForm = event => {
        setNewMaterial({ ...newMaterial, [event.target.name]: event.target.value })
    }

    const handleSave = event => {
        event.preventDefault();
        try {
            console.log(newMaterial);
            const data = request('/api/material/newMaterial', 'POST', { ...newMaterial });
            if (data) window.location.reload();
        } catch (error) {

        }
    }

    const renderForm = () => {
        return (
            <Form className={s.form} onSubmit={handleSave}>
                <Form.Group>
                    <Form.Label>Название</Form.Label>
                    <Form.Control type="text" name="name" value={newMaterial.name} onChange={handleChangeForm} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Количество</Form.Label>
                    <Form.Control type="number" name="count" value={newMaterial.count} onChange={handleChangeForm} />
                </Form.Group>
                <Button type="submit">Save</Button>
            </Form>
        )
    }

    return (
        <Container>{!loading && renderMaterial()}
            {renderForm()}
        </Container>
    )
}