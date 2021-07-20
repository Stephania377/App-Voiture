// import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Footer from '../Components/Footer';

const Inscription = () => {

  const [Email, setEmail] = useState(null)
  const [Pseudo, setPseudo] = useState(null)
  const [Password, setPassword] = useState(null)
  const [ConfirmationPassword, setConfirmationPassword] = useState(null)

  const repInscrip = (e) => {
    e.preventDefault();

    if (ConfirmationPassword !== Password) {
      return alert("Mot de passe non conforme")
    }

    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/user/register`,
      data: {
        pseudo: Pseudo,
        email: Email,
        password: Password,
      },
      withCredentials: true
    };

    axios(config)
      .then(resp => {
        if (resp.data.user) {
          alert(" Inscription effectué avec succès. Vous pouvez maintenant vous connecter")
          window.location = "/connexion"
        }
        if (resp.data.error) {
          console.log("error 1")
          alert(resp.data.error)
        }
      })
      .catch(err => {
        alert("Tous les champs sont obligatoires")
        // console.log(err)
      })
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      height: '90vh',
    },
    image: {
      backgroundImage: 'url(/images/audit.png)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: 15,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    avatar2: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();
  return (
  <>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Link to="/">
            <Avatar className={classes.avatar2}>
              <ArrowBackIcon />
            </Avatar>
          </Link>

          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Inscrivez-vous!
          </Typography>
          <form className={classes.form} noValidate onSubmit={(e) => repInscrip(e)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse email"
              name="email"
              autoComplete="email"
              autoFocus
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Pseudo"
              name="pseudo"
              autoComplete="pseudo"
              autoFocus
              value={Pseudo}
              id="nom"
              onChange={(e) => setPseudo(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Confirmation Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              value={ConfirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              S'inscrire
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/connexion" variant="body2">
                  {"Vous êtes déjà membre? Connectez-vous!"}
                </Link>
              </Grid>
            </Grid>

          </form>
        </div>
      </Grid>
    </Grid>
    <Footer />
  </>

  );
}

export default Inscription;