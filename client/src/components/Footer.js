import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import LocalCarWashRoundedIcon from '@material-ui/icons/LocalCarWashRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom"
import "./Footer.css"


const useStyles = makeStyles({
    root: {
        position:"center",
        width: "100%",
        backgroundColor: "#3f51b5",
        color: "white",
    },

});
export default function Footer() {
    const classes = useStyles();
    const { t } = useTranslation();
    const [value, setValue] = React.useState(0);
    return (
        <div className="footer">
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}

            showLabels
            className={classes.root}
        >
            <div className="icons">
            <BottomNavigationAction
                label={t("Home.1")}
                icon={<HomeRoundedIcon />}
                className="icons"
                >

                <Link to="/">
                    <li>!</li>
                </Link>

            </BottomNavigationAction>
            <BottomNavigationAction label={t("Offers.1")} icon={<LocalCarWashRoundedIcon />} className="icons"/>
            <BottomNavigationAction label={t("Login.1")} icon={<VpnKeyRoundedIcon />} className="icons" />
            </div>
        </BottomNavigation>
        </div>
    );
}