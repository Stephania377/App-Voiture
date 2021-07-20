import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Uid } from '../Context/Uid'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Button } from '@material-ui/core';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        color: "white"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    texte: {
        color: "white", 
    },
    txtprofil: { 
        color: "black",
    },
    bouton: {
        color: "white", 
        textDecoration: "none",
        margin: 10,
    },
}));

const Naviguation = () => {



    const idUtilisatuerSiConnecter = useContext(Uid)
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [Pseudo, setPseudo] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/user/${idUtilisatuerSiConnecter}`,
            withCredentials: true
        })
            .then(function (response) {
                if (response.data) {
                    console.log(response.data)
                    setPseudo(response.data.user)
                } else {
                    console.log("not connecter")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [idUtilisatuerSiConnecter])

    const logout = () => {
        var config = {
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/user/logout`,
            withCredentials: true
        };

        axios(config)
            .then(function (response) {
                console.log(response)
                if (response.data.status) {
                    window.location = "/"
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        // <div style={{ display: "flex", justifyContent: "space-around" }}>
        //     <Link to="/">Accueil </Link> <br /> <br />

        //     {!idUtilisatuerSiConnecter &&
        //         <>
        //             <Link to="/inscription">S'inscrire </Link> <br /> <br />
        //             <Link to="/connexion">Se connecter</Link> <br /> <br />
        //         </>
        //     }
        //     {idUtilisatuerSiConnecter && <button style={{ border: "none" }} >Stephania Fanomezantsoa</button>}
        //     {idUtilisatuerSiConnecter && <button style={{ border: "none" }} onClick={logout} >Se déconnecter</button>}
        // </div>
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar >
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Link className={classes.texte} to="/">
                            <DirectionsCarIcon />
                        </Link>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link style={{ color: "white", textDecoration: "none" }} to="/">
                            Accueil
                        </Link>
                    </Typography>
                    {idUtilisatuerSiConnecter && (<>
                        <Button variant="outlined" >
                            <Link style={{ color: "white", textDecoration: "none" }} to="/publiez-voiture">
                                Publier une nouvelle voiture
                            </Link>
                        </Button>
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                               <Avatar alt="Remy Sharp" src={Pseudo && Pseudo.picture} />

                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >


                                <Link style={{ color: "black", textDecoration: "none" }} to={`/profil/${idUtilisatuerSiConnecter}`}>
                                    <MenuItem onClick={handleClose}>
                                        {Pseudo && Pseudo.pseudo}
                                    </MenuItem>
                                </Link>
                                <MenuItem onClick={logout}>
                                    <React.Fragment>
                                        Déconnexion
                                    </React.Fragment>
                                </MenuItem>
                            </Menu>
                        </div>
                    </>)}
                    {
                        !idUtilisatuerSiConnecter && <>
                            <Link className={classes.texte} to="/connexion">
                                <Button className={classes.bouton} variant="outlined" >
                                    Connexion
                                </Button>
                            </Link>
                            <Link to="/inscription">
                                <Button className={classes.bouton} variant="outlined" >
                                    Inscription
                                </Button>
                            </Link>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </div>

    )
}

export default Naviguation
