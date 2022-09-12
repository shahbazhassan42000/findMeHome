import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import BreedCheck from "./components/Breed/BreedCheck";
import BreedResult from "./components/Breed/BreedResult";
import Signup from "./components/Auth/Signup/Signup";
import SignupAdopter from "./components/Auth/Signup/SignupAdopter";
import ellipseUp from "./assets/icons/Ellipse uppper.png"
import ellipseDown from "./assets/icons/Ellipse down.png"
import vector from "./assets/icons/Vector 1.png"
import SignupShelter from "./components/Auth/Signup/SignupShelter";
import Login from "./components/Auth/Login";
import AddDog from "./components/Shelter/AddDog";
import {useSelector} from "react-redux";


function App() {
    const user = useSelector(state => state.dogStore.user);
    return (<div>
            <img className="-z-10 fixed h-[280px]" src={ellipseUp} alt="ellipse upper"/>
            <img className="-z-10 fixed h-[180px] bottom-0" src={ellipseDown} alt="ellipse down"/>
            <img className="-z-10 fixed h-[430px] bottom-0 right-0" src={vector} alt="vector"/>
            <Router>
                <Routes>
                    <Route exact path="/" element={<BreedCheck/>}/>
                    <Route exact path="/br" element={<BreedResult/>}/>
                    <Route exact path="/login" element={<Login/>}/>
                    <Route exact path="/signup" element={<Signup/>}/>
                    <Route exact path="/signup/a" element={<SignupAdopter/>}/>
                    <Route exact path="/signup/s" element={<SignupShelter/>}/>
                    {user && <Route exact path="/ad" element={<AddDog/>}/>}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
