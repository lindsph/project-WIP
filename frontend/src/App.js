import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios';
import Navigation from './Navigation/Navigation';
import Landing from './Landing';
import Dashboard from './Dashboard/Dashboard';
import Form from './Form';
import ErrorPage from './ErrorPage';
import Backdrop from './Modal/Backdrop';
import Modal from './Modal/Modal';
import './App.module.css';

import StocksList from './Dashboard/Stocks/StocksList';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);


  const handleLogin = (email, password) => {
    // check if in users list
      // use context/db later
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

  const handleSignUp = (email, password) => {
    // add to users list
  }

  const toggleModal = () => {
    // check accessibility too!
    setModalIsOpen(prevState => !prevState);
  }

  return (
    <>
    <Router>
      <Navigation/>
      <Route path="/:userId/stocks"><StocksList/></Route>
      <main>
        <Switch>
          <Route exact path="/" component={Landing}></Route>
          <Route path="/sign_in">
            <Form login={handleLogin}/>
          </Route>
            <Route path="/sign_up">
              <Form signup={handleSignUp} />
            </Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="*" component={ErrorPage}></Route>
        </Switch>
      </main>
    </Router>
    <button onClick={toggleModal}>modal button (temporary)</button>
    <Backdrop isOpen={modalIsOpen} onClick={toggleModal}/>
    <Modal isOpen={modalIsOpen} onClose={toggleModal}/>
    </>
  );
}

export default App;

