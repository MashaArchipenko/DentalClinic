import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader';
import { Button, Table } from 'react-bootstrap';

export const ActiveAppointment = () => {
    const [shedule, setShedule] = useState(null)
    const { request, loading } = useHttp()

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
    const handleSaveCard=()=>
    {

    }

    const handleSaveEstimate=()=>
    {
        
    }

    const createBody = () => {
        if (shedule) {
            const values = shedule.map((item, index) => {
                return (
                    <tr>
                        <th>{index}</th>
                        <th>{new Date(item.date).toLocaleDateString()}</th>
                        <th>{item.time}</th>
                        <th>{item.staff.name}</th>
                        <th><Button value={index} onClick={handleSaveCard}>Add Card</Button>
                        <Button value={index} onClick={handleSaveEstimate}>Add Estimate</Button></th>
                    </tr>
                )
            })
            return values
        }
        else return (<p>Have't records</p>)

    }
    return (
        <Table>
            <thead>
                <th>#</th>
                <th>Date</th>
                <th>Time</th>
                <th>Name</th>
                <th>Action</th>
            </thead>
            <tbody>{!loading && createBody()}</tbody>
        </Table>
    )
}
