import React, {useEffect, useState} from "react";
import TableHeader from "./TableHeader";
import {TableBody, TableCell, TableContainer, TablePagination, TableRow, withStyles} from "@material-ui/core";

import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/table";
import Link from "@material-ui/core/Link";


export default function TableContent()
{
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





    const [cars, setCars] = useState([]);
    const [orderDirection, setOrderDirection] = useState("asc");
    const [valueToOrderBy, setvalueToOrderBy] = useState("name");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);

    const getCars = () =>
    {
        axios.get("http://localhost:8080/cars")
            .then((response) => {
                const data = response.data;
                setCars(data);
                console.log("Data has been received")
            })
            .catch(() => {
                alert("Error retrieving data");
            })
    }
    useEffect(() => {
        getCars();
    }, []);

    const sortedRowInformation = (rowArray, comparator) => {
        const stabilizedRowArray = rowArray.map((el,index) => [el,index])
        stabilizedRowArray.sort((a,b) => {
            const order = comparator(a[0], b[0])
            if(order !== 0) return order;
            return a[1] - b[1];
        })
        return stabilizedRowArray.map((el) => el[0])
    }

    function descendingComparator(a,b,orderBy)
    {
        if(b[orderBy] < a[orderBy])
        {
            return -1;
        }
        if(b[orderBy] > a[orderBy])
        {
            return 1;
        }
        else
            return 0;
    }

    function getComparator(order, orderBy) {
        return order === "desc"
        ? (a,b) => descendingComparator(a,b,orderBy)
        : (a,b) => -descendingComparator(a,b,orderBy)
    }

    const handleRequestSort = (event,property) => {
        const isAscending = (valueToOrderBy === property && orderDirection === "asc");
        setvalueToOrderBy(property);
        setOrderDirection(isAscending ? "desc" : "asc");
}

const handleChangePage  = (event,newPage) => {
        setPage(newPage);
}
const handleChangeRowsPerPage = (event) =>
{
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
}
    return(
        <>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                <TableHeader
                valueToOrderBy={valueToOrderBy}
                orderDirection={orderDirection}
                handleRequestSort={handleRequestSort}
                />
            {getCars}
                <TableBody>
                    {
            sortedRowInformation(cars, getComparator(orderDirection,valueToOrderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((car,index) => (
                <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                        <Link to="/cars/:id">
                            <li>{car.name}</li>
                        </Link>
                    </StyledTableCell>
                    <StyledTableCell align="right">{car.model}</StyledTableCell>
                    <StyledTableCell
                        align="right">{car.year}</StyledTableCell>
                    <StyledTableCell align="right">{car.color}</StyledTableCell>
                    <StyledTableCell align="right">{car.description}</StyledTableCell>
                    <StyledTableCell align="right">{car.user_id}</StyledTableCell>
                    <StyledTableCell align="center"><img src={car.photo} alt="Car photo"/></StyledTableCell>
                </StyledTableRow>
            ))
        }
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination count={cars.length}
                             page={page}
                             onPageChange={handleChangePage}
                             onRowsPerPageChange={handleChangeRowsPerPage}
                             rowsPerPageOptions={[2, 4, 10]}
                             rowsPerPage={rowsPerPage}
                             component="div"/>
        </>
    )

}