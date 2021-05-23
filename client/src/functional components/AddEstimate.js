import React, { useParams } from 'react'

export function AddEstimate() {
    const { id } = useParams();
    return (
        <div>{id}</div>
    )
}
