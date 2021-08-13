import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

function CarDetails() {
    const [cars, setCars] = useState([]);
    const location = useLocation();
    let re = /\d+/g;
   const myLocation = location.pathname.match(re);

    useEffect(() => {
        getCars();
    }, []);

    const getCars = () =>
    {
        axios.get("http://localhost:8080/cars")
            .then((response) => {
                const data = response.data;
                setCars(data);console.log("Data has been received")
            })
            .catch(() => {
                alert("Error retrieving data");
            })
    }

    const deleteCar = (id) => {
        axios.delete(`http://localhost:8080/cars/${id}`).then( window.location = "/")



    }




    function displayCarsProperty(cars) {

        return  cars.filter(car => car.id == myLocation).map((car) => (
            <div style={{background: `url(${car.photo}) center fixed no-repeat`, backgroundSize: "cover", height:"100vh",

                  }}>

                <Grid
                    spacing={1}
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >

                        <Typography style={{color: "whitesmoke"}} variant={"h1"} align={"left"}>{car.name} </Typography>


                        <Typography style={{color: "whitesmoke"}} variant={"h1"} align={"center"}>{car.model} </Typography>

                        <Typography style={{color: "whitesmoke"}} variant={"h1"} align={"right"}>{car.year} </Typography>


                </Grid>
                <Button style={{}} type="submit"><a href={`/cars/${car.id}/update`}>Update</a> </Button>
                <Button onClick={() => deleteCar(car.id)}>Delete</Button>
            </div>
        ))
    }

    return(
        <div>
        {displayCarsProperty(cars)}
        </div>
    )
}
export default CarDetails;