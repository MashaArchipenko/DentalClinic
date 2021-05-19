import { Switch, Route, Redirect } from "react-router"
import { HomePage } from '../pages/HomePage'
import { AboutPage } from '../pages/AboutPage'
import { Services } from '../pages/Services'
import { Doctors } from '../pages/Doctors'
import { News } from '../pages/News'
import { Reviews } from '../pages/Reviews'
import { Appointment } from '../functional components/Appointment'
import { AddReview } from '../functional components/AddReview'
import { CheckMessage } from "../functional components/CheckMessage"
import { AddDoctor } from '../functional components/AddDoctor'
import { AddWorkShedule } from "../functional components/AddWorkShedule"


export const ManagerRoutes = () => {
    return (
        <Switch>
        <Route path="/registerDoctor" component={AddDoctor} exact />
        <Route path="/" component={HomePage} exact />
        <Route path="/about" component={AboutPage} exact />
        <Route path="/services" component={Services} exact />
        <Route path="/doctors" component={Doctors} exact />
        <Route path="/news" component={News} exact />
        <Route path="/review" component={Reviews} exact />
        <Route path="/addWorkShedule" component={AddWorkShedule} exact />
        <Route path="/appointment/:id" component={Appointment} exact />
        <Route path="/appointment" component={Appointment} exact />
        <Route path="/addReview" component={AddReview} exact />
        <Route path="/checkMessage" component={CheckMessage} exact />
        <Redirect to="/" />
    </Switch>
    )
}
