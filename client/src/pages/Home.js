import React from "react";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";


class Home extends React.Component {

    render() {
        return(
            <div>
                <Typography variant="h3">Home page</Typography>
                <Link to="/cars/add">
                    <li>
                        AddCar
                    </li>
                </Link>
            </div>
        )
    }
}

export default Home;