import { useCallback, useContext, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext'
import { Form, Button, Table } from 'react-bootstrap'

export const AddPriceList = () => {
    const { userRole } = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [price, setPrice] = useEffect([{
        nameService: '',
        coust: ''
    }])
    const [newPrice, setNewPrice] = useEffect({
        nameService: '',
        coust: ''
    })
    const handleGetPrice = useCallback(async () => {
        try {
            const data = await request(`/api/priceList/all`, 'GET', null)
            setPrice(data)
        } catch (error) {

        }
    }, [request])

    useEffect(() => {
        handleGetPrice()
    }, [handleGetPrice])

    if (loading) {
        return <Loader />
    }
    const renderPrice = () => {
        if (!price && !price.length) {
            return <p>Haven't price list</p>
        }

        let itemList = price.map((item, index) => {
            return (
                <tr>
                    <td>{index}</td>
                    <td>{item.nameService}</td>
                    <td>{item.coust}</td>
                </tr>
            )
        })
        return (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>coust</th>
                    </tr>
                </thead>
                <tbody>
                    {itemList}
                </tbody>
            </Table>
        )
    }

    const handleChangeForm = event => {
        setNewPrice({ ...newPrice, [event.target.name]: event.target.value })
    }

    const handleSave = event => {
        event.preventDefault();
        try {
            const data = require('/api/priceList/', 'POST', null);
            if (data.message === 'Save') window.location.reload();
        } catch (error) {

        }

    }
    const renderForm = () => {
        return (
            <Form onSubmit={handleSave}>
                <Form.Group>
                    <Form.Label>Название</Form.Label>
                    <Form.Control type="text" name="nameService" value={newPrice.nameService} onChange={handleChangeForm} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Стоимость</Form.Label>
                    <Form.Control type="number" name="coust" value={newPrice.coust} onChange={handleChangeForm} />
                </Form.Group>
                <Button type="submit">Save</Button>
            </Form>
        )
    }

    return (
        <div>{!loading && renderPrice()}
            {userRole === 'manager' && renderForm()}
        </div>
    )
}