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

    const allRoutes = () => {
        return (
            <Switch>
                <Route path="/" exact>
                <HomePage />
                </Route>
                <Route path="/about" exact>
                    <AboutPage />
                </Route>
                <Route path="/services" exact>
                    <Services />
                </Route>
                <Route path="/doctors" exact>
                    <Doctors />
                </Route>
                <Route path="/news" exact>
                    <News />
                </Route>
                <Route path="/review" exact>
                    <Reviews />
                </Route>
                <Redirect to="/" />
            </Switch>
        )
    }

    if (isAuthenticated) {
        return (
            <>
                {allRoutes()}
                {routByRole()}
            </>
        )
    }

    return (
        <Switch>
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