import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import {Formik,Form} from "formik";
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
                    onSubmit={values => {
                        console.log(values)
                    }}
                >
                    {formik => (
                        <div>
                            <Form action="http://localhost:8080/users" method="POST"  className={classes.root}>
                                <Typography variant={"h2"} color={"primary"}>{t("Registration.1")}</Typography>
                                <TextField
                                    fullWidth
                                    id="id"
                                    name="id"
                                    type="hidden"
                                />
                                <TextField
                                    fullWidth
                                    id="first_name"
                                    name="first_name"
                                    label={t("FirstName.1")}

                                />
                                <TextField
                                    fullWidth
                                    id="last_name"
                                    name="last_name"
                                    label={t("LastName.1")}

                                />
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label={t("Email.1")}

                                />
                                <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label={t("Password.1")}
                                    type="password"

                                />
                                <Button color="primary" variant="contained"  type="submit">
                                    {t("SignUp.1")}
                                </Button>
                            </Form>
                        </div>
                    )}
                </Formik>
        );


}
export default SignUp;