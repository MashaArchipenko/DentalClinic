import { useCallback, useContext, useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap"
import { Loader } from "../components/Loader";
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook'

export const GetAppointment = () => {
    const { request, loading } = useHttp()
    const { token } = useContext(AuthContext);
    const [shedule, setShedule] = useState(null);

    const getShedule = useCallback(async () => {
        try {
            const data = await request('/api/shedule/all', 'GET', null,
                {
                    Authorization: `Bearer ${token}`
                })
            setShedule(data);
        } catch (error) {

        }
    }, [token, request])

    useEffect(() => {
        getShedule()
    }, [getShedule])

    const handleShedule = () => {
        const listItems = shedule.map(item => {
            return (
                <tr>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td>{item.time}</td>
                    <td>{item.idStaff.name}</td>
                </tr>)
        })
        return listItems.length ? <tbody>{listItems}</tbody> : <p>У вас нет пока активных записей</p>
    }

    if (loading) return <Loader />

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Время</th>
                        <th>Врач</th>
                    </tr>
                </thead>
                {shedule && handleShedule()}
                {!shedule && <p>У вас нет пока записей</p>}
            </Table>
        </Container>
    )
}