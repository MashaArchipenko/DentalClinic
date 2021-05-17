import React, { useCallback, useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Loader } from '../components/Loader'
import { ShowInfo } from '../components/ShowInfo'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export default function WatchInfo() {
    const { id } = useParams()
    const { request, loading } = useHttp()
    const { token } = useContext(AuthContext)
    const [info, setInfo] = useState([]);

    const getInfo = useCallback(async () => {
        try {
            const data = await request(`/api/client/${id}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setInfo(data);
        } catch (error) {

        }

    }, [token, id, request])

    useEffect(() => {
        getInfo()
    }, [getInfo])

    if (loading) return <Loader />

    return (
        <div>
        {!loading && info && <ShowInfo info={info} />}
        </div>
    )
}
