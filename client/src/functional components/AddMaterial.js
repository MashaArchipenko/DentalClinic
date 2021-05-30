import { useCallback, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { Form, Button, Table } from 'react-bootstrap'


export const AddMaterial = () =>
{
    const { request, loading } = useHttp()
    const [material, setMaterial] = useEffect([{
        name: '',
        count: ''
    }])
    const [newMaterial, setNewMaterial] = useEffect({
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
            const data = require('/api/material/newMaterial', 'POST', null);
            if (data.message === 'Save') window.location.reload();
        } catch (error) {

        }

    }

    const renderForm = () => {
        return (
            <Form onSubmit={handleSave}>
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
        <div>{!loading && renderMaterial()}
             {renderForm()}
        </div>
    )
}