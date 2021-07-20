import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { timestampParser } from "../utils/utils"



const Commentaires = ({ user, text, time }) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '93%',
      borderRadius: 15,
      border: "1px solid rgb(184, 245, 225)",
      overflow: "hidden",
      backgroundColor: "rgb(184, 245, 225)",
      margin:20
    },
 
  }));
  const classes = useStyles();

  console.log(user)
  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar sizes={10} alt={user && user.pseudo} src={user && user.picture} />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <React.Fragment>
              {text} <br /> {timestampParser(time)}
            </React.Fragment>
          }
        >
          <Link to={`/profil/${user && user._id}/`}>
          {user && user.pseudo}
          </Link>
        </ListItemText>
      </ListItem>
    </List>
  );
}
export default Commentaires;