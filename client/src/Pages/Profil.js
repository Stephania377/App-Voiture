import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Layout from "../Layouts/Layouts.js";
import PostRecent from "../Components/Profil/PostRecent"
import CommentRecent from "../Components/Profil/CommentRecent"
import Identity from "../Components/Profil/Identity"
import Identity_autre from "../Components/Profil/Identity_autre"
import { Uid } from '../Context/Uid.js';
import ChargementPage from "../Components/ChargementPageAccueil"
import { Container } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: 'url(/images/audit.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(6, 0, 2, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: "center"
  },
  pseudo: {
    margin: theme.spacing(0, 0, 0, 120),
    display: 'flex',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Profil = () => {

  const classes = useStyles();

  const idUtilisateurConnecter = useContext(Uid)
  const [allVoiture, setAllVoiture] = useState(null)
  const params = useParams();
  const [user, setUser] = useState()

  useEffect(() => {

    const User = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/api/user/${params.id}`,
    };

    axios(User)
      .then(function (response) {

        if (response.data.user) {
          setUser(response.data.user)
        } else {
          console.log(response)
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    const config2 = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/api/voiture`
    };
    axios(config2)
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
  }, [])


  return (
    <Layout>
      <Grid container component="main" >
        <Grid item xs={1} sm={1} />
        <Grid item xs={10} sm={10} >
        </Grid>
      </Grid>
      <Grid container component="main" className={classes.root}>
       
          <Grid item xs={12} sm={6} lg={6} >
            <div>
              <Typography component="h1" variant="h5" className={classes.paper}>
                {user && user.voiture.length} Publication{user && user.voiture.length > 1 ? "s" : ""} récent{user && user.voiture.length > 1 ? "s" : ""}
              </Typography>
              <div className={classes.paper}>
                {/* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: "auto" }}> */}
                {user ? <PostRecent voiture={user.voiture} /> : <ChargementPage item={1} width={0} height={0} />}
                {/* </List> */}

              </div>
            </div>
            <div>
              <Typography component="h1" variant="h5" className={classes.paper}>
                {user && user.comments.length} Commentaire{user && user.voiture.length > 1 ? "s" : ""} récent{user && user.comments.length > 1 ? "s" : ""}
              </Typography>

              <div className={classes.paper}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  {
                    user ?
                      allVoiture ?
                        allVoiture.map(OneVoiture => {
                          return OneVoiture.comments.map(OneComment => {
                            if (OneComment.commentUserId === user._id) {
                              return <CommentRecent OneVoiture={OneVoiture} OneComment={OneComment} />
                            }
                            else {
                              return <></>
                            }
                          })
                        })
                        :
                        <ChargementPage item={1} width={0} height={0} />
                      :
                      <ChargementPage item={1} width={0} height={0} />
                  }
                </List>
              </div>

            </div>
          </Grid>
          <Grid item xs={12} sm={6} lg={5}>
            {
              user ?
                params ?
                  idUtilisateurConnecter ?
                    idUtilisateurConnecter === params.id ?
                      <Identity user={user} />
                      :
                      <Identity_autre user={user} />
                    :
                    <Identity_autre user={user} />
                  :
                  <ChargementPage item={0} width={510} height={218} />
                :
                <ChargementPage item={0} width={510} height={218} />
            }
          </Grid>
        
      </Grid>

    </Layout>
  );
}

export default Profil;