import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import BreedCheck from "./components/Breed/BreedCheck";
import BreedResult from "./components/Breed/BreedResult";
import Auth from "./components/Auth/Signup/Auth";
import Signup from "./components/Auth/Signup/Signup";
import Login from "./components/Auth/Login";
import AddDog from "./components/Shelter/AddDog";
import {useSelector} from "react-redux";
import Home from "./components/Home/Home";
import Logout from "./components/Auth/Logout";
import ShelterHomePage from "./components/Shelter/ShelterHomePage";
import ProfileSetting from "./components/user/ProfileSetting";
import DogInfo from "./components/Dog/DogInfo";


function App() {
    const user = useSelector(state => state.dogStore.user);
    return (<div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    {!user && <Route exact path="/logout" element={<Navigate to="/login"/>}/>}
                    <Route exact path="/logout" element={<Logout/>}/>
                    {user && <Route exact path="/s" element={<ShelterHomePage/>}/>}
                    {user && <Route exact path="/user/ps" element={<ProfileSetting/>}/>}
                    {user && <Route exact path="/di" element={<DogInfo/>}/>}
                    <Route exact path="/bc" element={<BreedCheck/>}/>
                    <Route exact path="/br" element={<BreedResult/>}/>
                    {user && <Route exact path="/login" element={<Navigate to="/logout"/>}/>}
                    <Route exact path="/login" element={<Login/>}/>
                    {!user && <Route exact path="/signup" element={<Auth/>}/>}
                    {user && <Route exact path="/signup" element={<Navigate to="/logout"/>}/>}
                    {!user && <Route exact path="/signup/a" element={<Signup userType="adopter"/>}/>}
                    {!user && <Route exact path="/signup/s" element={<Signup userType="shelter"/>}/>}
                    {user && <Route exact path="/signup/a" element={<Navigate to="/logout"/>}/>}
                    {user && <Route exact path="/signup/s" element={<Navigate to="/logout"/>}/>}
                    {user && <Route exact path="/logout" element={<Logout/>}/>}
                    {!user && <Route exact path="/logout" element={<Navigate to="/login"/>}/>}
                    {/*{user && <Route exact path="/ad" element={<AddDog/>}/>}*/}
                    <Route exact path="/ad" element={<AddDog/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
