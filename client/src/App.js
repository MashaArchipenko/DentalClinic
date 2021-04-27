import 'materialize-css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Navbar } from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes/routes';

function App() {
  const { token, login, logout, userId, userRole } = useAuth()
  const isAuthenticated = !!token
  //console.log(isAuthenticated)
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={{ token, login, logout, userId, userRole, isAuthenticated }}>
      {console.log(userRole)}
      <Router>
        {isAuthenticated && <Navbar />}

        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
