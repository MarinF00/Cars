import React, {useEffect, useState} from "react";
import Cars from "./pages/Cars";
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import CarDetails from "./pages/CarDetails";
import Home from "./pages/Home";
import Update from "./pages/Update";
import AddCar from "./pages/AddCar";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import "./App.css"
import axios from "axios";
import AdminNavbar from "./components/AdminNavbar";
import {Grid} from "@material-ui/core";
import Layers from "./map/layers/Layers";
import TileLayer from "./map/layers/TileLayer";
import VectorLayer  from "./map/layers/VectorLayer";
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from 'ol/style';
import { osm, vector } from "./map/source";
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import Controls from "./map/controls/Controls"
import FullScreenControl from "./map/controls/FullScreenControl"
import openMap, {createOpenLink} from 'react-native-open-maps';
import mapConfig from "./config.json";
import Map from "./map/Map";
import FeatureStyles from "./map/Features/FeatureStyles";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import {Feature} from "ol";
import {Point} from "ol/geom";

const geojsonObject = mapConfig.geojsonObject;
const geojsonObject2 = mapConfig.geojsonObject2;
const markersLonLat = [mapConfig.VarnaCityLonLat, mapConfig.blueSpringsLonLat];
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
    },
    'MultiPolygon': new Style({
        stroke: new Stroke({
            color: 'blue',
            width: 1,
        }),
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)',
        }),
    }),
});
function addMarkers(lonLatArray) {
    let iconStyle = new Style({
        image: new Icon({
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            src: mapConfig.markerImage32,
        }),
    });
    let features = lonLatArray.map((item) => {
        let feature = new Feature({
            geometry: new Point(fromLonLat(item)),
        });
        feature.setStyle(iconStyle);
        return feature;
    });
    return features;
}

function App () {
    const [userArray, setUserArray] = useState([{}])
    const [isLogged, setIsLogged] = useState(false);
    const [center, setCenter] = useState(mapConfig.center);
    const [zoom, setZoom] = useState(9);

    const [showLayer1, setShowLayer1] = useState(true);
    const [showLayer2, setShowLayer2] = useState(true);
    const [showMarker, setShowMarker] = useState(false);

    const [features, setFeatures] = useState(addMarkers(markersLonLat));


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
                                    longitude: 8.9340, provider: 'osm', zoom: 30})}
                                title="Ferrari's office in Italy 🏎️"
                            />
                            <Button
                                color={'#D2042D'}
                                onPress={createOpenLink({ latitude: 48.7904,
                                    longitude: 11.4979, provider: 'apple'})}
                                title="Bavaria 🏎️"
                            />
                        </View>
                        <Map center={fromLonLat(center)} zoom={zoom}>
                            <Layers>
                                <TileLayer source={osm()} zIndex={0} />
                                {showLayer1 && (
                                    <VectorLayer
                                        source={vector({
                                            features: new GeoJSON().readFeatures(geojsonObject, {
                                                featureProjection: get("EPSG:3857"),
                                            }),
                                        })}
                                        style={FeatureStyles.MultiPolygon}
                                    />
                                )}
                                {showLayer2 && (
                                    <VectorLayer
                                        source={vector({
                                            features: new GeoJSON().readFeatures(geojsonObject2, {
                                                featureProjection: get("EPSG:3857"),
                                            }),
                                        })}
                                        style={FeatureStyles.MultiPolygon}
                                    />
                                )}
                                {showMarker && <VectorLayer source={vector({ features })} />}
                            </Layers>
                            <Controls>
                                <FullScreenControl />
                            </Controls>
                        </Map>
                        <div>
                            <input
                                type="checkbox"
                                checked={showLayer1}
                                onChange={(event) => setShowLayer1(event.target.checked)}
                            />{" "}
                            Chaika
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                checked={showLayer2}
                                onChange={(event) => setShowLayer2(event.target.checked)}
                            />{" "}
                            Artisans
                        </div>
                        <hr />
                        <div>
                            <input
                                type="checkbox"
                                checked={showMarker}
                                onChange={(event) => setShowMarker(event.target.checked)}
                            />{" "}
                            Show markers
                        </div>
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
                        <Route path="/cars/:id" exact component={CarDetails}/>
                        <Route path="/cars/:id/update"  component={Update}/>
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
                    <Map center={fromLonLat(center)} zoom={zoom}>
                        <Layers>
                            <TileLayer source={osm()} zIndex={0} />
                            {showLayer1 && (
                                <VectorLayer
                                    source={vector({
                                        features: new GeoJSON().readFeatures(geojsonObject, {
                                            featureProjection: get("EPSG:3857"),
                                        }),
                                    })}
                                    style={FeatureStyles.MultiPolygon}
                                />
                            )}
                            {showLayer2 && (
                                <VectorLayer
                                    source={vector({
                                        features: new GeoJSON().readFeatures(geojsonObject2, {
                                            featureProjection: get("EPSG:3857"),
                                        }),
                                    })}
                                    style={FeatureStyles.MultiPolygon}
                                />
                            )}
                            {showMarker && <VectorLayer source={vector({ features })} />}
                        </Layers>
                        <Controls>
                            <FullScreenControl />
                        </Controls>
                    </Map>
                    <div>
                        <input
                            type="checkbox"
                            checked={showLayer1}
                            onChange={(event) => setShowLayer1(event.target.checked)}
                        />{" "}
                        Chaika
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            checked={showLayer2}
                            onChange={(event) => setShowLayer2(event.target.checked)}
                        />{" "}
                        Artisans
                    </div>
                    <hr />
                    <div>
                        <input
                            type="checkbox"
                            checked={showMarker}
                            onChange={(event) => setShowMarker(event.target.checked)}
                        />{" "}
                        Show markers
                    </div>

                    <Grid item sm={12}>
                    <Footer/>
                    </Grid>
                </Router>

            </Grid>
        )
    }

}

export default App;