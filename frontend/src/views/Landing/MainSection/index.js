// src/App.js
import React from 'react';
import { Container, Button, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        
    },
    box: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1634804658555-248d9e9a212f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '85svh',
        
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    mainContent: {
        color: 'white',
        padding: theme.spacing(8, 0, 6),
        marginLeft: '10%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'end',
        height: '75svh',
        width: '60%',
        textShadow: '2px 1px 10px black',
    },
    content: {
        borderLeft: '2px solid #f5f5f5'
    },
    innerBox: {
        marginLeft: 40
    },
    mainText: {
        marginTop: theme.spacing(4)
    },
    help: {
        backgroundColor: 'white',
        color: 'black',
        fontSize: 23,
        padding: 10
    },
    footer: {
        backgroundColor: '#000',
        padding: theme.spacing(4),
        maxWidth: 'inherit'
    }
}));


export default function MainSection() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box className={classes.box}>
                <Box className={classes.mainContent}>
                    <Box className={classes.content}>
                        <Box className={classes.innerBox}>
                            <Typography variant="h2" textAlign="left" gutterBottom color="inherit" fontSize={70}>
                                Cyber Security Management System
                            </Typography>
                            <Typography variant="h5" textAlign="left" paragraph color="inherit" fontSize={20}>
                                TARA automation, BOM and vulnerability management, cybersecurity monitoring, and more.
                            </Typography>
                            <Button variant="contained" className={classes.help}>
                                How Can We Help ?
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Container className={classes.footer}>
                <Typography color="white" variant="h6" textAlign="center" fontSize={50}>
                    A CSMS dedicated to automotive cybersecurity
                </Typography>
            </Container>
        </div>
    );
}
