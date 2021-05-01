import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from '../pages/AuthPage'
import { ClientRoutes } from './userRoutes'
import AdminRoutes from './adminRoutes'
import ManagerRoutes from './managerRoutes'
import DoctorRoutes from './doctorRoutes'
import NurseRoutes from './nurseRoutes'

export const useRoutes = (isAuthenticated, userRole) => {
    if (isAuthenticated) {
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
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}