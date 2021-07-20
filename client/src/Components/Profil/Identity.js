import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { dateParser } from '../../utils/utils';


const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(6, 0, 2, 0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    pseudo: {
        margin: theme.spacing(0, 0, 0, 120),
        display: 'flex',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const Identity = ({ user }) => {

    const classes = useStyles();
    const [Email, setEmail] = useState(user.email)
    const [Pseudo, setPseudo] = useState(user.pseudo)
    // const userId = useParams()
    const [PhotoProfil, setPhotoProfil] = useState(null)

    const handleSubmitUpdate = (e) => {
        e.preventDefault();



        let data = {
            pseudo: Pseudo,
            email: Email
        }
        axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}/api/user/${user._id}`,
            data: data,
            withCredentials: true
        })
            .then(function (response) {
                if (response.data.picture) {
                    window.location = `/profil/${user._id}`
                } else {
                    alert("error formulaire")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        window.location = `/profil/${user._id}`
    }

    const handleDeleteUser = () => {
        // let data = {
        //     pseudo: Pseudo,
        //     email: Email
        // }
        // axios({
        //     method: 'delete',
        //     url: `http://localhost:5000/api/user/${user._id}`,
        //     withCredentials: true
        // })
        //     .then(function (response) {
        //         if (response.status[0] == 200) {
        //             window.location = `/`
        //         } else {
        //             alert("error formulaire")
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }

    const handleSubmitPdp = (e) => {
        e.preventDefault()
        if (PhotoProfil) {
            let type = PhotoProfil.type;
            type = type.toString()
            const format1 = type === "image/jpeg";
            const format2 = type === "image/png";
            const format3 = type === "image/JPG";
            const format4 = type === "image/PNG";

            if (PhotoProfil.size > 500000) {
                return alert("La taille d'image doit etre inférieur à 500Ko")
            }
            if (format1 && format2 && format3 && format4) {
                return alert("Veuiller entrer une format d'image valide: jpg ou png")
            }

        } else {
            return alert("veuillez inserer une photo")
        }

        const data = new FormData();
        data.append("file", PhotoProfil);
        var config = {
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/user/upload`,
            data: data,
            withCredentials: true,
        };
        axios(config)
            .then((res) => {
                if (res.data[0]) {
                    window.location = `/profil/${user._id}`
                }
            })
            .catch(error => {
                console.log(error)
            })


    }

    return (
        <>
            <div style={{textAlign:"center"}}>

            <Typography component="h1" variant="h5" className={classes.paper}>
                Informations personnelles
            </Typography>
            <form onSubmit={(e) => handleSubmitPdp(e)}>
                <input onChange={(e) => setPhotoProfil(e.target.files[0])} style={{ display: "hidden" }} accept="image/*" className={classes.input} id="icon-button-file" type="file" /> <br /> <br />
                <Button variant="contained" type="submit" color="primary" >
                    mettre a jour photo de profil
                </Button>
            </form>
            <br /><br /><br /><br />
            <div style={{ border: "1px solid black", display: "flex", justifyContent: "center", }}>
                <img alt="Remy Sharp" src={user.picture} />
            </div>
            <form onSubmit={handleSubmitUpdate} className={classes.form} noValidate >
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
                    value={Email}
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
                    id="nom"
                    onChange={(e) => setPseudo(e.target.value)}
                    value={Pseudo}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Modifier le profil
                </Button>
            </form>
            <Typography variant="span" className={classes.paper}>
                Date d'inscription : {dateParser(user.createdAt)}
            </Typography>
            <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={handleDeleteUser}
            >
                supprimer le profil
            </Button>
            </div>
        </>
    )
}

export default Identity
