import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import "./Home.css"
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse, Grid,
    IconButton,
    makeStyles, Paper, Tab, Tabs, Tooltip
} from "@material-ui/core";
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import {useTranslation} from "react-i18next";
import Contacts from "./Contacts";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
        margin: "30px",

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        borderRadius: "25%",
        width: "70px",
        height: "50px",
        backgroundColor: red[600],
    },
}));


function Home() {
const { t } = useTranslation();
const [cars, setCars] = useState([]);
const classes = useStyles();
const [expanded, setExpanded] = React.useState(false);

    useEffect(() => {
        getCars();
    },[]);


    const getCars = () =>
    {
        axios.get("http://localhost:8080/cars")
            .then((response) => {
                const data = response.data;
                setCars(data);
                console.log("Data has been received")
            })
            .catch(() => {
                alert("Error retrieving data");
            })
    }



    const displayCarsProperty = (cars) => {


        const handleExpandClick = () => {
            setExpanded(!expanded);
        };


        return  cars.filter(car => car.id >= cars.length - 4).map((car) => (
            <Grid direction={"column"} className="cars">
                <Grid item  xs={8} sm={2} md={12} key={cars.indexOf(car)}>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            Special Car
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={
                        <Link to={`/cars/${car.id}`}>
                            <Tooltip placement="top-start" arrow title="Car page"><li style={{textDecoration: "none"}}>{car.name}</li></Tooltip>
                        </Link>
                    }

                    subheader={car.year}
                />
                <CardMedia
                    className={classes.media}
                    image={car.photo}
                    title="Car"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {car.model}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Car Description:</Typography>
                        <Typography>{car.description}</Typography>
                    </CardContent>
                </Collapse>
            </Card>
                </Grid>
            </Grid>
        ))
    }

        return(
            <div className="main">

                <Typography style={{color: "whitesmoke"}} variant={"h2"} align={"center"}>{t("OurNewestOffers.1")}</Typography>
                <br/>
                <br/>
                <Grid
                    spacing={2}
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                {displayCarsProperty(cars)}
                </Grid>
            </div>

        )
    }

export default Home;