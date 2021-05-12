import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import ShowReviews from '../components/ShowReviews';

export const Reviews = () => {
    const { loading, request } = useHttp();
    const [revs, setRevs] = useState([]);

    const getReview = useCallback(async () => {
        try {
            const data = await request('/api/review', 'GET')
            setRevs(data)
        } catch (error) {
        }
    }, [request])

    useEffect(() => {
        getReview();
    }, [getReview])

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            {!loading && revs.length && <ShowReviews revs={revs}/>}
            {!revs.length && <p>Have no reviews</p>}
        </div>
    )
}