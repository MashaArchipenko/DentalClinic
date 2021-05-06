import { Switch, Route, Redirect } from 'react-router-dom'
import {Appointment} from '../functional components/Appointment'
import {CreatePage } from '../pages/CreatePage'
import {AddReview} from '../functional components/AddReview'
import {CheckMessage} from "../functional components/CheckMessage"

export const ClientRoutes = () => {
    return (
        <Switch>
            <Route path="/links" exact>
            <CreatePage />
            </Route>
            <Route path="/appointment" component={Appointment} exact />
            <Route path="/addReview" component={AddReview} exact/>
            <Route path="/checkMessage" component={CheckMessage} exact/>
            <Redirect to="/" />
        </Switch>
    )
}