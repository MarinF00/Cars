import React from "react";
import Cars from "./pages/Cars";
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import CarDetails from "./pages/CarDetails";
import Home from "./pages/Home";
import AddCar from "./pages/AddCar";
import StickyFooter from "./components/Footer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import "./App.css"


class App extends React.Component {

render() {
    return(
        <div>
            <Router>
                <Navbar/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/cars" exact component={Cars}/>
                    <Route path="/cars/add"  component={AddCar}/>
                    <Route path="/cars/:id"  component={CarDetails}/>
                    <Route path="/signup"  component={SignUp}/>
                    <Route path="/login"  component={Login}/>
                </Switch>
            </Router>
            <StickyFooter/>
        </div>
    )
}
}

export default App;