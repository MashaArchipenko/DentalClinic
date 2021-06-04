import { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { Table, Container, Col,Row } from 'react-bootstrap'
import s from './style/style.module.css'

export const Services = () => {
    const { request, loading } = useHttp()
    const [price, setPrice] = useState([{
        nameServise: '',
        coust: ''
    }])
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
            return <p>Список услуг ещё не создан</p>
        }

        let itemList = price.map((item, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{item.nameServise}</td>
                    <td>{item.coust}</td>
                </tr>
            )
        })
        return (
            <Table className={s.table}>
                <thead >
                    <tr className={s.head}>
                        <th>#</th>
                        <th>Наименование</th>
                        <th>Стоимость(р)</th>
                    </tr>
                </thead>
                <tbody>
                    {itemList}
                </tbody>
            </Table>
        )
    }

    return (
        <Container>
            <div className={s.header}>PRICE LIST</div>
<hr style={{border:'2px solid black',borderRadius:"2px"}}/>
            {!loading && renderPrice()}
        </Container>
    )
}
