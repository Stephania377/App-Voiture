import React, { useContext } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import Layouts from '../Layouts/Layouts.js';
import { Uid } from '../Context/Uid.js';
import './Home.css';
import CommentIcon from '@material-ui/icons/Comment';
import Badge from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import ChargementPage from "../Components/ChargementPageAccueil";
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    body: {
        width: "96%",
        margin: 'auto',
    },
    root: {
        position: "relative",
        display: "flex",
    },
    font: {
        position: "absolute",
        backgroundColor: "rgba( 140, 140, 150, 0.5)",
        width: "100%",
        height: "15%",
        fontSize: 16,
        padding: theme.spacing(0.2, 0, 0, 0.6),
    },
    coms: {
        width : "10%",
        float : "right",
        margin: theme.spacing(1, 0, 0, 0),
    },
    espace: {
        margin: theme.spacing(7, 0, 0, 0)
    },


}));

const Home = () => {
    const classes = useStyles();
    const [allVoiture, setAllVoiture] = useState(null)
    const idUtilisatuerSiConnecter = useContext(Uid)
    const [allUser, setAllUser] = useState([])


    useEffect(() => {
        const config1 = {
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/voiture`
        };
        const config2 = {
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/user/`,
        };
        axios(config1)
            .then(function (response) {
                if (response.data[0]) {
                    setAllVoiture(response.data)
                } else {
                    console.log(response)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        axios(config2)
            .then(function (response) {
                if (response.data[0]) {
                    console.log(response.data)
                    setAllUser(response.data)
                } else {
                    console.log("error pas user")
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [idUtilisatuerSiConnecter])

    return (
        <Layouts idUtilisatuerSiConnecter={idUtilisatuerSiConnecter}>
            <hr className={classes.espace} />
            <div className={classes.body}>
                <h2 align="center"> Nos offres de voitures tendances 2021</h2> <br /> <br />
                <Grid container component="main" className={classes.root} spacing={2} >
                    {
                        allVoiture ?
                            allVoiture.map((voiture) => {
                                return <>
                                    <Grid item xs={12} sm={6} md={4} >
                                        <Link to={`/voiture/${voiture._id}`}>
                                            <Paper elevation={10} />
                                            <Card className={classes.root}>
                                                <CardMedia
                                                    component="img"
                                                    height="300"
                                                    image={voiture.picture}
                                                />
                
                                                <Typography
                                                    gutterBottom
                                                    variant="h1"
                                                    component="h1"
                                                    className={classes.font}
                                                >


                                                  
                                                    {
                                                        allUser && allUser.map(user => {
                                                            if (voiture.userId === user._id) {
                                                                return  <span style={{ color: "grey" }}> 
                                                                            <Link to={`/profil/${user._id}`}>
                                                                            <Badge >
                                                                                <Avatar alt={user.pseudo} src={user.picture} /> 
                                                                            </ Badge> 
                                                                                 {" " +user.pseudo}
                                                                            </Link>
                                                                        </span>
                        
                                                            }
                                                        })
                                                    }
                                                <span className={classes.coms}>
                                                    <Badge badgeContent={voiture.comments.length} color="secondary" >
                                                            <CommentIcon color="primary" />
                                                    </Badge>
                                                </span>
                                                </Typography>
                                            </Card>
                                        </Link>
                                    </Grid>
                                </>


                            }

                            )
                            :
                            <ChargementPage item={3} width={510} height={218}/>
                    }
                </Grid>

            </div>
        </Layouts >
    );
}

export default Home;