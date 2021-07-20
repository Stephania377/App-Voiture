import { BrowserRouter, Route, Switch } from "react-router-dom";
import Inscription from "../Pages/Inscription.js";
import Login from "../Pages/Login.js";
import Voiture from "../Pages/Voiture.js";
import Profil from "../Pages/Profil.js";
import Home from '../Pages/Home.js'
import Publication from "../Pages/Publication.js";
import { useContext } from "react";
import { Uid } from "../Context/Uid.js";



const Routes = () => {
    const idUtilisatuerSiConnecter = useContext (Uid)
    
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/inscription" component={Inscription} />
                    <Route path="/connexion" component={Login} />
                    <Route path="/publiez-voiture" component={ idUtilisatuerSiConnecter ? Publication : Home} />
                    <Route path="/voiture/:id" component={Voiture} />
                    <Route path="/profil/:id" component={Profil} />
                </Switch>
            </BrowserRouter>
        </>
    );
}
export default Routes;