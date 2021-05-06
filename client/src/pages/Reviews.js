import React from 'react'
import { useHttp } from '../hooks/http.hook'

export default function Reviews() {

    const {request}= useHttp();

    const getReview = async ()=>
    {
        try {
            const data=await request('/review/','GET')
            console.dir("data ",data);
        
        } catch (error) {
            
        }
        return (<div>Not Reviews</div>)
    }

    return (
        <div>
            <div>Hello world</div>
            {getReview()}
        </div>
    )
}
