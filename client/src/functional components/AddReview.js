import React, { useContext, useState, useCallback, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { ShowReviews } from '../pages/Reviews'

export function AddReview() {

    const { userId,token } = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [review, setReview] = useState([])
   // const reviewId = useParams().id
    const [ reviewText, setReviewText ] = useState("");

    const getReview = useCallback(async () => {
        try {
            const fetched = await request(`/api/review/${userId}`, 'GET', null,
                {
                    Authorization: `Bearer ${token}`
                })
            setReview(fetched)
        } catch (error) {

        }
    }, [token, userId, request])

    useEffect(() => {
        getReview()
    }, [getReview])

    if (loading) {
        return <Loader />
    }

    const handleSave = async (event) => {
        event.preventDefault();
        try {
            const data = await request('/api/review/createReview', 'POST', { reviewText: reviewText }, {
                Authorization: `Bearer ${token}`
            })
            console.log(data);
            setReviewText('');
        } catch (error) {
        }
    }

    return (
        <div>
            {!loading && <ShowReviews revs={review} />}
            {console.log(typeof setReviewText)}
            <form onSubmit={handleSave}>
                <label>Example textarea
                    <textarea rows={3} value={reviewText} onChange={e => setReviewText(e.target.value)} /></label>
                <input type="submit" value="Сохранить" />
            </form>
        </div>
    )
}
