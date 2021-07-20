import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { timestampParser } from '../../utils/utils';
const CommentRecent = ({ OneVoiture, OneComment }) => {
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Cindy Baker" src={OneVoiture.picture} />
                </ListItemAvatar>
                <ListItemText
                    primary={"Publication : " + OneVoiture.name}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Commentaire : {OneComment.text} <br />
                            </Typography>
                            { timestampParser(OneComment.timestamps) }
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    )
}

export default CommentRecent
