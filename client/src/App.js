import React, {useEffect, useState} from "react";
import Cars from "./pages/Cars";
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import CarDetails from "./pages/CarDetails";
import Home from "./pages/Home";
import AddCar from "./pages/AddCar";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import "./App.css"
import axios from "axios";
import AdminNavbar from "./components/AdminNavbar";
import {Grid} from "@material-ui/core";
import Map from "./components/Map";

import openMap, {createOpenLink} from 'react-native-open-maps';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000000",
        backgroundImage: `linear-gradient(315deg, #000000 0%, #414141 74%)`,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ecf0f1'
    },
    emojis: {
        fontSize: 46,
        marginBottom: 10
    },
    coordinates: {
        fontSize: 14,
        fontWeight: '500',
        color: '#bdc3c7'
    }
});


function App () {
    const [userArray, setUserArray] = useState([{}])
    const [isLogged, setIsLogged] = useState(false);



   const _goToYosemite = () => {
        openMap({ latitude: 43.2172, longitude: 27.8858 });
    }

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
    const setLog = () => {
        setIsLogged(false);
        setUserArray([{}]);
    }

    if(isLogged === true)
    {
        if(userArray[0].first_name === "Marin")
        {
            return(
                <Grid direction={"column"} className="App">
                    <Router>
                        <Grid sm={12}>
                        <AdminNavbar/>
                        </Grid>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/cars" exact component={Cars}/>
                            <Route path="/cars/add"  component={AddCar}/>
                            <Route path="/cars/:id"  component={CarDetails}/>
                            <Route path="/signup"  component={SignUp}/>
                            <Route path="/login"  component={Login}/>
                        </Switch>
                        <View style={styles.container}>
                            <Text style={styles.header}>Car's homeland</Text>
                            <Text style={styles.emojis}>🏎️🏎️🏎️</Text>
                            <Text style={styles.header}>Apple Maps</Text>

                            <Button
                                color={'#D2042D'}
                                onPress={createOpenLink({ latitude: 44.4072,
                                    longitude: 8.9340, provider: 'apple', zoom: 30})}
                                title="Ferrari's office in Italy 🏎️"
                            />
                            <Button
                                color={'#D2042D'}
                                onPress={createOpenLink({ latitude: 48.7904,
                                    longitude: 11.4979, provider: 'apple'})}
                                title="Bavaria 🏎️"
                            />
                        </View>
                        <Footer/>

                    </Router>
                    <button color={"black"} onClick={setLog}>Logout</button>
                </Grid>
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
                        <View style={styles.container}>
                            <Text style={styles.header}>Car's homeland</Text>
                            <Text style={styles.emojis}>🏎️🏎️🏎️</Text>
                            <Text style={styles.header}>Apple Maps</Text>

                            <Button
                                color={'#D2042D'}
                                onPress={createOpenLink({ latitude: 44.4072,
                                    longitude: 8.9340, provider: 'apple', zoom: 30})}
                                title="Ferrari's office in Italy 🏎️"
                            />
                            <Button
                                color={'#D2042D'}
                                onPress={createOpenLink({ latitude: 48.7904,
                                    longitude: 11.4979, provider: 'apple'})}
                                title="Bavaria 🏎️"
                            />
                        </View>
                        <Footer/>

                    </Router>

                </div>
            )
        }
    }

    else {
        return(
            <Grid direction={"column"} className="App">
                <Router>
                <Grid item sm={12}>
                    <Navbar/>
                </Grid>

                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/cars" exact component={Cars}/>
                        <Route path="/cars/add"  component={AddCar}/>
                        <Route path="/cars/:id"  component={CarDetails}/>
                        <Route path="/signup"  component={SignUp}/>
                        <Route path="/login"  component={Login}/>
                    </Switch>
                    <View style={styles.container}>
                        <Text style={styles.header}>Cars' homeland</Text>
                        <Text style={styles.emojis}>🏎️🏎️🏎️</Text>
                        <Text style={styles.header}>Apple Maps</Text>

                        <Button
                            color={'#D2042D'}
                            onPress={createOpenLink({ latitude: 44.4072,
                                longitude: 8.9340, provider: 'apple', zoom: 30})}
                            title="Ferrari's office in Italy 🏎️"
                        />
                        <Button
                            color={'#D2042D'}
                            onPress={createOpenLink({ latitude: 48.7904,
                                longitude: 11.4979, provider: 'apple'})}
                            title="Bavaria 🏎️"
                        />
                    </View>


                    <Grid item sm={12}>
                    <Footer/>
                    </Grid>
                </Router>

            </Grid>
        )
    }

}

export default App;