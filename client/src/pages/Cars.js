import React from "react";
import axios from "axios";
import "./Cars.css"
import { TableCell, TableRow, withStyles} from "@material-ui/core";
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
const StyledTableCellPhoto = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    body: {

    },
}))(TableCell);








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

    render() {
        return(
            <div >

                    <TableContent/>
            </div>

        )
    }
}
export default Cars;