import React from "react";
import "./Login.css"
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {useTranslation} from "react-i18next";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from "axios";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(10),

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(1),
        },
    },
}));

const validationSchema = Yup.object().shape({
    email: Yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: Yup
        .string('Enter your password')
        .min(4, 'Password should be of minimum 4 characters length')
        .required('Password is required'),
});


export default function Login() {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={validationSchema}

        >
            {({ errors, touched }) => (
                <div className="custom-field">
        <form action="http://localhost:8080/login" method="POST" className={classes.root}>
            <Field
                fullWidth
                id="email"
                name="email"
                placeholder={t("Email.1")}
                className="custom-field"
            />
            {errors.email && touched.email ? (
                <div>{errors.email}</div>
            ) : null}
            <Field
                fullWidth
                id="password"
                name="password"
                placeholder={t("Password.1")}
                type="password"
                className="custom-field"
            />
            {errors.password && touched.password ? (
                <div>{errors.password}</div>
            ) : null}
            <Button style={{color: "whitesmoke", backgroundColor: "#000000",
                backgroundImage: `linear-gradient(315deg, #000000 0%, #414141 74%)`}} variant="outlined"  type="submit">
                {t("Login.1")}
            </Button>
        </form>
                </div>
                )}
        </Formik>
    )
}
