import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Footer from '../Components/Footer';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);


  const repLogin = (e) => {
    e.preventDefault();
    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/user/login`,
      data: {
        "email": email,
        "password": password
      },
      withCredentials: true
    };

    axios(config)
      .then(resp => {
        console.log(resp)
        if (resp.data.user) {//on a recue une cookie et une token
          //redirection
          window.location = "/"
        } else {
          alert(resp.data.error)
        }
      })
      .catch(err => {
        alert(err);
      })
  }


  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
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

    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
          Se connecter
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => repLogin(e)}>
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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Se souvenir de moi"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Se connecter
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/inscription" variant="body2">
                {"Vous n'avez pas de  compte? Inscrivez-vous!"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Footer />
    </Container>
  );
}


export default Login;