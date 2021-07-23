import React from "react";
import axios from "axios";
import Table from "@material-ui/core/table"
import Paper from '@material-ui/core/Paper';

import "./Cars.css"
import {TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles} from "@material-ui/core";
import * as PropTypes from "prop-types";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
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
        cars: []
    }


    componentDidMount() {
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

            return cars.map((car) => (
                <StyledTableRow key={car.id}>
                    <StyledTableCell component="th" scope="row">
                        {car.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{car.model}</StyledTableCell>
                    <StyledTableCell align="right">{car.year}</StyledTableCell>
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
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Car</StyledTableCell>
                                <StyledTableCell align="right">Model</StyledTableCell>
                                <StyledTableCell align="right">Year</StyledTableCell>
                                <StyledTableCell align="right">Color</StyledTableCell>
                                <StyledTableCell align="right">Owner ID</StyledTableCell>
                            </TableRow>
                        </TableHead>
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