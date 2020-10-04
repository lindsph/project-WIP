import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import axios from 'axios';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Form from './Form';
import ErrorPage from './ErrorPage';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (email, password) => {
    // temporary measure, add to db and add as context?
    setIsLoading(true);
    const response = axios.get('http://localhost:5000/users')
      .then(response => {
        const users = response.data.users;
        console.log(users);
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Router>
      <>
      <header>
        <nav>
          <NavLink to="/sign_in">Sign in</NavLink>
        </nav>
      </header>
      <Switch>
        <Route exact path="/" component={Landing}></Route>
        <Route path="/sign_in">
          <Form login={handleLogin}/>
        </Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="*" component={ErrorPage}></Route>
      </Switch>
      </>
    </Router>
  );
}

export default App;

