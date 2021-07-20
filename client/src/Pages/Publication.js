import React, { useContext } from 'react'
import { Uid } from '../Context/Uid'
import CreateVoiture from "../Components/CreateVoiture"
import Layouts from '../Layouts/Layouts'

const Publication = () => {
    const idUtilisatuerSiConnecter = useContext(Uid)
   
    return (
        <Layouts>
            {idUtilisatuerSiConnecter && <CreateVoiture />}
        </Layouts>
    )
}

export default Publication
