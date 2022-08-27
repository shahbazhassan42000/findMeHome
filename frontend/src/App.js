import './App.css';
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import BreedCheck from "./components/Breed/BreedCheck";
import BreedResult from "./components/Breed/BreedResult";


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<BreedCheck/>}/>
                <Route exact path="/br" element={<BreedResult/>}/>
            </Routes>
        </Router>
    );
}

export default App;
