import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from '../pages/AuthPage'
import { HomePage } from '../pages/HomePage'
import { AboutPage } from '../pages/AboutPage'
import { Services } from '../pages/Services'
import { Doctors } from '../pages/Doctors'
import { News } from '../pages/News'
import { Reviews } from '../pages/Reviews'
import { Appointment } from '../functional components/Appointment'
import { CheckMessage } from "../functional components/CheckMessage"
import { ClientRoutes } from './ClientRoutes'
import { ManagerRoutes } from './ManagerRoutes'
import { NurseRoutes } from './NursRoutes'
import { DoctorRoutes } from './DoctorRoutes'
import { AdminRoutes } from './AdminRoutes'

export const useRoutes = (isAuthenticated, userRole) => {
   
    if (isAuthenticated) {
        switch (userRole) {
            case "client":
                return <ClientRoutes />
            case "manager":
                return <ManagerRoutes />
            case "ners":
                return <NurseRoutes />
            case "doctor":
                return <DoctorRoutes />
            case "admin":
                return <AdminRoutes />
            default:
                break;
        }

    }

    else return (
        <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/about" component={AboutPage} exact />
            <Route path="/services" component={Services} exact />
            <Route path="/doctors" component={Doctors} exact />
            <Route path="/news" component={News} exact />
            <Route path="/review" component={Reviews} exact />
            <Route path="/auth" component={AuthPage} exact />
            <Route path="/appointment" component={Appointment} exact />
            <Route path="/checkMessage" component={CheckMessage} exact />
            <Redirect to="/" />
        </Switch>
    )

}