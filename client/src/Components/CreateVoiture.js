import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const CreateVoiture = () => {
  const [Name, setName] = useState(null)
  const [Types, setTypes] = useState(null)
  const [Price, setPrice] = useState(null)
  const [Picture, setPicture] = useState(null)


  const submit = (e) => {
    e.preventDefault()
    if (Picture) {
      let type = Picture.type;
      type = type.toString()
      const format1 = type === "image/jpeg";
      const format2 = type === "image/png";
      const format3 = type === "image/JPG";
      const format4 = type === "image/PNG";
      if (!Name || !Types || !Price || !Picture) {
        return alert("Tous les champs sont obligatoires")
      } else {
        if (isNaN(parseInt(Price))) {
          return alert("Le prix doit être un montant")
        }
        if (Picture.size > 500000) {
          return alert("La taille d'image doit etre inférieur à 500Ko")
        }
        if (format1 && format2 && format3 && format4) {
          return alert("Veuiller entrer une format d'image valide: jpg ou png")
        }
      }
    } else {
      return alert("Tous les champs sont obligatoires")
    }

    console.log("ok")
    const data = new FormData();
    data.append("name", Name);
    data.append("types", Types);
    data.append("price", Price);
    data.append("file", Picture);
    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/voiture`,
      data: data,
      withCredentials: true,
    };
    axios(config)
      .then(async (res) => {
        if (res.data[0]) {
          await alert("veuillez patientez ...")
        }
      })
      .catch(error => {
        alert(error)
      })
    window.location = "/"
  }



  const classes = useStyles();
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Publier une nouvelle voiture
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => submit(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nom"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(e) => setName(e.target.value)}
            value={Name}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="type"
            label="Type"
            type="type"
            id="type"
            onChange={(e) => setTypes(e.target.value)}
            value={Types}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="prix"
            label="Prix"
            type="prix"
            id="prix"
            onChange={(e) => setPrice(e.target.value)}
            value={Price}
          />
          <Button
            variant="contained"
            component="label"
          >
            Ajouter une image
            <input
              type="file"
              onChange={(e) => setPicture(e.target.files[0])}
              type="file"
              id="image"
            />
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Publier
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default CreateVoiture
