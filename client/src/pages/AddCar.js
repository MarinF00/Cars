import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button";
import "./AddCar.css"
import Typography from "@material-ui/core/Typography";
import * as Yup from "yup";
import {useFormik} from "formik";

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

const validationSchema = Yup.object({
    name: Yup
        .string("Enter the car's brand")
        .required('Brand is required'),
    model: Yup
        .string("Enter the car's model")
        .required('Model is required'),
    year: Yup
        .number("Enter the car's year")
        .required('Year is required'),
    color: Yup
        .string("Enter the car's color")
        .required('Color is required'),
    user_id: Yup
        .number("Enter the car's owner id")
        .required('Owner ID is required'),
});

export default function AddCar() {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            name: 'Toyota',
            model: 'Yaris',
            year: 2000,
            color: 'Red',
            user_id: 0,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div>
            <form action="http://localhost:8080/cars" method="POST" className={classes.root}>
                <Typography>Add a car</Typography>
                <TextField
                    fullWidth
                    id="id"
                    name="id"
                    type="hidden"
                />
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Brand"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />

                <TextField
                    fullWidth
                    id="model"
                    name="model"
                    label="Model"
                    value={formik.values.model}
                    onChange={formik.handleChange}
                    error={formik.touched.model && Boolean(formik.errors.model)}
                    helperText={formik.touched.model && formik.errors.model}
                />
                <TextField
                    fullWidth
                    id="year"
                    name="year"
                    label="Year"
                    value={formik.values.year}
                    onChange={formik.handleChange}
                    error={formik.touched.year && Boolean(formik.errors.year)}
                    helperText={formik.touched.year && formik.errors.year}
                />
                <TextField
                    fullWidth
                    id="color"
                    name="color"
                    label="Color"
                    value={formik.values.color}
                    onChange={formik.handleChange}
                    error={formik.touched.color && Boolean(formik.errors.color)}
                    helperText={formik.touched.color && formik.errors.color}
                />
                <TextField
                    fullWidth
                    id="user_id"
                    name="user_id"
                    label="Owner ID"
                    value={formik.values.user_id}
                    onChange={formik.handleChange}
                    error={formik.touched.user_id && Boolean(formik.errors.user_id)}
                    helperText={formik.touched.user_id && formik.errors.user_id}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Add car
                </Button>
            </form>
        </div>
    );
}