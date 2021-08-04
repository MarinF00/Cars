import React from "react";
import {Link} from "react-router-dom"
import {AppBar, IconButton, makeStyles, Menu, MenuItem, Toolbar} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import "../pages/Navbar.css"
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    header: {
        backgroundColor: "#000000",
        backgroundImage: `linear-gradient(315deg, #000000 0%, #414141 74%)`,
        height: "200px",
        width: "100%",
    }
}));



function  Navbar() {
    const classes = useStyles()
    const { t } = useTranslation();
    const us = "https://raw.githubusercontent.com/andreimc/react-flags-svg/1f2f4adb3f5e24af24468f3297069a78eada75df/flags/normal/us.svg";
    const bg = "https://raw.githubusercontent.com/andreimc/react-flags-svg/1f2f4adb3f5e24af24468f3297069a78eada75df/flags/normal/bg.svg";

    function handleLangClick(lang) {
        i18next.changeLanguage(lang);
        handleClose1();

    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorLangEl, setAnchorLangEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClick1 = (event) => {
        setAnchorLangEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClose1 = () => {
        setAnchorLangEl(null);
    };
    return(
        <div className="Navbar">
            <AppBar position="static" className={classes.header}>

                <Toolbar>

                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Special Car
                    </Typography>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem component={Link} to="/" onClick={handleClose}>{t("Home.1")}</MenuItem>
                <MenuItem component={Link} to="/cars" onClick={handleClose}>{t("Offers.1")}</MenuItem>
                <MenuItem component={Link} to="/login" onClick={handleClose}>{t("Login.1")}</MenuItem>
            </Menu>

                    <Typography variant="h6" >
                        {t("Languages.1")}
                    </Typography>


                        <Button  style={{ minWidth: "0px" }} onClick={()=>handleLangClick('en')}><img width="26px" height="16px" src={us} alt="US"/> </Button>
                        <Button  style={{ minWidth: "0px" }} onClick={()=>handleLangClick('bg')}><img width="26px" height="16px" src={bg} alt="Bulgarian"/> </Button>

                </Toolbar>
                <Typography style={{fontStyle:"bold", textAlign: "center"}} variant={"h3"}>{t("BestPlace.1")}</Typography>
            </AppBar>

        </div>
    )
}
export default Navbar;