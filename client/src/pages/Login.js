import React from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import "./Login.css"
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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




export default function Login() {
    const classes = useStyles();
    const { t } = useTranslation();
    const validationSchema = Yup.object({
        email: Yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: Yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 4 characters length')
            .required('Password is required'),
    });
     const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });


        return (
            <div className="Login">

                <form action="http://localhost:8080/login" method="POST" className={classes.root}>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label={t("Email.1")}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label={t("Password.1")}
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button style={{color: "whitesmoke", backgroundColor: "#000000",
                        backgroundImage: `linear-gradient(315deg, #000000 0%, #414141 74%)`}} variant="outlined"  type="submit">
                        {t("Login.1")}
                    </Button>
                </form>
            </div>
        )
}