import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from '../pages/AuthPage'
import { ClientRoutes } from './userRoutes'
import AdminRoutes from './adminRoutes'
import ManagerRoutes from './managerRoutes'
import DoctorRoutes from './doctorRoutes'
import NurseRoutes from './nurseRoutes'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import Services from '../pages/Services'
import Doctors from '../pages/Doctors'
import News from '../pages/News'
import Reviews from '../pages/Reviews'

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

    if (isAuthenticated) {
        return (
            <>
            <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/about" component={AboutPage} exact />
                <Route path="/services" component={Services} exact />
                <Route path="/doctors" component={Doctors} exact />
                <Route path="/news" component={News} exact />
                <Route path="/review" component={Reviews} exact />
            </Switch>
                {routByRole()}
            </>
        )
    }
else return (
        <Switch>
            <Route path="/" component={HomePage} exact />
                <Route path="/about" component={AboutPage} exact />
                <Route path="/services" component={Services} exact />
                <Route path="/doctors" component={Doctors} exact />
                <Route path="/news" component={News} exact />
                <Route path="/review" component={Reviews} exact />
            <Route path="/" exact>
                <HomePage />
            </Route>
            <Route path="/auth" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}