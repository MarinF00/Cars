import React from "react";



class AddCar extends React.Component {

    render() {
        return(
            <div>
                <h1>Form to add car</h1>
                <form action="http://localhost:8080/cars" method="POST">
                    <input type="number" placeholder="id" name="id" hidden="true"/>
                    <input type="text" placeholder="name" name="name"/>
                        <input type="text" placeholder="model" name="model"/>
                    <input type="number" placeholder="year" name="year"/>
                    <input type="text" placeholder="color" name="color"/>
                    <input type="number" placeholder="user_id" name="user_id"/>
                            <button className="btn btn-primary btn-danger" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
export default AddCar;