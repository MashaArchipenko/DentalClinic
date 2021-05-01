import { useContext } from 'react'
import { NavLink, useHistory } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export const Navbar = props => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    console.log(props.role)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <nav>
            <div className="nav-wrapper blue darken-1">
                <NavLink to="/" className="brand-logo">Logo</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Создать</NavLink></li>
                    <li><NavLink to="/links">Ссылки</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>logout</a></li>
                </ul>
            </div>
        </nav>
    )
}