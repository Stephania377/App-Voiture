import React, { useContext, useEffect, useState } from 'react';
import Commentaires from '../Components/Commentaires.js';
import { useParams } from 'react-router-dom';
import Layouts from '../Layouts/Layouts';
import ImageOneVoiture from '../Components/ImageOneVoiture'
import CreateComment from '../Components/CreateComment'
import RequireAuth from '../Components/RequireAuth'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Uid } from '../Context/Uid';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';
import CardCaracteristique from '../Components/CardCaracteristique'
import ChargementPage from "../Components/ChargementPageAccueil"


const Voiture = (props) => {
	const [OneVoiture, setOneVoiture] = useState(null)
	const [allUser, setAllUser] = useState([])
	const idUtilisateurConnecter = useContext(Uid)
	const [NewComment, setNewComment] = useState(null)
	//Hooks qui recupere le parametre
	const params = useParams()


	const handleSubmitComm = (e) => {
		e.preventDefault()

		if(!NewComment){
			return alert("vous ne pouvez pas envoyer une commentaire vide")
		}
		console.log(idUtilisateurConnecter)
		let config = {
			method: 'post',
			url: `${process.env.REACT_APP_API_URL}/api/comment/${params.id}`,
			data: {
				"text": NewComment
			},
			withCredentials: true
		};

		axios(config)
			.then(function (response) {
				if (response.data) {
					setNewComment("")
				} else {
					console.log("error")
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}



	useEffect(() => {
		const config = {
			method: 'get',
			url: `${process.env.REACT_APP_API_URL}/api/voiture/${params.id}`,
		};
		const config2 = {
			method: 'get',
			url: `${process.env.REACT_APP_API_URL}/api/user/`,
		};
		axios(config)
			.then(function (response) {
				console.log(response)
				if (response.data._id) {
					setOneVoiture(response.data)
				} else {
					alert("pas de voiture disponible")
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		axios(config2)
			.then(function (response) {
				if (response.data[0]) {
					console.log(response.data)
					setAllUser(response.data)
				} else {
					alert("pas user disponible")
				}
			})
			.catch(function (error) {
				console.log(error);
			});

	}, [NewComment])

	const useStyles = makeStyles((theme) => ({
		paper: {
			margin: theme.spacing(6, 0, 2, 0),
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
	}));
	const classes = useStyles();

	return (
		<Layouts>
			{console.log(OneVoiture)}
			{
				!OneVoiture ?
					<ChargementPage item={1} width={1510} height={418} />
					:
					<>
						<Typography component="h1" variant="h5" className={classes.paper}>
							{OneVoiture.name}
						</Typography>
						<div align="center">Publié par
							{allUser && allUser.map(user => {
								if (OneVoiture.userId === user._id) {
									return <span style={{ color: "grey" }}>
										<Link to={`/profil/${user._id}`}>
											{" " + user.pseudo}
										</Link>
									</span>
								}
							})}

						</div> <br /> <br /> <br />



						<div className="container">
							<div className="row">
								<div className="col-10">
									<ImageOneVoiture picture={OneVoiture.picture} />
								</div>
								<div className="col-2">
									<CardCaracteristique OneVoiture={OneVoiture && OneVoiture} />
								</div>
							</div>
						</div>

						{idUtilisateurConnecter ? <CreateComment NewComment={NewComment} setNewComment={setNewComment} handleSubmitComm={(NewComment) => handleSubmitComm(NewComment)} /> : <RequireAuth />}


						<div style={{ marginTop: 20 }}>
							<ul align="center" syle={{ listStyle: "none" }}>
								{
									OneVoiture.comments.map(comment => {
										return <Commentaires
											key={comment._id}
											user={
												allUser && allUser.find(OneUser => {
													return OneUser._id === comment.commentUserId
												})
											}

											text={comment.text}
											time={comment.timestamps}
										/>
									})
								}
							</ul>
						</div >
					</>
			}

		</Layouts>

	);
}

export default Voiture;