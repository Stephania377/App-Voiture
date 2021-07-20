import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const CreateComment = (props) => {

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
     height:54
     
    },
  }));

  const classes = useStyles();

  return (

    <div className={classes.paper}>
      <form className={classes.form} noValidate onSubmit={(e) => props.handleSubmitComm(e)} style={{ display: "flex", justifyContent: "center" }}>
        <Grid container component="main" className={classes.root}>
          <Grid item xs={1} sm={1} lg={1} />
         
          <Grid item xs={11} sm={10} lg={6}  className={classes.image} >
            <TextField
              variant="outlined"
             
              required
              fullWidth
              id="coms"
              placeholder="Entrez votre commentaire"
              name="coms"
              autoComplete="coms"
              autoFocus
              value={props.NewComment}
              onChange={(e) => props.setNewComment(e.target.value)}

            />
          </Grid>
          <Grid item xs={11} sm={2} lg={4}  className={classes.image} >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Commenter
            </Button>
          </Grid>
          <Grid item xs={1} sm={1} lg={1} />
        </Grid>
      </form>
    </div>


  )
}

export default CreateComment
