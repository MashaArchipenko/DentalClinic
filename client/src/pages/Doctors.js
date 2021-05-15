import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import ShowDoctor from './ShowDoctor'

export const Doctors = () => {
    const { loading, request } = useHttp();
    const [staff, setStaff] = useState([]);

    const getStaff = useCallback(async () => {
        try {
            const data = await request('/api/staff', 'GET', null, { staffN: "Doctor" })
            console.log("data")
            setStaff(data)
        } catch (error) {
        }
    }, [request])

    useEffect(() => {
        getStaff();
    }, [getStaff])

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            {!loading && staff.length && <ShowDoctor revs={staff} />}
            {!staff.length && <p>Have no Doctors</p>}
        </div>
    )
}
