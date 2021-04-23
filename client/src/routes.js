import { Switch, Route, Redirect } from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {AuthPage} from './pages/AuthPage'

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/create" exact>
                    <LinksPage />
                </Route>
                <Route path="/detail/:id" exact>
                    <LinksPage />
                </Route>
                <Redirect to="/create" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}