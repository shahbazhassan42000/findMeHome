import dogImg from "../../assets/images/bg2.jpg";
import React, {useState} from "react";
import {CountryDropdown} from "react-country-region-selector";
import {onStateChange} from "../Auth/Signup/Signup";


const ProfileSetting = () =>{

    const [username,setUsername] = useState("");
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [address,setAddress] = useState("");
    const [contact,setContact] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState(null);
    const [cities, setCities] = useState(null);
    const [city, setCity] = useState(null);
    const [states, setStates] = useState(null);

    const submitHandle =(e)=>{
        e.preventDefault();


    }

    return (
        <>
            <div className={"flex justify-center items-center"}>
                <div className={"max-w-screen-xl w-[100%]"}>
                    <div className="flex flex-col w-[100%]">
                        <div className="flex block flex-row p-3 items-center h-[150px]">
                            <img className="w-[77px] h-[77px] rounded-[50%] object-cover" src={dogImg} alt=""/>
                            <div className={"ml-5"}>
                                <h1 className="text-[#3E665C] font-[900] text-[40px]">Shelter Name</h1>
                            </div>

                        </div>
                        <div className={"h-[1px] w-[100%] bg-[#70CF36] block"}></div>
                        <div className={"flex justify-center items-center mt-10"}>
                            <form onSubmit={submitHandle} className={"form max-w-[800px] w-[100%]"}>
                                <div className={"flex w-[100%]"}>
                                    <div className={"flex flex-col w-[100%]"}>
                                        <div className={"h-[90px] mb-5"}>
                                            <label className={"text-[15px] text-[#3E665C] font-bold"}>Firstname</label><br/>
                                            <input className={"bg-transparent border-b border-[#3E665C] w-[100%] text-[#7F99A2] h-[50px] p-2 outline-0 focus:border-[#70CF36]"} type={"text"} value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
                                        </div>
                                        <div className={"h-[90px] mb-5"}>
                                            <label className={"text-[15px] text-[#3E665C] font-bold"}>Username</label><br/>
                                            <input className={"bg-transparent border-b border-[#3E665C] w-[100%] text-[#7F99A2] h-[50px] p-2 outline-0 focus:border-[#70CF36]"} type={"text"} value={username} onChange={(e)=>setUsername(e.target.value)}/>
                                        </div>
                                        <div className="h-[90px] mb-5">
                                            <label className={"text-[15px] text-[#3E665C] font-bold"}>Country</label>
                                            <br/>
                                            <CountryDropdown
                                                required
                                                name="country"
                                                classes="p-[5px] w-full h-[50px] bg-transparent border-b border-[#3E665C] outline-0"
                                                value={country}
                                                onChange={(val) => setCountry(val)}/>

                                        </div>
                                        <div className={"h-[90px] mb-5"}>
                                            <label className={"text-[15px] text-[#3E665C] font-bold"}>City</label><br/>
                                        <select
                                            onChange={(e) => e.target.value === "Select City" ? setCity(null) : setCity(e.target.value)}
                                            required={true} name="city"
                                            className="p-[5px] w-full h-[50px] bg-transparent border-b border-[#3E665C] outline-0">
                                            <option value="Select City">Select City</option>
                                            {cities && cities.map((city, index) => <option key={index}
                                                                                           value={city}>{city}</option>)}
                                        </select>
                                        </div>
                                        <div className={"h-[90px] mb-5"}>
                                            <label className={"text-[15px] text-[#3E665C] font-bold"}>Contact</label><br/>
                                            <input className={"bg-transparent border-b border-[#3E665C] w-[100%] text-[#7F99A2] h-[50px] p-2 outline-0 focus:border-[#70CF36]"} type={"text"} value={contact} onChange={(e)=>setContact(e.target.value)}/>
                                        </div>

                                    </div>
                                    <div className={"flex flex-col ml-10 w-[100%]"}>
                                        <div className={"h-[90px] mb-5"}>
                                            <label className={"text-[15px] text-[#3E665C] font-bold"}>Lastname</label><br/>
                                            <input className={"bg-transparent border-b border-[#3E665C] w-[100%] text-[#7F99A2] h-[50px] p-2 outline-0 focus:border-[#70CF36]"} type={"text"} value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
                                        </div>
                                        <div className={"h-[90px] mb-5"}>
                                            <label className={"text-[15px] text-[#3E665C] font-bold"}>Email</label><br/>
                                            <input className={"bg-transparent border-b border-[#3E665C] w-[100%] text-[#7F99A2] h-[50px] p-2 outline-0 focus:border-[#70CF36]"} type={"text"} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                        </div>
                                        <div className={"h-[90px] mb-5"}>
                                            <label className={"text-[15px] text-[#3E665C] font-bold"}>State</label><br/>
                                        <select
                                            onChange={(e) => onStateChange(e.target.value, setState, setCity, setCities)}
                                            required={true} name="state"
                                            className="p-[5px] w-full h-[50px] bg-transparent border-b border-[#3E665C] outline-0">
                                            <option value="Select State">Select State</option>
                                            {states && states.map((state, index) => <option key={index}
                                                                                            value={state.name}>{state.name}</option>)}
                                        </select>
                                        </div>
                                        <div className={"h-[90px] mb-5"}>
                                            <label className={"text-[15px] text-[#3E665C] font-bold"}>Address</label><br/>
                                            <input className={"bg-transparent border-b border-[#3E665C] w-[100%] text-[#7F99A2] h-[50px] p-2 outline-0 focus:border-[#70CF36]"} type={"text"} value={address} onChange={(e)=>setAddress(e.target.value)}/>
                                        </div>
                                        <button    className={"rounded-[21px] mt-8 text-white text-[13px] font-[600] bg-[#3E665C] w-full h-[40px]"} type={"submit"}>Update</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileSetting;