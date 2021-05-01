import { useContext } from 'react'
import React from 'react'
import { NavLink, useHistory } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { Nav, NavDropdown, Navbar, Form } from 'react-bootstrap'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import image from './logo.jpg'


export const Navbarr = props => {
    const { isAuth, role } = props;
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    const showButtonAuthUser = () => {
        if (isAuth) {
            switch (role) {
                case 'client': return (
                    <NavDropdown className="justify-content-end ml-auto" title="Аккаунт" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                )
                case 'admin':
                    return (
                        <div>
                            <li><NavLink to="/create">Создать</NavLink></li>
                            <li><NavLink to="/create">Создать</NavLink></li>
                            <li><NavLink to="/create">Создать</NavLink></li>
                            <li><NavLink to="/create">Создать</NavLink></li>
                        </div>

                    );
                case 'manager':
                    return (
                        <div>
                            <li><NavLink to="/create">Создать</NavLink></li>
                            <li><NavLink to="/create">Создать</NavLink></li>
                            <li><NavLink to="/create">Создать</NavLink></li>
                            <li><NavLink to="/create">Создать</NavLink></li>
                        </div>

                    );
                case 'doctor':
                    return (
                        <div>
                            <li><NavLink to="/create">Запись на прием</NavLink></li>
                            <li><NavLink to="/create">Пациенты</NavLink></li>
                            <li><NavLink to="/create">Прием</NavLink></li>
                        </div>

                    );
                case 'nurse':
                    return (
                        <div>
                            <li><NavLink to="/create">Создать</NavLink></li>
                            <li><NavLink to="/create">Создать</NavLink></li>
                            <li><NavLink to="/create">Создать</NavLink></li>
                            <li><NavLink to="/create">Создать</NavLink></li>
                        </div>

                    );

                default:
                    break;
            }
        }
    }

    return (
        <>
            <Navbar fixed="top" expand="lg" className="blue darken-4 p-3" >
                <Navbar.Brand href="/">
                    <img
                        alt="logo"
                        src={image}
                        width="60"
                        height="65"
                        className="d-inline-block align-top"
                    />{' '} Dental Clinic
                </Navbar.Brand>
                <Navbar.Collapse >
                    <Nav className="blue darken-4 right">
                        <ul>
                                <li><NavLink to="/">О нас</NavLink></li>
                                <li><NavLink to="/">Услуги</NavLink></li>
                                <li><NavLink to="/">Наши врачи</NavLink></li>
                                <li><NavLink to="/">Новости</NavLink></li>
                                <li><NavLink to="/">Отзывы</NavLink></li>
                            </ul>
                    </Nav>
                    {showButtonAuthUser()}
                        {isAuth && <Nav.Link href="/" className="btn" onClick={logoutHandler}>logout</Nav.Link>}
                        {!isAuth && <Nav.Link className="btn" href="/auth">Вход/Регистрация</Nav.Link>}
                    
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}