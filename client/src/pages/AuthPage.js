import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook'
import { Form, Toast, Button } from 'react-bootstrap'
import s from './authPage.module.css'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const [authPage, setAuthPage] = useState(true);
    //const message = useMessage();
    const [message, setMessage] = useState(null);
    const { loading, error, request, clearError } = useHttp();
    //const [form, setForm] = useState({ email: '', password: '', role: 'client' })
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')


    /*const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }*/
    const role = 'client';
    const registerHandler = async () => {
        try {
            console.log('ok')
            const data = await request('/api/auth/register', 'POST', { email, password, role })
            setMessage(data.message)
        } catch (e) {
        }
    }
    const loginHandler = async () => {
        try {
            console.log('ok')
            const data = await request('/api/auth/login', 'POST', { email, password, role })
            auth.login(data.token, data.userId, data.userRole)
        } catch (e) {

        }
    }

    useEffect(() => {
        setMessage(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        errorMessage();
    }, [message])

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

    return (
        <Form className={s.form}>
            {authPage && <h2>Вход</h2>}
            {!authPage && <h2>Регистрация</h2>}
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    name="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
    </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
            </Form.Group>
            {authPage && <Button variant="warning" type="submit" disabled={loading} onClick={loginHandler}>
                Вход
  </Button>}
            {!authPage && <Button variant="primary" type="submit" disabled={loading} onClick={registerHandler}>
                Регистрация
  </Button>}
            {message && errorMessage()}
        </Form>
    )
}