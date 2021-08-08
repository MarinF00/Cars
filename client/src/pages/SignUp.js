import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import {Formik,Form, Field} from "formik";
import Typography from "@material-ui/core/Typography";
import {useTranslation} from "react-i18next";

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



const SignUp = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const validate = Yup.object({
        first_name: Yup
            .string('Въведи име')
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        last_name: Yup
            .string('Въведи фамилия')
            .required('Last name is required'),
        email: Yup
            .string('Въведи имейл')
            .required('Email is required')
            .email('Enter a valid email'),
        password: Yup
            .string('Въведи парола')
            .required('Password is required')
            .min(8, 'Password should be of minimum 8 characters length'),

    });



        return (
                <Formik
                    initialValues={{
                        first_name: '',
                        last_name: '',
                        email: '',
                        password: '',
                    }}
                    validationSchema={validate}

                >
                    {({ errors, touched }) => (
                        <div className="custom-field">
                            <Form action="http://localhost:8080/users" method="POST"  className={classes.root}>
                                <Typography variant={"h2"} color={"primary"}>{t("Registration.1")}</Typography>
                                <Field
                                    fullWidth
                                    id="id"
                                    name="id"
                                    type="hidden"
                                />

                                <Field
                                    fullWidth
                                    id="first_name"
                                    name="first_name"
                                    label={t("FirstName.1")}

                                />
                                {errors.first_name && touched.first_name ? (
                                    <div>{errors.first_name}</div>
                                ) : null}
                                <Field
                                    fullWidth
                                    id="last_name"
                                    name="last_name"
                                    label={t("LastName.1")}

                                />
                                {errors.last_name && touched.last_name ? (
                                    <div>{errors.last_name}</div>
                                ) : null}
                                <Field
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label={t("Email.1")}

                                />
                                {errors.email && touched.email ? (
                                    <div>{errors.email}</div>
                                ) : null}
                                <Field
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label={t("Password.1")}
                                    type="password"
                                />
                                {errors.password && touched.password ? (
                                    <div>{errors.password}</div>
                                ) : null}
                                <button color="primary" variant="contained"  type="submit">
                                    {t("SignUp.1")}
                                </button>
                            </Form>
                        </div>
                    )}
                </Formik>
        );


}
export default SignUp;