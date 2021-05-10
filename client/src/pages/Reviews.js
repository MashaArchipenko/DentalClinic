import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'

export const Reviews = () => {
    const { loading, request } = useHttp();
    const [revs, setRevs] = useState([]);

    const getReview = useCallback(async () => {
        try {
            const data = await request('/api/review', 'GET', null,null)
            console.dir("data ", data);
            setRevs(data);
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
            <div>Hello world</div>
            {!loading && <ShowReviews revs={revs} />}
        </div>
    )
}

export const ShowReviews = ({revs}) => {
    console.log(revs);
    if (!revs.length) {
        return <p>Have no reviews</p>
    }
    console.log("revs ", revs);
    revs.map((link, name) => {
        return (<div><h3>{link.date}</h3>
            <p>{link.reviewText}</p>
        </div>)
    })
}
