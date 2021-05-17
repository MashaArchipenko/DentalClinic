import { useState, useContext, useEffect } from 'react'
import { Form, Button, Toast } from 'react-bootstrap'
import { useHttp } from '../hooks/http.hook'
import s from '../pages/authPage.module.css'
import { Loader } from '../components/Loader'
import ShowStuff from '../components/ShowStuff'

export const AddDoctor = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [info, setInfo] = useState("")
    const [birthday, setBirthday] = useState("")
    const [adress, setAdress] = useState("")
    const [staffName, setStaffName] = useState("Doctor")
    const [phone, setPhone] = useState("")
    const [pic,setPic]=useState("");

    const [staff, setStaff] = useState([]);

    const [message, setMessage] = useState(null);
    const { loading, error, request, clearError } = useHttp();

    const handleSaveDoctor = async (event) => {
        event.preventDefault();
        try {
            console.log(pic);
            const data = await request('/api/staff/registerDoctor', 'POST', { email, password, name, info, birthday, adress, staffName, phone })
            setMessage(data.message)
            setStaff([{ "email": email, "password": password, "name": name, "info": info, "birthday": birthday, "adress": adress, "staffName": staffName, "phone": phone }]);
        } catch (e) {
        }
    }

    useEffect(() => {
        setMessage(error)
        clearError()
    }, [error, message, clearError])

    if (loading) {
        return <Loader />
    }

    const errorMessage = () => {
        return (
            <Toast>
                <Toast.Header>
                    <strong className="mr-auto">Error</strong>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        )
    }

    if (staff.length) {
        return (
            <div>
                <ShowStuff revs={staff} />
            </div>
        )
    }
    return (
        <>
            {message && errorMessage()}
            <Form className={s.form}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email" placeholder="name@example.com" onChange={(event) => setEmail(event.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password" placeholder="Enter password" onChange={(event) => setPassword(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name" placeholder="Enter name" onChange={(event) => setName(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Info</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="info" placeholder="Enter info" onChange={(event) => setInfo(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" placeholder="+375*********" onChange={event => setPhone(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Byrthday</Form.Label>
                    <Form.Control
                        type="date"
                        name="brth" placeholder="Choose date" onChange={(event) => setBirthday(event.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Adress</Form.Label>
                    <Form.Control
                        type="text"
                        name="adress" placeholder="Enter adress" onChange={(event) => setAdress(event.target.value)} />
                </Form.Group>
                <Form.Group controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" defaultValue="Doctor" onChange={(event) => setStaffName(event.target.value)}>
                        <option>Doctor</option>
                        <option>Ners</option>
                        <option>Admin</option>
                        <option>Manager</option>
                    </Form.Control>
                    <Form.Group>
                        <Form.File id="formcheck-api-regular">
                            <Form.File.Label>Regular file input</Form.File.Label>
                            <Form.File.Input onChange={event=>setPic(event.target.value)} />
                        </Form.File>
                    </Form.Group>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSaveDoctor}>
                    Save
  </Button>
            </Form>
        </>
    )
}
