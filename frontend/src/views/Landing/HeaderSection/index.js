import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { AppBar, Toolbar, Box, Typography, MenuItem, Menu } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { changeCanvasPage } from '../../../store/slices/CanvasSlice';
import ColorTheme from '../../../store/ColorTheme';

const services = [
    'TARA Automation',
    'Vulnerability Management',
    'Cybersecurity Monitoring',
    'Manufacturing Software',
    'Consulting Service'
];

const useStyles = makeStyles(() => {
    return {
        title: {
            flexGrow: 1,
            fontSize: '25px',
            fontFamily: 'Inter'
        },
        navlink: {
            textDecoration: 'none',
            color: 'white',
            fontSize: 16,
            lineHeight: '23px',

            '&.active': {
                // textDecoration:'underline'
                borderBottom: '2px solid white'
            }
        },
        dropdown: {
            color: 'white',
            fontSize: 16,
            marginLeft: '3px'
        },
        links: {
            display: 'flex',
            gap: 25,
            marginRight: 40
        }
    };
});

export default function Header() {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const { pageName } = useSelector((state) => state.pageName);

    const handleClose = (name) => {
        if (name === 'TARA Automation') {
            dispatch(changeCanvasPage('canvas'));
            navigate('/Modals', { replace: true });
            // setTimeout(() => {
            // window.location.href = '/Modals';

            // }, 100);
        }
        setAnchorEl(null);
        setMenuOpen(false);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen((prev) => !prev);
    };

    return (
        <>
            <AppBar
                position="fixed"
                className={classes.header}
                style={{ background: pageName === 'home' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.9)' }}
            >
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color={ColorTheme()?.logo}>
                        FUCY TECH
                    </Typography>
                    <Box className={classes.links}>
                        <NavLink className={classes.navlink} to="/home">
                            Home
                        </NavLink>
                        <NavLink className={classes.navlink} to="/dashboard">
                            Dashboard
                        </NavLink>
                        <Box>
                            <Typography className={classes.dropdown} onClick={handleClick} display="flex" alignItems="center">
                                CSMS Solutions {menuOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </Typography>
                            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                                {services.map((service, index) => (
                                    <MenuItem key={index} onClick={() => handleClose(service)}>
                                        {service}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <NavLink className={classes.navlink} to="/about">
                            About Us
                        </NavLink>
                        <NavLink className={classes.navlink} to="/career">
                            Career
                        </NavLink>
                        <NavLink className={classes.navlink} to="/contact">
                            Contact
                        </NavLink>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
}
