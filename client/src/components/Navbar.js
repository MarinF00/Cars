import React from "react";
import {Link} from "react-router-dom"
function  Navbar() {
    return(
        <div className="Navbar">
            <nav className="navbar navbar-dark bg-dark">

            <Link to="/cars">
                <li>Cars</li>
            </Link>
            <Link to="/cars/:id">
                <li>Car Details</li>
            </Link>
                <Link to="/signup">
                    <li>Sign Up</li>
                </Link>
            </nav>
        </div>
    )
}
export default Navbar;