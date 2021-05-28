import { useParams } from 'react-router-dom'
import { Container, Table, Button } from 'react-bootstrap'

export function AddEstimate() {
    const { id } = useParams();
    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Text</th>
                        <th>Coust</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox" /></td>
                        <td>Смена коронки</td>
                        <td>30</td>
                    </tr>
                </tbody>
            </Table>
            <Button>Sent</Button>
        </Container>
    )
}
