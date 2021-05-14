import { Container, Table, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'

export default function ShowStuff({ revs }) {

    const listItems = revs.map(item => {
        return (
            <tr>
                <td>{item.name}</td>
                <td>{item.info}</td>
                <td>{item.birthday}</td>
                <td>{item.adress}</td>
                <td>{item.staffName}</td>
            </tr>
        )
    })

    return <Container><Table>
        <thead>
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
            </tr>
        </thead>
        <tbody>
            {listItems}
        </tbody>
    </Table><Button><Link to="/" className="btn btn-primary stretched-link">Continue</Link></Button></Container>
}