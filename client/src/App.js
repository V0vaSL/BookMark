import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import BookPage from './components/pages/BookPage';
import Library from './components/pages/Library';
import UserState from './components/context/user/UserState';
import AlertState from './components/context/alert/AlertState';
import BookState from './components/context/book/BookState';

function App() {
  return (
    <AlertState>
      <UserState>
        <BookState>
          <Router>
            <Navbar />
            <Alert />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/book/:book' component={BookPage} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/library/' component={Library} />
              </Switch>
            </div>
          </Router>
        </BookState>
      </UserState>
    </AlertState>
  );
}

export default App;
