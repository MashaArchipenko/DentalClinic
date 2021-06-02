import { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { Container, Table } from 'react-bootstrap'

export const Estimate = () => {
    const { request, loading } = useHttp()
    const [estimate, setEstimate] = useState(null)
    const handleGetEstimate = useCallback(
        async () => {
            try {
                const data = await request('/api/estimate', "GET", null)
                setEstimate(data)
            } catch (error) {
            }
        },
        [request],
    )

    useEffect(() => {
        handleGetEstimate()
    }, [handleGetEstimate])

    if (loading) {
        return <Loader />
    }

    const renderList = () => {
        console.log(estimate)
        if (estimate && estimate.length) {
            let list = estimate.map((item, index) => {
                console.log(item);
                return (
                    <tr>
                        <td>{index}</td>
                        <td>{item.date}</td>
                        <td>{item.idService[0].coust}</td>
                        <td>{item.idService[0].nameServise}</td>
                        <td>{item.lostMaterials[0].name}</td>
                    </tr>
                )
            })
            return (
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Дата</th>
                            <th>Стоимость</th>
                            <th>Наименование</th>
                            <th>Наименование материала</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </Table>
            )
        }
        else return (
            <p>Have no estimate</p>
        )
    }

    return (
        <Container>
            {!loading && renderList()}
        </Container>
    )
}