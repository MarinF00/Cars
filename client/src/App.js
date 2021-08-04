import React, {useEffect, useState} from "react";
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
import axios from "axios";
import AdminNavbar from "./components/AdminNavbar";
import Contacts from "./pages/Contacts";




function App () {
    const [userArray, setUserArray] = useState([{}])
    const [isLogged, setIsLogged] = useState(false);



    useEffect(() => {
        getUser();
    }, []);

    const getUser = () =>
    {
        axios.get("http://localhost:8080/user")
            .then((response) => {
                const data = response.data;
                setUserArray(data);
                for(let i = 0; i <= data.length; i++) {
                    for (let property in data[i]) {
                        setIsLogged(true);
                    }
                }
            })
            .catch(() => {
                alert("Error retrieving data");
            })

    }

    if(isLogged === true)
    {
        if(userArray[0].first_name === "Marin")
        {
            return(
                <div className="App">
                    <Router>
                        <AdminNavbar/>
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
        else
        {
            return(
                <div className="App">
                    <Router>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/cars" exact component={Cars}/>
                            <Route path="/cars/add"  component={AddCar}/>
                            <Route path="/cars/:id"  component={CarDetails}/>
                            <Route path="/signup"  component={SignUp}/>
                            <Route path="/login"  component={Login}/>
                        </Switch>
                        <StickyFooter/>
                    </Router>

                </div>
            )
        }
    }

    else {
        return(
            <div className="App">
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

                    <StickyFooter/>

                </Router>

            </div>
        )
    }


}

export default App;