import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import LocalCarWashRoundedIcon from '@material-ui/icons/LocalCarWashRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom"
import "./Footer.css"
import {Tooltip} from "@material-ui/core";


const useStyles = makeStyles({
    root: {
        position:"center",
        width: "100%",
        marginTop: "auto",
        backgroundColor: "#000000",
        backgroundImage: `linear-gradient(315deg, #000000 0%, #414141 74%)`,
    },

});
export default function Footer() {
    const classes = useStyles();
    const { t } = useTranslation();
    const [value, setValue] = React.useState(0);
    return (
        <footer className="footer">

        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}

            showLabels
            className={classes.root}
        >
            <div className="icons">
                <Tooltip title={t("Home.1")} arrow>
            <BottomNavigationAction component={Link} to="/" label={t("Home.1")} icon={<HomeRoundedIcon />}  className="icons"/>
                </Tooltip>

            <Tooltip title={t("Offers.1")} arrow>
            <BottomNavigationAction component={Link} to="/cars" label={t("Offers.1")} icon={<LocalCarWashRoundedIcon />} className="icons"/>
            </Tooltip>
            <Tooltip title={t("Login.1")} arrow>
            <BottomNavigationAction component={Link} to="/login" label={t("Login.1")} icon={<VpnKeyRoundedIcon />}  className="icons" />
            </Tooltip>
                <Tooltip title={t("AddCar.1")} arrow>
                    <BottomNavigationAction component={Link} to="/cars/add" label={t("AddCar.1")} icon={<AddCircleRoundedIcon />}  className="icons" />
                </Tooltip>
            </div>
        </BottomNavigation>
        </footer>
    );
}