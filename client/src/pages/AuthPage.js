import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook'
import { Form, Toast, Button } from 'react-bootstrap'
import s from './authPage.module.css'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const [authPage, setAuthPage] = useState(true);
    const [message, setMessage] = useState(null);
    const { loading, error, request, clearError } = useHttp();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const role = 'client';
    const registerHandler = async () => {
        try {
            setAuthPage(false);
            const data = await request('/api/auth/register', 'POST', { email, password, role })
            setMessage(data.message)
            
        } catch (e) {
        }
    }
    const loginHandler = async () => {
        try {
            setAuthPage(true);
            const data = await request('/api/auth/login', 'POST', { email, password, role })
            auth.login(data.token, data.userId, data.userRole)
            
        } catch (e) {

        }
    }

    const errorMessage = () => {
        return (
            <Toast>
                <Toast.Header>
                    <strong className="mr-auto">Ошибка</strong>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        )
    
    }
    useEffect(() => {
        setMessage(error)
        clearError()
    }, [error,clearError])

    return (
        <Form className={s.form}>
            {authPage && <h2>Вход</h2>}
            {!authPage && <h2>Регистрация</h2>}
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email" placeholder="user@example.ru" onChange={(event) => setEmail(event.target.value)} />
                <Form.Text className="text-muted">
                    Ваша почта никогда не разглашается
    </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    type="password"
                    name="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
            </Form.Group>
            <Button variant="warning" type="submit" disabled={loading} onClick={loginHandler}>
                Вход
  </Button>
            <Button variant="primary" type="submit" disabled={loading} onClick={registerHandler}>
                Регистрация
  </Button>
            {message && errorMessage()}
        </Form>
    )
}