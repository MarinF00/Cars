import React from "react";
import * as Yup from "yup";
import {Formik, Form} from "formik";
import FormikControl from "../components/FormikControl";
import "./Login.css"



class Login extends React.Component{

    initialValues = {
        email:"",
        password: ""
    }

    validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Required"),
        password:Yup.string().required("Required")
    })

    onSubmit = values => {
        console.log("Form data", values);
    }
    render() {
        return (
            <div className="Login">
            <Formik
                initialValues={this.initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.onSubmit}
            >
                {formik => {
                    return (
                        <Form>
                            <FormikControl
                                control='input'
                                // control='chakraInput'
                                type='email'
                                label='Email'
                                name='email'
                            />
                            <FormikControl
                                control='input'
                                type='password'
                                label='Password'
                                name='password'
                            />
                            <button type='submit' disabled={!formik.isValid}>Submit</button>
                        </Form>
                    )
                }}
            </Formik>
            </div>
        )
    }
}

export default Login;