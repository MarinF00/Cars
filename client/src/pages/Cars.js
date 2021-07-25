import React from "react";
import axios from "axios";
import Table from "@material-ui/core/table"
import Paper from '@material-ui/core/Paper';
import "./Cars.css"
import {TableBody, TableCell, TableContainer, TableRow, withStyles} from "@material-ui/core";
import TableContent from "../components/TableContent";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);


const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

class Cars extends React.Component {

     state = {
        title: "",
        body: "",
        cars: [],
        columnToSort:"",
        sortDirection:"desc"
    }


     componentDidMount = () => {
        this.getCars();
    }


     getCars = () =>
    {
        axios.get("http://localhost:8080/cars")
            .then((response) => {
                const data = response.data;
                this.setState({cars: data})
                console.log("Data has been received")
            })
            .catch(() => {
                alert("Error retrieving data");
            })
    }



     displayCarsProperty = (cars) => {

        return  cars.map((car) => (
            <StyledTableRow key={car.id}>
                <StyledTableCell component="th" scope="row">
                    {car.name}
                </StyledTableCell>
                <StyledTableCell align="right">{car.model}</StyledTableCell>
                <StyledTableCell
                    align="right">{car.year}</StyledTableCell>
                <StyledTableCell align="right">{car.color}</StyledTableCell>
                <StyledTableCell align="right">{car.user_id}</StyledTableCell>
            </StyledTableRow>
        ))
    }

    render() {
        return(
            <div>
                <h1>Car list</h1>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                    <TableContent/>
                        <TableBody>
                            {this.displayCarsProperty(this.state.cars)}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>

        )
    }
}
export default Cars;