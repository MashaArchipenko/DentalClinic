import { Switch, Route, Redirect } from 'react-router-dom'

import { CreatePage } from '../pages/CreatePage'

export const ClientRoutes = () => {
    return (
        <Switch>
            <Route path="/links" exact>
            <CreatePage />
            </Route>
            <Route path="/create" exact>
                <CreatePage />
            </Route>
            <Redirect to="/create" />
        </Switch>
    )
}