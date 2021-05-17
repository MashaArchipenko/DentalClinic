import { useContext } from 'react'
import React from 'react'
import { useHistory } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { Nav, NavDropdown, Navbar, Button } from 'react-bootstrap'
import image from './img/logo.jpg'
import s from './styles/Navbar.module.css'
import { Phone } from 'react-bootstrap-icons'

export const Navbarr = props => {
    const { isAuth, role,id } = props;
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
                case 'client':
                    return (
                        <NavDropdown className="justify-content-end ml-auto" title="Аккаунт" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/appointment">Запись на прием</NavDropdown.Item>
                            <NavDropdown.Item href="/addReview">Добавить отзыв</NavDropdown.Item>
                            <NavDropdown.Item href="/checkMessage">Просмотр сообщений</NavDropdown.Item>
                            <NavDropdown.Item href="/openCard">Просмотр карты</NavDropdown.Item>
                            <NavDropdown.Item href="/writeMessage">Написать менеджеру</NavDropdown.Item>
                            <NavDropdown.Item href="/info">Заполнить данные</NavDropdown.Item>
                            <NavDropdown.Item href={`watchInfo/${id}`}>Просмотр данных</NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown>
                    )
                case 'manager':
                    return (
                        <NavDropdown className="justify-content-end ml-auto" title="Аккаунт" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/appointment">Запись на прием</NavDropdown.Item>
                            <NavDropdown.Item href="/registerDoctor">Добавить персонал</NavDropdown.Item>
                            <NavDropdown.Item href="/checkMessage">Просмотр сообщений</NavDropdown.Item>
                            <NavDropdown.Item href="/openOrder">Просмотр сметы</NavDropdown.Item>
                            <NavDropdown.Item href="/checkMessage">Просмотр сообщений</NavDropdown.Item>
                            <NavDropdown.Item href="/createOrder">Просмотр материалов</NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown>
                    );
                case 'doctor':
                    return (
                        <NavDropdown className="justify-content-end ml-auto" title="Аккаунт" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/showcards">Просмотр карты</NavDropdown.Item>
                            <NavDropdown.Item href="/checkMessage">Просмотр сообщений</NavDropdown.Item>
                            <NavDropdown.Item href="/writeMessage">Написать менеджеру</NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown>
                    );
                case 'nurse':
                    return (
                        <NavDropdown className="justify-content-end ml-auto" title="Аккаунт" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/appointment">Запись на прием</NavDropdown.Item>
                            <NavDropdown.Item href="/showcards">Просмотр карты</NavDropdown.Item>
                            <NavDropdown.Item href="/changeCard">Заполнить карту</NavDropdown.Item>
                            <NavDropdown.Item href="/create">Заполнить смету</NavDropdown.Item>
                            <NavDropdown.Item href="/writeMessage">Написать менеджеру</NavDropdown.Item>
                            <NavDropdown.Item href="/checkMessage">Просмотр сообщений</NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown>
                    );
                default:
                    break;
            }
        }
    }

    return (
        <>
            <Navbar expand="lg" className={s.navbar}>
                <Navbar.Brand href="/" className="text-white">
                    <img
                        alt="logo"
                        src={image}
                        width="60"
                        height="65"
                        className="d-inline-block align-top"
                    />{' '} Dental Clinic
                </Navbar.Brand>
                <Navbar.Collapse >
                    <div className="ml-5">ПН - ПТ: 9:00 - 21:00<br></br>СБ, ВС - выходной </div>
                    <div className="ml-5"><Phone /> +375 33 674-02-51</div>
                    <Nav className="ml-auto">
                        <Nav.Link href="/about">О нас</Nav.Link>
                        <Nav.Link href="/services">Услуги</Nav.Link>
                        <Nav.Link href="/doctors">Наши врачи</Nav.Link>
                        <Nav.Link href="/news">Новости</Nav.Link>
                        <Nav.Link href="/review">Отзывы</Nav.Link>
                    </Nav>

                    {showButtonAuthUser()}
                    {isAuth && <Nav.Link href="/" className="btn justify-content-end ml-auto" onClick={logoutHandler}>
                        <Button>Logout</Button>  </Nav.Link>}
                    {!isAuth && <Nav.Link className="btn" href="/auth"><Button variant="outline-light">Вход/Регистрация</Button></Nav.Link>}
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}