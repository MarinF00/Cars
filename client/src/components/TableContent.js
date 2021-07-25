import React, {useState} from "react";
import TableHeader from "./TableHeader";
import {TableCell, TableRow, withStyles} from "@material-ui/core";

import axios from "axios";


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





    const [cars, setCars] = useState([]);
    const [orderDirection, setOrderDirection] = useState("asc");
    const [valueToOrderBy, setvalueToOrderBy] = useState("name");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setrowsPerPage] = useState(3);

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

console.log(getCars)

    return(
        <>

                <TableHeader
                valueToOrderBy={valueToOrderBy}
                orderDirection={orderDirection}
                handleRequestSort={handleRequestSort}
                />
            {getCars}

            {
            sortedRowInformation(cars, getComparator()).map((car,index) => (
                <TableRow key={index}>
                    <StyledTableCell>
                        {car.name}
                    </StyledTableCell>
                    <StyledTableCell>
                        {car.year}
                    </StyledTableCell>
                    <StyledTableCell>
                        {car.model}
                    </StyledTableCell>
                </TableRow>
            ))
        }

        </>
    )

}