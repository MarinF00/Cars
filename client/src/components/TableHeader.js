import React from "react";
import {TableCell, TableHead, TableRow, TableSortLabel, withStyles} from "@material-ui/core";
import {useTranslation} from "react-i18next";

export default function TableHeader(props) {
    const {valueToOrderBy, orderDirection,handleRequestSort} = props;
    const { t } = useTranslation();
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
                        {t("Car.1")}
                    </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell align="right">{t("Model.1")}</StyledTableCell>
                <StyledTableCell key="year" align="right">
                    <TableSortLabel
                        active={valueToOrderBy === "year"}
                        direction={valueToOrderBy === "year" ? orderDirection: "asc"}
                        onClick={createSortHandler("year")}
                    >
                        {t("Year.1")}
                    </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell align="right">{t("Color.1")}</StyledTableCell>
                <StyledTableCell align="right">{t("Description.1")}</StyledTableCell>
                <StyledTableCell align="right">{t("Owner.1")}</StyledTableCell>
                <StyledTableCell align="center">{t("Photo.1")}</StyledTableCell>
            </TableRow>
        </TableHead>
    )
}