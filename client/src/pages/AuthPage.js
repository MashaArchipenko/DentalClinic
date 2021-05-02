import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook'
import { Toast } from 'react-bootstrap'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    //const message = useMessage();
    const [message, setMessage] = useState(null);
    const { loading, error, request, clearError } = useHttp();
    const [form, setForm] = useState({ email: '', password: '', role: 'client' })

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            setMessage(data.message)
        } catch (e) {

        }
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
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
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Auth</h1>
                <div className="input-field col s12">
                    <input
                        id="email"
                        type="email"
                        name="email"
                        className="blue-input"
                        onChange={changeHandler}
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-field col s12">
                    <input
                        id="password"
                        type="password"
                        name="password"
                        className="blue-input"
                        onChange={changeHandler}

                    />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="card-action">
                    <button
                        className="btn yellow darken-4"
                        disabled={loading}
                        onClick={loginHandler}>
                        Вход
                        </button>
                    <button
                        className="btn "
                        onClick={registerHandler}
                        disabled={loading}>
                        Регистрация
                            </button>
                </div>
            </div>
            {message && errorMessage()}
        </div>
    )
}