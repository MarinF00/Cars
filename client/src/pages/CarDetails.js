import React from "react";
import axios from "axios";

class CarDetails extends React.Component {
    state = {
        title: "",
        body: "",
        cars: []
    }
    componentDidMount() {
        this.getCars();
    }


    getCars = () =>
    {
        axios.get("http://localhost:8080/cars/:id")
            .then((response) => {
                const data = response.data;
                this.setState({cars: data})
                console.log("Data has been received")
            })
            .catch(() => {
                alert("Error retrieving data");
            })
    }



    displayCars = (cars) => {
        return cars.map((car, index) => (
            <div key={index}>
                <h1>{car.model}</h1>
                <h2>{car.year}</h2>
            </div>
        ))
    }

    render() {
        return(
            <div>
                <h1>This Car Details</h1>
                <div className="cars">
                    <h2>{this.displayCars(this.state.cars)}</h2>
                </div>
            </div>
        )
    }
}
export default CarDetails;