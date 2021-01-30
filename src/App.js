import React, {Component} from "react";
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


import MainPage from "./pages";
import NotFoundPage from "./pages/404";
import LoginPage from "./pages/login"
import RegisterPage from "./pages/Register";

class App extends Component {
    render(){
       return <Router>
           <div className="App">
           <nav className="navbar navbar-expand-lg navbar-light fixed-top">
               <div className="container">
                   <Link className="navbar-brand" to={"/"}>BIU PROJEKT</Link>
                   <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                       <ul className="navbar-nav ml-auto">
                           <li className="nav-item">
                               <Link className="nav-link" to={"/login"}>Sign in</Link>
                           </li>
                           <li className="nav-item">
                               <Link className="nav-link" to={"/register"}>Sign up</Link>
                           </li>
                       </ul>
                   </div>
               </div>
           </nav>

           <Switch>
           <Route exact path="/" component={MainPage}/>
           <Route exact path="/login" component={LoginPage}/>
           <Route exact path="/register" component={RegisterPage}/>
           <Route exact path="/404" component={NotFoundPage}/>
           <Redirect to="/404"/>
           </Switch>

           </div>
       </Router>
    }
}

export default App;
