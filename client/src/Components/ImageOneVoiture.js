import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


const ImageOneVoiture = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      height: '65vh',
    }
  }));


  const classes = useStyles();
  return (
    <img src={props.picture} className={classes.root} alt="bmw" />
  )
}

export default ImageOneVoiture
