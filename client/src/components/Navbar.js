import React from "react";
import {Link} from "react-router-dom"
import {AppBar, IconButton, makeStyles, Menu, MenuItem, MenuList, Toolbar} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
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
}));



function  Navbar() {
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return(
        <div className="Navbar">
            <AppBar position="static">
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
                <MenuItem component={Link} to="/" onClick={handleClose}>Home</MenuItem>
                <MenuItem component={Link} to="/cars" onClick={handleClose}>Cars</MenuItem>
                <MenuItem component={Link} to="/cars/add" onClick={handleClose}>Add a Car</MenuItem>
                <MenuItem component={Link} to="/cars/:id" onClick={handleClose}>Car Details</MenuItem>
                <MenuItem component={Link} to="/signup" onClick={handleClose}>Sign Up</MenuItem>
                <MenuItem component={Link} to="/login" onClick={handleClose}>Login</MenuItem>
            </Menu>
                </Toolbar>
            </AppBar>

        </div>
    )
}
export default Navbar;