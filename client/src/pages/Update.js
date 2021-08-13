import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import * as Yup from "yup";
import {useFormik} from "formik";
import {Formik,Form, Field} from "formik";
import {TextareaAutosize} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import "./FormCss.css"
import axios from "axios";
import {useLocation} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(10),

        '& .Field-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(1),
        },
    },
}));


export default function AddCar() {
    const classes = useStyles();
    const { t } = useTranslation();
    const [cars, setCars] = useState([]);
    const location = useLocation();
    let re = /\d+/g;
    const myLocation = location.pathname.match(re);
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
        description: Yup
            .string("Enter the car's description")
            .required('Description is required'),
        photo: Yup
            .string("Enter the car's photo URL")
            .required('Photo URL is required'),
        user_id: Yup
            .number("Enter the car's owner id")
            .required('Owner ID is required'),
    });

    useEffect(() => {
        getCars();
    }, []);

    const getCars = () =>
    {
        axios.get("http://localhost:8080/cars")
            .then((response) => {
                const data = response.data;
                setCars(data);console.log("Data has been received")
            })
            .catch(() => {
                alert("Error retrieving data");
            })
    }

    return  cars.filter(car => car.id == myLocation).map((car) => (
        <div>
            <Formik
                initialValues={{
                    name: '',
                    model: '',
                    year: "",
                    color: '',
                    description: "",
                    photo: "",
                    user_id: "",
                }}
                validationSchema={validationSchema}
            >
                {({ errors, touched }) => (
                    <div className="custom-field">
                        <form action="http://localhost:8080/cars" method="POST" className={classes.root}>
                            <Typography variant={"h3"}>{t("AddCar.1")}</Typography>
                            <Field
                                fullWidth
                                id="id"
                                name="id"
                                type="hidden"
                                value={car.id}
                            />
                            <label>Name</label>
                            <Field
                                fullWidth
                                id="name"
                                name="name"
                                placeholder={t("Car.1")}
                                value={car.name}
                                className="custom-field"
                            />
                            {errors.name && touched.name ? (
                                <div>{errors.name}</div>
                            ) : null}
                            <label>Model</label>
                            <Field
                                fullWidth
                                id="model"
                                name="model"
                                placeholder={t("Model.1")}
                                value={car.model}
                                className="custom-field"
                            />
                            {errors.model && touched.model ? (
                                <div>{errors.model}</div>
                            ) : null}
                            <label>Year</label>
                            <Field
                                fullWidth
                                id="year"
                                name="year"
                                placeholder={t("Year.1")}
                                value={car.year}
                                className="custom-field"
                            />
                            {errors.year && touched.year ? (
                                <div>{errors.year}</div>
                            ) : null}
                            <label>Color</label>
                            <Field
                                fullWidth
                                id="color"
                                name="color"
                                placeholder={t("Color.1")}
                                value={car.color}
                                className="custom-field"
                            />
                            {errors.color && touched.color ? (
                                <div>{errors.color}</div>
                            ) : null}
                            <label>Photo</label>
                            <Field
                                fullWidth
                                id="photo"
                                name="photo"
                                value={car.photo}
                                placeholder={t("Photo.1")}
                                className="custom-field"
                            />
                            {errors.photo && touched.photo ? (
                                <div>{errors.photo}</div>
                            ) : null}
                            <label>{t("Owner.1")}</label>
                            <Field
                                fullWidth
                                id="user_id"
                                name="user_id"
                                placeholder={t("Owner.1")}
                                value={car.user_id}
                                className="custom-field"
                            />
                            {errors.user_id && touched.user_id ? (
                                <div>{errors.user_id}</div>
                            ) : null}
                            <label>Description</label>
                            <Field aria-label="minimum height" minRows={3}

                                   id="description"
                                   name="description"
                                   value={car.description}
                                   placeholder={t("Description.1")}
                                   className="custom-field"
                            />
                            {errors.description && touched.description ? (
                                <div>{errors.description}</div>
                            ) : null}

                            <Button color="primary" variant="contained" type="submit">
                                Update
                            </Button>
                        </form>
                    </div>
                )}
            </Formik>
        </div>
    ))
}