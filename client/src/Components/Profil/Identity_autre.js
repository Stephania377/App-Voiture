import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { timestampParser } from '../../utils/utils';

const useStyles = makeStyles((theme) => ({

  media: {
    height: 140,
  },
  paper: {
    margin: theme.spacing(6, 0, 2, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));


const Identity_autre = ({ user }) => {

  const classes = useStyles();


  return (
    <>
  
      <Card className={classes.root}>
        <Typography component="h1" variant="h5" className={classes.paper}>
          Informations  sur l'utilisateur
        </Typography>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={user.picture}
            title="Pdp"
          />
          <CardContent>
            <Typography gutterBottom component="h2">
              Email : <Typography variant="body2" color="textSecondary" component="p">{user.email}</Typography>
            </Typography>
            <Typography gutterBottom component="h2">
              Pseudo : <Typography variant="body2" color="textSecondary" component="p"> {user.pseudo} </Typography>
            </Typography>
            <Typography gutterBottom component="h2">
              Inscription : <Typography variant="body2" color="textSecondary" component="p">{ timestampParser(user.createdAt) }</Typography>
            </Typography>
            <Typography gutterBottom component="h2">
              Nombre de voiture publiée : <Typography variant="body2" color="textSecondary" component="p">{user.voiture.length}</Typography>
            </Typography>

          </CardContent>
        </CardActionArea>

      </Card>
    </>
  )
}

export default Identity_autre
