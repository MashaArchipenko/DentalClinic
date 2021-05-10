import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from '../pages/AuthPage'
import { ClientRoutes } from './userRoutes'
import AdminRoutes from './adminRoutes'
import ManagerRoutes from './managerRoutes'
import DoctorRoutes from './doctorRoutes'
import NurseRoutes from './nurseRoutes'
import {HomePage} from '../pages/HomePage'
import {AboutPage} from '../pages/AboutPage'
import {Services} from '../pages/Services'
import {Doctors} from '../pages/Doctors'
import {News} from '../pages/News'
import {Reviews} from '../pages/Reviews'
import {Appointment} from '../functional components/Appointment'
import {AddReview} from '../functional components/AddReview'
import {CheckMessage} from "../functional components/CheckMessage"

export const useRoutes = (isAuthenticated, userRole) => {

    const routByRole = () => {
        switch (userRole) {
            case 'client':
                return <ClientRoutes />
            case 'admin':
                return <AdminRoutes />
            case 'manager':
                return <ManagerRoutes />
            case 'doctor':
                return <DoctorRoutes />
            case 'norse':
                return <NurseRoutes />
            default:
                break;
        }
    }

    return (<>
        <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/about" component={AboutPage} exact />
            <Route path="/services" component={Services} exact />
            <Route path="/doctors" component={Doctors} exact />
            <Route path="/news" component={News} exact />
            <Route path="/review" component={Reviews} exact />
            <Route path="/auth" component={AuthPage} exact />
            <Route path="/appointment" component={Appointment} exact />
            <Route path="/addReview" component={AddReview} exact/>
            <Route path="/checkMessage" component={CheckMessage} exact/>
            <Redirect to="/"/>
        </Switch> 
        
        </>
    )

}