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

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
    },
}));

export default function AddCar() {
    const classes = useStyles();

    return (
        <div>
        <form action="http://localhost:8080/cars" method="POST" className={classes.root}>
            <Typography variant="h4">Form to add a car</Typography>
            <TextField
                name="id"
                type="hidden"
            />
            <TextField
                label="Car Brand"
                variant="outlined"
                required
                name="name"
            />
            <TextField
                label="Model"
                variant="outlined"
                required
                name="model"
            />
            <TextField
                label="Year"
                variant="outlined"
                type="text"
                required
                name="year"
            />
            <TextField
                label="Color"
                type="text"
                required
                name="color"
                variant="outlined"
            />

            <TextField
                label="Owner ID"
                variant="outlined"
                type="text"
                required
                name="user_id"
            />
            <div>
                <Button type="submit" variant="contained" color="primary">
                    Add Car
                </Button>
            </div>
        </form>
        </div>
    );
}