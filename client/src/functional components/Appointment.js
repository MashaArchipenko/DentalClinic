import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { AuthContext } from '../context/AuthContext'
import { Doctors } from '../pages/Doctors'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader';
import { CreateSheduleTable } from './CreateSheduleTable';

export function Appointment() {
    const { id } = useParams();
    const {token}=useContext(AuthContext)
    const [shedule,setShedule]=useState(null)
    const { request, loading } = useHttp()

    const handleGetSheduleByDoctor= useCallback(async ()=>
    {
        try {
            const data = await request(`/api/shedule/${id}`,'GET',null,
            {
                Authorization: `Bearer ${token}`
            })
            setShedule(data);
        } catch (error) {
            
        }
    },[token,request])

    useEffect(()=>
    {
        handleGetSheduleByDoctor()
    },[handleGetSheduleByDoctor])

    if (loading) {
        return <Loader />
    }

    if (!id) {
        return(
            <div
            ><h3>Chooose doctor</h3>
                <Doctors />
            </div>
        )
    }
    if(id) return (
        <div>
            {!loading && <CreateSheduleTable shedule={shedule}/>}
        </div>
    )

    return(<div>Wait...</div>)
}
