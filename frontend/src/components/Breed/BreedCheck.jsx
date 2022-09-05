import logo from "../../assets/images/find_me_home_logo.png"
import dog from "../../assets/icons/dog.png"
import {useRef, useState} from "react";
import axios from "axios";
import Loading from "../Loading";
import {baseURL} from "../Auth/Signup/SignupAdopter";

const BreedCheck = () => {
    const [fileName, setFileName] = useState({name: "Upload Picture of Dog"});
    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const imgUpload = useRef(null);
    return (
        <div className="flex flex-col w-[50%] mx-auto items-center">
            <div className="w-[220px] mt-[20px]">
                <img src={logo} alt="logo"/>
            </div>
            <div className="w-[430px] font-['Montserrat']">
                <div className="mt-[35px] flex flex-col items-center  justify-center">
                    <h1 className="text-[40px] font-[900] text-center text-[#3E665C]">
                        Dog Breed Check
                    </h1>
                    <p className="text-[#5A8081] mt-[15px] px-[40px] text-center leading-[16px]">
                        Please write the name and add the picture of Dog to find out its Breed
                    </p>
                    <form
                        onSubmit={(e) => onFormSubmit(e, setMsg, setLoading, setFileName)}
                        className="flex flex-col mt-[25px] w-full px-[33px] ml-1 justify-center items-center">
                        <label
                            className="border border-[#7F99A2] active:border-[#A7B4BF] hover:border-[#5A8081] active:bg-[#5A8081] active:text-white px-[12px] py-[4px] rounded-[7px] w-full flex items-center mb-5">
                            <div className="w-[28px] mr-[10px]"><img src={dog} alt="dog icon"/></div>
                            <input
                                className="w-full bg-transparent outline-0 placeholder:text-[#7F99A2] active:placeholder:text-white hover:placeholder:text-[#5A8081]"
                                type="text" name="dogName" placeholder="Dog Name" required/>
                        </label>
                        <input
                            ref={imgUpload}
                            onChange={(e) => {
                                setFileName(e.target.files[0] ?? {name: "Upload Picture of Dog"})
                            }}
                            className="hidden absolute left-0 py-[1px] z-10" name="image"
                            type="file" accept="image/jpeg, image/jpg, image/png" required
                        />
                        <button
                            onClick={(e) => onFileChange(e, imgUpload.current)}
                            className=" relative border border-[#7F99A2] hover:border-[#5A8081] px-[12px] py-[4px] rounded-[7px] w-full flex justify-between items-center text-[#7F99A2] hover:text-[#5A8081]">
                            <div className="flex items-center text-ellipsis overflow-hidden whitespace-nowrap">
                                <span className="fa-regular fa-image mr-[10px] text-[24.4px]"></span>
                                {fileName.name}
                            </div>
                            <span className="ml-[10px] fa fa-arrow-up-from-bracket text-[24.4px]"></span>
                        </button>
                        <p className={`${msg === "ERROR! while uploading, Please try again" ? '#ff0033' : '#567a0d'} mt-3 -mb-3 text-center`}>
                            {msg}
                        </p>
                        <button
                            disabled={!(fileName && fileName.name !== "Upload Picture of Dog" && fileName.name !== "")}
                            className="mt-[25px] px-[12px] py-[4px] rounded-[7px] w-full flex items-center bg-[#E0DFE2] hover:bg-[#5A8081] disabled:bg-[#091e420a]  disabled:cursor-not-allowed text-[#3E665C] hover:text-white disabled:text-[#a5adba] font-bold flex justify-center">
                            <span>Check Breed</span>
                        </button>
                    </form>
                    <div className="mt-[25px] italic text-center">
                        <div>
                            <span className="text-[#7F99A2] text-[14px] mr-2">Be our member to adopt Dog</span>
                            <a href="/signup" className="text-[#5A8081] font-bold hover:text-[#3E665C]">Register</a>
                        </div>
                        <a href="/login" className="text-[#5A8081] font-bold hover:text-[#3E665C]">Login</a>
                    </div>
                </div>
            </div>
            {loading && <Loading/>}
        </div>

    );

}

const onFileChange = (e, imgUpload) => {
    e.preventDefault();
    imgUpload.click();
}

const onFormSubmit = (e, setMsg, setLoading, setFileName) => {
    setLoading(true);
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    console.log(formData);
    const imgBBURL = "https://api.imgbb.com/1/upload";
    const expiry = 600; //TODO
    const apiKey = "4d0eff80cd1cea3d5f1f524ac3a0808a";
    axios.post(imgBBURL + "?expiration=" + expiry + "&key=" + apiKey, form)
        .then(res => {
            setMsg("Data uploaded successfully, now under processing.\nPlease Wait!");
            console.log('response', res)
            const dogURL = res.data.data.image.url;
            console.log(dogURL);
            console.log('response URL',);
            const reqBody = JSON.stringify({dogURL});
            axios.post(baseURL + "/api/dog_model",reqBody, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response=>{
                console.log(response);
                console.log("successfully get the dog breed data");
                console.log(response.data);
            }).catch(error=>{
                console.log("Error while getting dog breed data");
                console.log(error);
            })
            console.log('success')
            e.target.reset();
            setFileName({name: "Upload Picture of Dog"});
            setLoading(false);
        }).catch(err => {
        console.log("ERROR: ", err);
        setMsg = ("ERROR! while uploading, Please try again");
        setLoading(false);
    })
}
export default BreedCheck;
