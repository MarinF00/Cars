import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import * as Yup from "yup";
import {useFormik} from "formik";
import {TextareaAutosize} from "@material-ui/core";
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


export default function AddCar() {
    const classes = useStyles();
    const { t } = useTranslation();
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

    const formik = useFormik({
        initialValues: {
            name: '',
            model: '',
            year: "",
            color: '',
            description: "",
            photo: "",
            user_id: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div>
            <form action="http://localhost:8080/cars" method="POST" className={classes.root}>
                <Typography variant={"h3"}>{t("AddCar.1")}</Typography>
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
                    label={t("Car.1")}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />

                <TextField
                    fullWidth
                    id="model"
                    name="model"
                    label={t("Model.1")}
                    value={formik.values.model}
                    onChange={formik.handleChange}
                    error={formik.touched.model && Boolean(formik.errors.model)}
                    helperText={formik.touched.model && formik.errors.model}
                />
                <TextField
                    fullWidth
                    id="year"
                    name="year"
                    label={t("Year.1")}
                    value={formik.values.year}
                    onChange={formik.handleChange}
                    error={formik.touched.year && Boolean(formik.errors.year)}
                    helperText={formik.touched.year && formik.errors.year}
                />
                <TextField
                    fullWidth
                    id="color"
                    name="color"
                    label={t("Color.1")}
                    value={formik.values.color}
                    onChange={formik.handleChange}
                    error={formik.touched.color && Boolean(formik.errors.color)}
                    helperText={formik.touched.color && formik.errors.color}
                />

                <TextField
                    fullWidth
                    id="photo"
                    name="photo"
                    label={t("Photo.1")}
                    value={formik.values.photo}
                    onChange={formik.handleChange}
                    error={formik.touched.photo && Boolean(formik.errors.photo)}
                    helperText={formik.touched.photo && formik.errors.photo}
                />
                <TextField
                    fullWidth
                    id="user_id"
                    name="user_id"
                    label={t("Owner.1")}
                    value={formik.values.user_id}
                    onChange={formik.handleChange}
                    error={formik.touched.user_id && Boolean(formik.errors.user_id)}
                    helperText={formik.touched.user_id && formik.errors.user_id}
                />
                <TextareaAutosize aria-label="minimum height" minRows={3}
                                  style={{width: "300px", height: "130px"}}
                                  id="description"
                                  name="description"
                                  label={t("Description.1")}
                                  value={formik.values.description}
                                  onChange={formik.handleChange}
                                  error={formik.touched.description && Boolean(formik.errors.description)}
                                  helperText={formik.touched.description && formik.errors.description}
                />
                <Button color="primary" variant="contained" type="submit">
                    {t("AddCar.1")}
                </Button>
            </form>
        </div>
    );
}