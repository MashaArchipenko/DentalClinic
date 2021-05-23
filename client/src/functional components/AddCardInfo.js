import {useParams} from 'react-router-dom'

export const AddCardInfo=()=>
{
    const {id} = useParams();
    
    return(
        <div>{id}</div>
    )
}