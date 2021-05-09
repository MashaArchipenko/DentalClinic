import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import {Loader} from '../components/Loader'

export  const Reviews = () => {
    const {loading,request}= useHttp();
    const [revs,setRevs]=useState([]);

    const getReview =useCallback(async ()=>
    {
        try {
            const data=await request('/api/review','GET',null)
            console.dir("data ",data);
            setRevs(data);
        } catch (error) {
        }
    },[request])
    useEffect(() => {
        getReview();
    }, [getReview])

    if(loading)
    {
        return <Loader />
    }

    const showReviews=()=>
    {
        if(!revs.length){return <p>Have no reviews</p>}
        console.log("revs ",revs);
        revs.map((link,name)=>
        {
            return(<div><h3>{link.date}</h3>
                <p>{link.reviewText}</p>
            </div>)
        })
    }

    return (
        <div>
            <div>Hello world</div>
            {!loading && showReviews()}
        </div>
    )
}
