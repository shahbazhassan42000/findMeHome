import dogImg from "../../assets/images/bg2.jpg";
import React, {useState} from "react";


const ProfileSetting = () =>{

    const [username,setUsername] = useState("");
    const [address,setAddress] = useState("");
    const [contact,setContact] = useState("");
    const [phone,setPhone] = useState("");
    const [email, setEmail] = useState("");

    return (
        <>
            <div className={"flex justify-center items-center"}>
                <div className={"max-w-screen-xl w-[100%]"}>
                    <div className="flex flex-col w-[100%]">
                        <div className="flex flex-row p-3 items-center h-[150px]">
                            <img className="w-[77px] h-[77px] rounded-[50%] object-cover" src={dogImg} alt=""/>
                            <div className={"ml-5"}>
                                <h1 className="text-[#3E665C] font-[900] text-[40px]">Shelter Name</h1>
                            </div>

                        </div>
                        <div className={"h-[1px] w-[100%] bg-[#70CF36] block"}></div>
                        <div>
                            <form className={"form max-w-screen-md"}>
                                <div className={"h-[60px] mb-5 "}>
                                    <label className={"text-[15px] text-[#3E665C] font-bold"}>Username</label><br/>
                                    <input className={"bg-transparent border-b"} type={"text"} value={username} onChange={(e)=>e.target.value}/>
                                </div>
                                <div className={""}>
                                    <label className={"text-[15px] text-[#3E665C] font-bold"}>Address</label><br/>
                                    <input className={"bg-transparent "} type={"text"} value={address} onChange={(e)=>e.target.value}/>
                                </div>
                                <div className={"form"}>
                                    <label className={"text-[15px] text-[#3E665C] font-bold"}>Phone</label><br/>
                                    <input className={"bg-transparent "} type={"text"} value={phone} onChange={(e)=>e.target.value}/>
                                </div>
                                <div className={"form"}>
                                    <label className={"text-[15px] text-[#3E665C] font-bold"}>Contact</label><br/>
                                    <input className={"bg-transparent "} type={"text"} value={contact} onChange={(e)=>e.target.value}/>
                                </div>
                                <div className={"form"}>
                                    <label className={"text-[15px] text-[#3E665C] font-bold"}>Email</label><br/>
                                    <input className={"bg-transparent "} type={"text"} value={email} onChange={(e)=>e.target.value}/>
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