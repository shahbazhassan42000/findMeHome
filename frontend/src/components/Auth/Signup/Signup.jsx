import logo from "../../../assets/images/find_me_home_logo.png";
import {useEffect, useRef, useState} from "react";
import Loading from "../../Loading";
import axios from "axios";
import {backendURL, citiesURL, signUpURL, statesURL} from "../../../utils/EndPoints";
import ellipseUp from "../../../assets/icons/Ellipse uppper.png";
import ellipseDown from "../../../assets/icons/Ellipse down.png";
import vector from "../../../assets/icons/Vector 1.png";
import {CountryDropdown} from "react-country-region-selector";


const Signup = ({userType}) => {
    const [msg, setMsg] = useState({show: false, msg: "", type: "general"});
    const [loading, setLoading] = useState(false);
    const [country, setCountry] = useState("");
    const [state, setState] = useState(null);
    const [cities, setCities] = useState(null);
    const [city, setCity] = useState(null);
    const [states, setStates] = useState(null);
    useEffect(() => {
        if (country) {
            axios.post(statesURL, {
                country,
            }).then(res => {
                console.log(res)
                console.log(res.data.data.states)
                setStates(res.data.data.states);
            }).catch(err => {
                console.log("ERROR");
                console.log(err);
            })
        }
    }, [country]);
    useEffect(() => {
        if (state) {
            setMsg({show: false, msg: "", type: "general"});
            axios.post(citiesURL, {
                country,
                state
            }).then(res => {
                setCities(res.data.data);
            }).catch(err => {
                console.log("ERROR");
                console.log(err);
            })
        }
    }, [state]);
    useEffect(() => {
        if (city) {
            setMsg({show: false, msg: "", type: "general"});
        }
    }, [city]);
    const passwdRef = useRef(null);
    return (
        <>
            <img className="-z-10 fixed h-[280px]" src={ellipseUp} alt="ellipse upper"/>
            <img className="-z-10 fixed h-[180px] bottom-0" src={ellipseDown} alt="ellipse down"/>
            <img className="-z-10 fixed h-[430px] bottom-0 right-0" src={vector} alt="vector"/>
            <div>
                <div className="flex flex-col mx-auto items-center">
                    <a  href="/" className="w-[220px] mt-[20px]">
                        <img src={logo} alt="logo"/>
                    </a>
                    <div className="font-['Montserrat'] flex flex-col space-y-10">
                        <h1 className="text-[#3E665C] text-[30px] font-[900] mx-auto">Sign up</h1>
                        <form onSubmit={(e) => onFormSubmit(e, setLoading, setMsg, userType)}
                              className="flex flex-col space-y-7 w-[599px]">
                            {userType === "adopter" &&
                                <div className="flex space-x-5">
                                    <div className="relative w-full">
                                        <input
                                            className="p-[5px] w-full border border-[#7F99A2] bg-transparent outline-0 placeholder:text-[#7F99A2] active:placeholder:text-white hover:placeholder:text-[#5A8081] rounded-[5px]"
                                            type="text" name="fname" placeholder="First Name*" required/>
                                        {msg.show && msg.type === "username" &&
                                            <p className="text-[14px] text-[#EB5A46] absolute">{msg.msg}</p>}
                                    </div>
                                    <div className="relative w-full">
                                        <input
                                            className="p-[5px] w-full border border-[#7F99A2] bg-transparent outline-0 placeholder:text-[#7F99A2] active:placeholder:text-white hover:placeholder:text-[#5A8081] rounded-[5px]"
                                            type="text" name="lname" placeholder="Last Name*" required/>
                                        {msg.show && msg.type === "email" &&
                                            <p className="absolute text-[14px] text-[#EB5A46]">{msg.msg}</p>}
                                    </div>
                                </div>}
                            {userType === "shelter" && <div className="relative w-full">
                                <input
                                    className="p-[5px] w-full border border-[#7F99A2] bg-transparent outline-0 placeholder:text-[#7F99A2] active:placeholder:text-white hover:placeholder:text-[#5A8081] rounded-[5px]"
                                    type="text" name="name" placeholder="Name*" required/>
                                {msg.show && msg.type === "email" &&
                                    <p className="absolute text-[14px] text-[#EB5A46]">{msg.msg}</p>}
                            </div>}
                            <div className="flex space-x-5">
                                <div className="relative w-full">
                                    <input
                                        className="p-[5px] w-full border border-[#7F99A2] bg-transparent outline-0 placeholder:text-[#7F99A2] active:placeholder:text-white hover:placeholder:text-[#5A8081] rounded-[5px]"
                                        type="text" name="username" placeholder="Username*" required/>
                                    {msg.show && msg.type === "username" &&
                                        <p className="text-[14px] text-[#EB5A46] absolute">{msg.msg}</p>}
                                </div>
                                <div className="relative w-full">
                                    <input
                                        className="p-[5px] w-full border border-[#7F99A2] bg-transparent outline-0 placeholder:text-[#7F99A2] active:placeholder:text-white hover:placeholder:text-[#5A8081] rounded-[5px]"
                                        type="email" name="email" placeholder="Email*" required/>
                                    {msg.show && msg.type === "email" &&
                                        <p className="absolute text-[14px] text-[#EB5A46]">{msg.msg}</p>}
                                </div>
                            </div>
                            {userType === "shelter" && <textarea name="street" required
                                                                 className="p-[5px] text-[14px] w-full border border-[#7F99A2] outline-0 placeholder:text-[#7F99A2] active:placeholder:text-white hover:placeholder:text-[#5A8081] rounded-[5px]"
                                                                 placeholder="Street Address*">

                        </textarea>}
                            <div className="flex space-x-5">
                                <CountryDropdown
                                    required
                                    name="country"
                                    classes="p-[5px] w-full border border-[#7F99A2] rounded-[5px]"
                                    value={country}
                                    onChange={(val) => setCountry(val)}/>
                                <select
                                    onChange={(e) => onStateChange(e.target.value, setState, setCity, setCities)}
                                    required={true} name="state"
                                    className="p-[5px] w-full border border-[#7F99A2] rounded-[5px]">
                                    <option value="Select State">Select State</option>
                                    {states && states.map((state, index) => <option key={index}
                                                                                    value={state.name}>{state.name}</option>)}
                                </select>
                            </div>
                            <div className="relative">
                                <div className="flex space-x-5">
                                    <select
                                        onChange={(e) => e.target.value === "Select City" ? setCity(null) : setCity(e.target.value)}
                                        required={true} name="city"
                                        className="p-[5px] w-full border border-[#7F99A2] rounded-[5px]">
                                        <option value="Select City">Select City</option>
                                        {cities && cities.map((city, index) => <option key={index}
                                                                                       value={city}>{city}</option>)}
                                    </select>
                                    <div className="relative w-full">
                                        <div className="relative flex items-center w-full">
                                            <input
                                                ref={passwdRef}
                                                className="w-full p-[5px] w-full border border-[#7F99A2] bg-transparent outline-0 placeholder:text-[#7F99A2] active:placeholder:text-white hover:placeholder:text-[#5A8081] rounded-[5px]"
                                                type="password" minLength="8" name="password" placeholder="Password*"
                                                required/>
                                            <span onClick={(e) => onTogglePasswd(e)}
                                                  className="text-[#7F99A2] absolute right-2 cursor-pointer fa-solid fa-eye"></span>
                                        </div>
                                        {msg.show && msg.type === "password" &&
                                            <p className="text-[14px] text-[#EB5A46] absolute">{msg.msg}</p>}
                                    </div>
                                </div>
                                {msg.show && msg.type === "general" &&
                                    <p className={`-mb-[18px] text-center text-[14px] ${msg.msg === "Your account created successfully" ? "green" : "red"} !mt-0`}>{msg.msg}</p>}
                            </div>
                            <div className="flex space-x-5">
                                <input
                                    className="p-[5px] w-full border border-[#7F99A2] bg-transparent outline-0 placeholder:text-[#7F99A2] active:placeholder:text-white hover:placeholder:text-[#5A8081] rounded-[5px]"
                                    type="text" name="phone" placeholder="Phone*" required/>
                                <div className="w-full relative">
                                    <button type="submit"
                                            className="block w-full bg-[#3E665C] hover:bg-[#5A8081] py-[5px] text-white rounded-[14px]">
                                        Sign up
                                    </button>
                                    <p className="absolute text-[12px] left-10 mt-1 text-[#7F99A2]">
                                        Already have an account?
                                        <a href="/login"
                                           className="ml-1 text-[#5A8081] font-[600] hover:text-[#3E665C]">Login</a>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {loading && <Loading/>}
            </div>
        </>
    );
}
export const onStateChange = (state, setState, setCity, setCities) => {
    if (state === "Select State") {
        setState(null);
        setCity(null);
        setCities(null);
    } else {
        setState(state);
    }
}

export const onTogglePasswd = (e) => {
    const btn = e.target;
    const passwd = e.target.previousSibling;
    if (passwd.type === "password") {
        passwd.type = "text";
        btn.classList.remove("fa-eye");
        btn.classList.add("fa-eye-slash");
    } else {
        passwd.type = "password";
        btn.classList.remove("fa-eye-slash");
        btn.classList.add("fa-eye");

    }
}
export const onFormSubmit = async (e, setLoading, setMsg, userType) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    formData.set("type", userType);
    const formObject = Object.fromEntries(formData);
    if (formObject.city === "Select City" || formObject.state === "Select State") {
        setMsg({show: true, msg: "Please select City and State", type: "general"});
        return;
    }
    console.log(formObject);
    const {username, email, password} = formObject;
    if (!username.match("^[a-zA-z\\d]+$")) setMsg({
        show: true,
        msg: "Invalid username",
        type: "username"
    });
    else if (!email.match("^[a-z\\d!#$%&'*+\\/=?^_`{|}~-]+(?:\\.[a-z\\d!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-z\\d](?:[a-z\\d-]*[a-z\\d])?\\.)+[a-z\\d](?:[a-z\\d-]*[a-z\\d])?$")) setMsg({
        show: true,
        msg: "Invalid email",
        type: "email"
    });
    else if (!password.match("^((?=.*\\d)(?=.*[A-Z])(?=.*\\W).{8,})$")) setMsg({
        show: true,
        msg: "Invalid password",
        type: "password"
    });
    else {
        setLoading(true);
        const reqBody = JSON.stringify({user: formObject});
        console.log("Req Body: ", reqBody);
        const url = backendURL + signUpURL;

        axios.post(url, reqBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res.data);
            if (res.status === 201) {
                setMsg({show: true, msg: "Your account created successfully", type: "general"});
                form.reset();
                window.location.pathname = "/login";
            } else {
                setMsg({show: true, msg: "An error occurred while signup, please try again", type: "general"});
                console.log(res);
            }
            setLoading(false);
        }).catch((err) => {
            setMsg({show: true, msg: "An error occurred while signup, please try again", type: "general"});
            console.log(err);
            setLoading(false);
        });

    }
}

export default Signup;



