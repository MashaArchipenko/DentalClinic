import 'materialize-css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Navbarr } from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes/routes';

function App() {
  const { token, login, logout, userId, userRole } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated,userRole)
  return (
    <AuthContext.Provider value={{ token, login, logout, userId, userRole, isAuthenticated }}>
      
      <Router>
        <Navbarr role={userRole} isAuth={isAuthenticated}/>
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
