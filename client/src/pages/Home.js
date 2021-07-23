import React from "react";
import {Link} from "react-router-dom";


class Home extends React.Component {

    render() {
        return(
            <div>
                <h1> Home page</h1>
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