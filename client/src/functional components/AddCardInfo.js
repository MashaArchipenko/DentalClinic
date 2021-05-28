import { Form,Button } from 'react-bootstrap';
import {useParams} from 'react-router-dom'

export const AddCardInfo=()=>
{
    const {id} = useParams();
    
    return(
        <Form>
            <Form.Group>
                <Form.Label>Дата</Form.Label>
                <Form.Control type="text"  value="05/28/2021"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Время</Form.Label>
                <Form.Control type="text"  value="09:00"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Врач</Form.Label>
                <Form.Control type="text"  value="Pavel Ivanov"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Жалобы</Form.Label>
                <Form.Control type="textarea" value="" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Лечение</Form.Label>
                <Form.Control type="textarea"  value=""/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Пациент</Form.Label>
                <Form.Control type="text" value="Иванов Иван Иванович" />
            </Form.Group>
            <Button>Save</Button>
        </Form>
    )
}