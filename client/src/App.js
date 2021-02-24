import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Alert from './components/layout/Alert';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import BookPage from './components/pages/BookPage';
import Library from './components/pages/Library';
import UserState from './components/context/user/UserState';
import AlertState from './components/context/alert/AlertState';
import BookState from './components/context/book/BookState';
import PrivateRoute from './components/routing/PrivateRoute';

function App() {
  return (
    <AlertState>
      <BookState>
        <UserState>
          <Router>
            <div className='app'>
              <Navbar />
              <div className='alert-container'>
                <Alert />
              </div>
              <div className='container'>
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <PrivateRoute exact path='/book/:book' component={BookPage} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                  <PrivateRoute exact path='/library/' component={Library} />
                </Switch>
              </div>
              <Footer />
            </div>
          </Router>
        </UserState>
      </BookState>
    </AlertState>
  );
}

export default App;
