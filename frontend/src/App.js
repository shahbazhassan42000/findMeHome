import './App.css';
import {BrowserRouter as Router, Route, Routes,Navigate} from "react-router-dom";
import BreedCheck from "./components/Breed/BreedCheck";
import BreedResult from "./components/Breed/BreedResult";
import Signup from "./components/Auth/Signup/Signup";
import SignupAdopter from "./components/Auth/Signup/SignupAdopter";
import SignupShelter from "./components/Auth/Signup/SignupShelter";
import Login from "./components/Auth/Login";
import AddDog from "./components/Shelter/AddDog";
import {useSelector} from "react-redux";
import Home from "./components/Home/Home";
import Logout from "./components/Auth/Logout";
import ShelterHomePage from "./components/Shelter/ShelterHomePage";


function App() {
    const user = useSelector(state => state.dogStore.user);
    return (<div>
            <Router>
                <Routes>
                    <Route exact path="/logout" element={<Logout/>}/>
                    {user && <Route exact path="/s" element={<ShelterHomePage/>}/>}
                    <Route exact path="/" element={<BreedCheck/>}/>
                    <Route exact path="/br" element={<BreedResult/>}/>
                    {user && <Route exact path="/login" element={<Navigate to="/logout"/>}/>}
                    <Route exact path="/login" element={<Login/>}/>
                    {!user &&<Route exact path="/signup" element={<Signup/>}/>}
                    {user &&<Route exact path="/signup" element={<Navigate to="/logout"/>}/>}
                    {!user &&<Route exact path="/signup/a" element={<SignupAdopter/>}/>}
                    {!user &&<Route exact path="/signup/s" element={<SignupShelter/>}/>}
                    {user &&<Route exact path="/signup/a" element={<Navigate to="/logout"/>}/>}
                    {user &&<Route exact path="/signup/s" element={<Navigate to="/logout"/>}/>}
                    {user && <Route exact path="/logout" element={<Logout/>}/>}
                    {!user && <Route exact path="/logout" element={<Navigate to="/login"/>}/>}
                    {user && <Route exact path="/ad" element={<AddDog/>}/>}
                    {user && <Route exact path="/home" element={<Home/>}/>}
                    {!user && <Route exact path="/home" element={<Navigate to="/login"/>}/>}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
