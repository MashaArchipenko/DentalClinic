import { Switch, Route, Redirect } from "react-router"
import { HomePage } from '../pages/HomePage'
import { AboutPage } from '../pages/AboutPage'
import { Services } from '../pages/Services'
import { Doctors } from '../pages/Doctors'
import { News } from '../pages/News'
import { Reviews } from '../pages/Reviews'
import { Appointment } from '../functional components/Appointment'
import { AddReview } from '../functional components/AddReview'
import { AddCardInfo } from "../functional components/AddCardInfo"
import { AddEstimate } from "../functional components/AddEstimate"
import {ActiveAppointment} from "../functional components/ActiveAppointment"
import { ShowShedule } from "../functional components/ShowShedule"

export const NurseRoutes=()=>
{
    return(
        <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/about" component={AboutPage} exact />
        <Route path="/services" component={Services} exact />
        <Route path="/doctors" component={Doctors} exact />
        <Route path="/news" component={News} exact />
        <Route path="/review" component={Reviews} exact />
        <Route path="/appointment" component={Appointment} exact />
        <Route path="/addReview" component={AddReview} exact />
        <Route path="/active" component={ActiveAppointment} exact />
        <Route path="/addCardInfo/:id" component={AddCardInfo} exact/>
        <Route path="/addEstimate/:id" component={AddEstimate} exact />
        <Redirect to="/" />
    </Switch>
    )
}