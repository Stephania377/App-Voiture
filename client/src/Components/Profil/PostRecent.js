import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import List from '@material-ui/core/List';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  contenu: {
    display: "flex",
    width : "100%",
    margin: "auto",
  },

}));

const PostRecent = ({ voiture }) => {
  const classes = useStyles();

    const [AllVoiture, setAllVoiture] = useState([])

    useEffect(() => {
        const config1 = {
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/voiture`
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
    }, [])


    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {AllVoiture && AllVoiture.map(OneVoiture => {
                    return voiture.map(IdVoitureUser => {
                        if (OneVoiture._id === IdVoitureUser) {
                            return <>
                                <ListItem >
                                    <Link style={{ textDecoration: "none" }} to={`/voiture/${OneVoiture._id}`}  className={classes.contenu}>
                                        <ListItemAvatar>
                                            <Avatar alt="Travis Howard" src={OneVoiture.picture} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={OneVoiture.name}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        <br />
                                                        {OneVoiture.types}<br />
                                                    </Typography>
                                                    {OneVoiture.price} Euro <br />
                                                    {OneVoiture.comments.length} commentaire
                                                </React.Fragment>
                                            }
                                        />
                                    </Link>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>
                        }
                    })
                })}
            </List>
        </>
    )
}

export default PostRecent
