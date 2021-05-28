import React, { useCallback, useEffect, useState, useContext } from 'react'
import {useHistory} from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { Button, Table } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'


export const ShowShedule = () => {
    const history=useHistory();
    const { loading, request } = useHttp();
    const [shedule, setShedule] = useState([]);
    const { token } = useContext(AuthContext)

    const getShedule = useCallback(async () => {
        try {
            const data = await request('/api/shedule/activeRecord', 'GET', null)
            setShedule(data)
        } catch (error) {
        }
    }, [request])

    useEffect(() => {
        getShedule();
    }, [getShedule])

    if (loading) return <Loader />
    const handleAddCard = event => {
        history.push(`/addCardInfo/${event.target.value}`)
    }
    const handleAddEstimate = event => {
        history.push(`/addEstimate/${event.target.value}`)
    }

    const generateTable = () => {
        let list = shedule.map((item, index) => {
            return (<tr>
                <td>{index}</td>
                <td>{item.staff.name}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td >{item.idEstimate}</td>
                <td >{item.idCard}</td>
                <td><Button value = {item.idCard} onClick = {handleAddCard}>Add card info</Button>
                    <Button value = {item.idEstimate} onClick = {handleAddEstimate}>Add estimate</Button></td>
            </tr>)
        })
        return(
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>date</th>
                        <th>time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{list}</tbody>
            </Table>
        )
    }

    return (
        <>
        {!loading && generateTable()}
        </>
    )
}