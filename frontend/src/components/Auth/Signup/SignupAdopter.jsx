import logo from "../../../assets/images/find_me_home_logo.png";
import {useRef, useState} from "react";
import Loading from "../../Loading";
import axios from "axios";

export const baseURL = "http://localhost:5000";

const SignupAdopter = () => {
    const [msg, setMsg] = useState({show: false, msg: "", type: "general"});
    const [loading, setLoading] = useState(false);
    const passwdRef = useRef(null);
    return (
        <div>
            <div className="flex flex-col mx-auto items-center">
                <div className="w-[220px] mt-[20px]">
                    <img src={logo} alt="logo"/>
                </div>
                <div className="font-['Montserrat'] flex flex-col space-y-10">
                    <h1 className="text-[#3E665C] text-[30px] font-[900] mx-auto">Sign up</h1>
                    <form onSubmit={(e) => onFormSubmit(e, setLoading, setMsg)}
                          className="flex flex-col space-y-7 w-[295px]">
                        <div className="relative">
                            <input
                                className="p-[5px] w-full border border-[#7F99A2] bg-transparent outline-0 placeholder:text-[#7F99A2] active:placeholder:text-white hover:placeholder:text-[#5A8081] rounded-[5px]"
                                type="text" name="username" placeholder="Username*" required/>
                            {msg.show && msg.type === "username" &&
                                <p className="text-[14px] text-[#EB5A46] absolute">{msg.msg}</p>}
                        </div>
                        <div className="relative">
                            <input
                                className="p-[5px] w-full border border-[#7F99A2] bg-transparent outline-0 placeholder:text-[#7F99A2] active:placeholder:text-white hover:placeholder:text-[#5A8081] rounded-[5px]"
                                type="email" name="email" placeholder="Email*" required/>
                            {msg.show && msg.type === "email" &&
                                <p className="absolute text-[14px] text-[#EB5A46]">{msg.msg}</p>}
                        </div>
                        <div>
                            <div className="relative flex items-center w-full">
                                <input
                                    ref={passwdRef}
                                    className="p-[5px] w-full border border-[#7F99A2] bg-transparent outline-0 placeholder:text-[#7F99A2] active:placeholder:text-white hover:placeholder:text-[#5A8081] rounded-[5px]"
                                    type="password" minLength="8" name="password" placeholder="Password*" required/>
                                <span onClick={(e) => onTogglePasswd(e)}
                                      className="text-[#7F99A2] absolute right-2 cursor-pointer fa-solid fa-eye"></span>
                            </div>
                            {msg.show && msg.type === "password" &&
                                <p className="text-[14px] text-[#EB5A46] absolute">{msg.msg}</p>}
                            {msg.show && msg.type === "general" &&
                                <p className={`-mb-[18px] text-center text-[14px] ${msg.msg === "Your account created successfully" ? "green" : "red"} !mt-0`}>{msg.msg}</p>}
                        </div>
                        <button type="submit"
                                className="w-full bg-[#3E665C] hover:bg-[#5A8081] py-[5px] px-[50px] text-white rounded-[14px]">
                            Sign up
                        </button>
                        <div className="w-full flex flex-col -space-y-1 text-center text-[14px] italic">
                            <p className="text-[#7F99A2]">
                                Already have an account?
                            </p>
                            <a href="/login"
                               className="text-[#5A8081] font-[600] hover:text-[#3E665C]">Login</a>
                        </div>

                    </form>
                </div>
            </div>
            {loading && <Loading/>}
        </div>
    );
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

const onFormSubmit = async (e, setLoading, setMsg) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    formData.set("type", "adopter");
    const formObject = Object.fromEntries(formData);
    console.log(formObject)
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
        const url = baseURL + "/api/v0.1/user";
        axios.post(url, reqBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log(res.data);
            if (res.status === 201) {
                setMsg({show: true, msg: "Your account created successfully", type: "general"});
                form.reset();
                // window.location.pathname = "/login";
            }
            else setMsg({show: true, msg: "An error occurred while signup, please try again", type: "general"});
            setLoading(false);
        }).catch((err) => {
            setMsg({show: true, msg: "An error occurred while signup, please try again", type: "general"});
            console.log(err);
            setLoading(false);
        });
        // fetch(url, {
        //     method: 'POST',
        //     body:reqBody,
        //     headers: {
        //         'Content-Type':'application/json'
        //     },
        // }).then((res) => {
        //     res.json().then(resBody => {
        //         console.log(resBody)
        //             setLoading(false);
        //             if (res.status === 201) {
        //                 setMsg({show: true, msg: "Your account created successfully", type: "general"});
        //                 form.reset();
        //                 window.location.pathname = "/login";
        //             } else if (resBody.type === "username") setMsg({
        //                 show: true,
        //                 msg: "Username not available",
        //                 type: "username"
        //             });
        //             else if (resBody.type === "email") setMsg({
        //                 show: true,
        //                 msg: "An account already exists against this email",
        //                 type: "email"
        //             });
        //             else setMsg({show: true, msg: "An error occurred while signup, please try again", type: "general"});
        //         }
        //     ).catch(err => {
        //         setMsg({show: true, msg: "An error occurred while signup, please try again", type: "general"});
        //         console.log(err);
        //         setLoading(false);
        //     });
        // }).catch((err) => {
        //     setMsg({show: true, msg: "An error occurred while signup, please try again", type: "general"});
        //     console.log(err);
        //     setLoading(false);
        // });
    }
}

export default SignupAdopter;



