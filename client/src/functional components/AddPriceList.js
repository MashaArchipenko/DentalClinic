import { useCallback, useContext, useEffect,useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext'
import { Form, Button, Table, Container } from 'react-bootstrap'
import s from './Style/style.module.css'

export const AddPriceList = () => {
    const { userRole } = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [price, setPrice] = useState([{
        nameServise: '',
        coust: ''
    }])
    const [newPrice, setNewPrice] = useState({
        nameServise: '',
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
                    <td>{item.nameServise}</td>
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
            console.log(newPrice)
            const data = request('/api/priceList/', 'POST', {...newPrice});
            if (data) window.location.reload();
        } catch (error) {

        }

    }
    const renderForm = () => {
        return (
            <Form className={s.form} onSubmit={handleSave}>
                <Form.Group>
                    <Form.Label>Название</Form.Label>
                    <Form.Control type="text" name="nameServise" value={newPrice.nameServise} onChange={handleChangeForm} />
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
        <Container>{!loading && renderPrice()}
            {userRole === 'manager' && renderForm()}
        </Container>
    )
}