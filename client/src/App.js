import { BrowserRouter as Router } from 'react-router-dom'
import {Loader} from './components/Loader';
import { Navbarr } from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes/routes';
import Footer from './components/Footer'

function App() {
  const { token, login, logout, userId, userRole,ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated,userRole)
  if(!ready)
  {
    return <Loader />
  }
  
  return (
  
    <AuthContext.Provider value={{ token, login, logout, userId, userRole, isAuthenticated }}>
        <Router>
          <Navbarr role={userRole} isAuth={isAuthenticated} id={userId}/>
        <div>
          {routes}
          </div>
          <Footer/>
          </Router>
    </AuthContext.Provider>
    
  );
}

export default App;
