import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader';
import { Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';

export const ActiveAppointment = () => {
    const [shedule, setShedule] = useState(null)
    const { request, loading } = useHttp()
    const history = useHistory()

    const handleGetSheduleByDoctor = useCallback(async () => {
        try {
            const data = await request(`/api/shedule/activeRecord`, 'GET', null)
            setShedule(data);
        } catch (error) {

        }
    }, [request])

    useEffect(() => {
        handleGetSheduleByDoctor()
    }, [handleGetSheduleByDoctor])

    if (loading) {
        return <Loader />
    }
    const handleSaveCard = event => {
        history.push(`/addCardInfo/${shedule[event.target.value].idCard._id}`);
    }

    const handleSaveEstimate = event => {
        history.push(`/addEstimate/${shedule[event.target.value].idEstimate}`);
    }

    const createBody = () => {
        console.log(shedule)
        if (shedule && shedule.length) {
            const values = shedule.map((item, index) => {
                return (
                    <tr>
                        <td>{index}</td>
                        <td>{new Date(item.date).toLocaleDateString()}</td>
                        <td>{item.time}</td>
                        <td>{item.idStaff.name}</td>
                        <td><Button value={index} onClick={handleSaveCard}>Add Card</Button>
                            <Button value={index} onClick={handleSaveEstimate}>Add Estimate</Button></td>
                    </tr>
                )
            })
            return values
        }
        else return (<tr><td>Have't records</td></tr>)

    }
    return (
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>{!loading && createBody()}</tbody>
        </Table>
    )
}
