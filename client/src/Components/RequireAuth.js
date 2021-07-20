import React from 'react'
import {Link} from 'react-router-dom'

const RequireAuth = () => {
    return (
        <div style={{ margin: 50 }} align="center">
            <Link to="/connexion">Connectez-vous</Link> ou <Link to="/inscription">Inscrivez-vous</Link> pour voir les commentaires et commenter
        </div>
    )
}

export default RequireAuth
