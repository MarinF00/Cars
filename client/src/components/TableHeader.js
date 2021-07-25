import React from "react";
import {TableCell, TableHead, TableRow, TableSortLabel, withStyles} from "@material-ui/core";

export default function TableHeader(props) {
    const {valueToOrderBy, orderDirection,handleRequestSort} = props;

    const createSortHandler = (property) => (event) =>
    {
        handleRequestSort(event,property);
    }

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.black,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);



    return(
        <TableHead>
            <TableRow>
                <StyledTableCell key="name">
                    <TableSortLabel
                        active={valueToOrderBy === "name"}
                        direction={valueToOrderBy === "name" ? orderDirection: "asc"}
                        onClick={createSortHandler("name")}
                    >
                        Car
                    </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell align="right">Model</StyledTableCell>
                <StyledTableCell key="year" align="right">
                    <TableSortLabel
                        active={valueToOrderBy === "year"}
                        direction={valueToOrderBy === "year" ? orderDirection: "asc"}
                        onClick={createSortHandler("year")}
                    >
                        Year
                    </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell align="right">Color</StyledTableCell>
                <StyledTableCell align="right">Owner ID</StyledTableCell>
            </TableRow>
        </TableHead>
    )
}