import {Container,Table} from 'react-bootstrap'

export const ShowInfo=({info})=>
{
    const listItems = info.map(item => {
        return (
            <tr>
                <td>{item.name}</td>
                <td>{item.adress}</td>
                <td>{item.phone}</td>
                <td>{new Date(item.byrthday).toLocaleDateString()}</td>
            </tr>
        )
    })

    return <Container><Table>
        <thead>
            <tr>
                <th>Фио</th>
                <th>Адрес</th>
                <th>Телефон</th>
                <th>Дата рождения</th>
            </tr>
        </thead>
        <tbody>
            {listItems}
        </tbody>
    </Table>
    </Container>
}