import React, { useContext, useState, useCallback, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import ShowReviews from '../components/ShowReviews'

export function AddReview() {

    const { token } = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [review, setReview] = useState([])
    const [reviewText, setReviewText] = useState("");

    const getReview = useCallback(async () => {
        try {
            const fetched = await request(`/api/review/getById`, 'GET', null,
                {
                    Authorization: `Bearer ${token}`
                })
            setReview(fetched)
        } catch (error) {

        }
    }, [token, request])

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
            setReviewText('');
        } catch (error) {
        }
    }

    return (
        <div>
            {!loading && review.length && <ShowReviews revs={review} />}
            {!loading && !review.length && <p>Have no reviews</p>}
            <form onSubmit={handleSave}>
                <label>Example textarea
                    <textarea rows={3} value={reviewText} onChange={e => setReviewText(e.target.value)} /></label>
                <input type="submit" value="Сохранить" />
            </form>
        </div>
    )
}
