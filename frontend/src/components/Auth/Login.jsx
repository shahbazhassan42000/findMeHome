import {useRef, useState} from "react";
import logo from "../../assets/images/find_me_home_logo.png";
import Loading from "../Loading";
import {onTogglePasswd} from "./Signup/Signup";
import {backendURL, signInURL} from "../../utils/EndPoints";
import {headers, loadDogs, loadShelterDogs, loadUser} from "../../store/dogs/dogSlice";
import {useDispatch, useSelector} from "react-redux";
import ellipseUp from "../../assets/icons/Ellipse uppper.png";
import ellipseDown from "../../assets/icons/Ellipse down.png";
import vector from "../../assets/icons/Vector 1.png";

const Login=()=>{
    const user=useSelector(state=>state.dogStore.user);
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const passwdRef = useRef(null);
    const dispatch=useDispatch();
    return (
        <div>
            <img className="-z-10 fixed h-[280px]" src={ellipseUp} alt="ellipse upper"/>
            <img className="-z-10 fixed h-[180px] bottom-0" src={ellipseDown} alt="ellipse down"/>
            <img className="-z-10 fixed h-[430px] bottom-0 right-0" src={vector} alt="vector"/>
            <div className="flex flex-col mx-auto items-center">
                <a href="/" className="w-[220px] mt-[20px]">
                    <img src={logo} alt="logo"/>
                </a>
                <div className="font-['Montserrat'] flex flex-col space-y-10">
                    <h1 className="text-[#3E665C] text-[30px] font-[900] mx-auto">Login</h1>
                    <form onSubmit={(e) => onFormSubmit(e, setLoading, setMsg,dispatch,user)}
                          className="flex flex-col space-y-7 w-[295px]">
                        <label
                            className="border border-[#7F99A2] text-[#7F99A2] hover:text-[#5A8081] hover:border-[#5A8081] px-[12px] py-[4px] rounded-[7px] w-full flex items-center">
                            <span className="fa fa-user mr-[10px]"></span>
                            <input
                                className="w-full bg-transparent outline-0 placeholder:text-[#7F99A2] active:placeholder:text-white hover:placeholder:text-[#5A8081]"
                                type="text" name="username" placeholder="Username" required/>
                        </label>
                        <div>
                            <label
                                className="border border-[#7F99A2] text-[#7F99A2] hover:text-[#5A8081] hover:border-[#5A8081] px-[12px] py-[4px] rounded-[7px] w-full flex items-center">
                                <span className="fa fa-key mr-[10px]"></span>
                                <input
                                    className="w-full bg-transparent outline-0 placeholder:text-[#7F99A2] active:placeholder:text-white hover:placeholder:text-[#5A8081]"
                                    type="password" minLength="8" name="password" placeholder="Password" required/>
                                <span onClick={(e) => onTogglePasswd(e)}
                                      className="cursor-pointer fa-solid fa-eye"></span>
                            </label>
                            {msg && <p className={`-mb-3 ${msg === "Login successfully" ? 'green' : 'red'} text-center`}>
                                {msg}
                            </p>}
                        </div>
                        <button type="submit"
                                className="w-full bg-[#3E665C] hover:bg-[#5A8081] py-[5px] px-[50px] text-white rounded-[14px]">
                            Login
                        </button>
                        <div className="italic text-center !mt-5">
                            <span className="text-[#7F99A2] text-[14px] mr-2">Not a member yet?</span>
                            <a href="/signup" className="text-[#5A8081] font-bold hover:text-[#3E665C]">Register</a>
                        </div>
                    </form>
                </div>
            </div>
            {loading && <Loading/>}
        </div>
    );

}

export default Login;

const onFormSubmit = async (e, setLoading, setMsg,dispatch,user) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData);
    console.log(formObject);
    setLoading(true);
    const reqBody = JSON.stringify({user: formObject});
    console.log("Req Body: ", reqBody);
    const url = backendURL+signInURL;
    await fetch(url, {
        method: 'post',
        body: reqBody,
        headers
    }).then((res) => {
        res.json().then(resBody => {
                setLoading(false);
                if (res.status === 201) {
                    setMsg("Login successfully");
                    form.reset();
                    console.log(resBody)
                    localStorage.setItem("token",resBody.token);
                    dispatch(loadUser());
                    window.location.pathname = "/s";
                }
                else{
                    setMsg("An error occurred while login, please try again");
                    console.log(resBody);
                }
            }
        ).catch(err => {
            setMsg("An error occurred while login, please try again");
            console.log(err);
            setLoading(false);
        });
    }).catch((err) => {
        setMsg("An error occurred while login, please try again");
        console.log(err);
        setLoading(false);
    });
}

