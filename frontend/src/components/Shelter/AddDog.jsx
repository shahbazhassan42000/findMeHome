import logo from "../../assets/images/find_me_home_logo.png"
import dogImg from "../../assets/icons/dog.png"
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Loading from "../Loading";
import {useDispatch, useSelector} from "react-redux";
import {breedResult, headers} from "../../store/dogs/dogSlice";
import {filter, map, size} from "lodash";
import {backendURL, dogApiURL, imgBBApiKey, imgBBURL, modelURL} from "../../utils/EndPoints";

const AddDog = () => {
    const user = useSelector(state => state.dogStore.user);
    const dispatch = useDispatch();
    const [selectedBreed, setSelectedBreed] = useState("Select Breed");
    const [diseases, setDiseases] = useState(useSelector(state => state.dogStore.diseases));
    const [breeds, setBreeds] = useState(useSelector(state => state.dogStore.breeds));
    const [ages, setAges] = useState(useSelector(state => state.dogStore.ages));
    const [selectedDiseases, setSelectedDiseases] = useState([]);
    const [searchFocus, setSearchFocus] = useState(false);
    const [dog, setDog] = useState(null);
    const [fileName, setFileName] = useState({name: "Upload Picture of Dog"});
    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const imgUpload = useRef(null);
    const formRef = useRef(null);
    useEffect(() => {
        if (dog) {
            dispatch(breedResult({...dog}));
            window.location.pathname = "/br";
        }
    }, [dog]);


    return (
        <div className="flex flex-col w-[50%] mx-auto items-center mb-20">
            <a href="/" className="w-[220px] mt-[20px]">
                <img src={logo} alt="logo"/>
            </a>
            <div className="w-[430px] font-['Montserrat']">
                <div className="mt-[35px] flex flex-col items-center  justify-center">
                    <h1 className="text-[40px] font-[900] text-center text-[#3E665C]">
                        Add Dog
                    </h1>
                    <p className="text-[#5A8081] mt-[15px] px-[40px] text-center leading-[16px]">
                        Please Enter the Required Details of Dog
                    </p>
                    <form
                        ref={formRef}
                        className="flex flex-col mt-[25px] w-full px-[33px] ml-1 justify-center items-center">
                        <label
                            className="border border-[#7F99A2] active:border-[#A7B4BF] hover:border-[#5A8081] active:bg-[#5A8081] active:text-white px-[12px] py-[4px] rounded-[7px] w-full flex items-center mb-5">
                            <div className="w-[28px] mr-[10px]"><img src={dogImg} alt="dog icon"/></div>
                            <input
                                className="w-full bg-transparent outline-0 placeholder:text-[#7F99A2] active:placeholder:text-white hover:placeholder:text-[#5A8081]"
                                type="text" name="dogName" placeholder="Dog Name*" required/>
                        </label>
                        <label
                            className="border text-[#7F99A2] hover:text-[#5A8081] border-[#7F99A2] active:border-[#A7B4BF] hover:border-[#5A8081] active:bg-[#5A8081] active:text-white px-[12px] py-[4px] rounded-[7px] w-full flex items-center mb-5">
                            <span className="fa-brands fa-pagelines mr-[10px] text-[24.4px]"></span>
                            <select
                                name="age"
                                // value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)}
                                className=" p-[5px] w-full outline-0 text-[#7F99A2] hover:text-[#5A8081] border-[#7F99A2] rounded-[5px]">
                                <option value="Select Age">Select Age</option>
                                {map(ages, age => {
                                    return <option key={age[0]} value={age[0]}>{`${age[0]}(${age[1]})`}</option>
                                })}
                            </select>
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
                            className="mb-5 relative border border-[#7F99A2] hover:border-[#5A8081] px-[12px] py-[4px] rounded-[7px] w-full flex justify-between items-center text-[#7F99A2] hover:text-[#5A8081]">
                            <div className="flex items-center text-ellipsis overflow-hidden whitespace-nowrap">
                                <span className="fa-regular fa-image mr-[10px] text-[24.4px]"></span>
                                {fileName.name}
                            </div>
                            <span className="ml-[10px] fa fa-arrow-up-from-bracket text-[24.4px]"></span>
                        </button>
                        <div className="w-full flex mb-5 space-x-3 ">
                            <select
                                value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)}
                                className="w-[60%] p-[5px] w-full border outline-0 text-[#7F99A2] hover:text-[#5A8081] border-[#7F99A2] rounded-[5px]">
                                <option value="Select Breed">Select Breed</option>
                                {map(breeds, breed => {
                                    return <option key={breed.bid} value={breed.bid}>{breed.bname}</option>
                                })}
                            </select>
                            <button
                                onClick={(e) => onFindBreed(e, fileName, setSelectedBreed, setLoading, setMsg, breeds)}
                                disabled={!(fileName && fileName.name !== "Upload Picture of Dog" && fileName.name !== "")}
                                className="py-[4px] w-[40%] rounded-[7px] flex items-center bg-[#E0DFE2] hover:bg-[#5A8081] disabled:bg-[#091e420a]  disabled:cursor-not-allowed text-[#3E665C] hover:text-white disabled:text-[#a5adba] font-bold flex justify-center">
                                <span>Find Breed</span>
                            </button>
                        </div>
                        <div className={`flex flex-col w-full ${size(selectedDiseases) !== 0 && 'mb-5'}`}>
                            <div
                                className={`${searchFocus ? 'shadow-[inset_0_0_0_1px_#5A8081]' : 'shadow-[inset_0_0_0_1px_#7F99A2]'} hover:shadow-[inset_0_0_0_1px_#5A8081] flex flex-wrap space-y-1 items-center py-[8px] px-[12px] rounded-[7px]`}>
                                {map(selectedDiseases, disease => {
                                    return (
                                        <div
                                            key={disease.disid}
                                            className="bg-[#091e420a] flex items-center mr-2 text-[#7F99A2] cursor-default text-[14px] py-[2px] px-[4px] rounded-[3px]">
                                            <p>{disease.name}</p>
                                            <span
                                                onClick={() => onRemoveDisease(disease, setSelectedDiseases, setDiseases)}
                                                className="fa fa-close mt-1 ml-3 pr-[2px] hover:text-[#5A8081] hover:cursor-pointer">
                                        </span>
                                        </div>
                                    );
                                })}
                                <select
                                    onChange={e => onDiseaseChange(e.target, setDiseases, setSelectedDiseases, diseases)}
                                    onFocus={() => setSearchFocus(true)}
                                    onBlur={() => setSearchFocus(false)}
                                    className="outline-0 bg-transparent text-[#7F99A2] hover:text-[#5A8081] leading-[20px] text-[14px] min-h-[36px] min-w-[40px]"
                                >
                                    <option value="Select Disease">Select Disease</option>
                                    {map(diseases, disease => {
                                        return <option key={disease.disid} value={disease.disid}>{disease.name}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        {size(selectedDiseases) !== 0 &&
                            <textarea name="diseaseDescp" required
                                      className="p-[5px] text-[#7F99A2] hover:text-[#5A8081] text-[14px] w-full border border-[#7F99A2] hover:border-[#5A8081] focus:border-[#5A8081] outline-0 placeholder:text-[#7F99A2] active:placeholder:text-white hover:placeholder:text-[#5A8081] rounded-[5px]"
                                      placeholder="Disease Description*">
                        </textarea>

                        }
                        <p className={`${msg === "ERROR! while uploading, Please try again" || msg === "ERROR! while getting dog breed data, Please try again" ? 'red' : 'green'} mt-3 -mb-3 text-center`}>
                            {msg}
                        </p>
                        <button
                            onClick={(e) => onFormSubmit(e, formRef.current, setMsg, setLoading, selectedBreed, selectedDiseases, user)}
                            disabled={!(fileName && fileName.name !== "Upload Picture of Dog" && fileName.name !== "" && selectedBreed !== "Select Breed")}
                            className="mt-[25px] px-[12px] py-[4px] rounded-[7px] w-full flex items-center bg-[#E0DFE2] hover:bg-[#5A8081] disabled:bg-[#091e420a]  disabled:cursor-not-allowed text-[#3E665C] hover:text-white disabled:text-[#a5adba] font-bold flex justify-center">
                            <span>ADD</span>
                        </button>
                    </form>
                </div>
            </div>
            {loading && <Loading/>}
        </div>

    );

}

const onFindBreed = (e, fileName, setSelectedBreed, setLoading, setMsg, breeds) => {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append('image', fileName);
    axios.post(imgBBURL + "?key=" + imgBBApiKey, form)
        .then(res => {
            const dogImgURL = res.data.data.image.url;
            console.log('response URL: ', dogImgURL);
            const reqBody = JSON.stringify({dogURL: dogImgURL});
            axios.post(backendURL + modelURL, reqBody, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                const predictedBreed = response.data;
                console.log("successfully got the dog breed: ", predictedBreed);
                map(breeds, breed => {
                    if (breed.bname === predictedBreed) setSelectedBreed(breed.bid);
                })
                setLoading(false);
            }).catch(error => {
                setMsg("ERROR! while getting dog breed data, Please try again");
                setTimeout(() => setMsg(""), 5000);
                setLoading(false);
                console.log(error);
            })

        }).catch(err => {
        console.log("ERROR: ", err);
        setMsg("ERROR! while getting dog breed data, Please try again");
        setTimeout(() => setMsg(""), 5000);
        setLoading(false);
    })
}

const onDiseaseChange = (selection, setDiseases, setSelectedDiseases, diseases) => {
    let selectedDisease = "";
    for (let disease of diseases) {
        if (disease.disid.toString() === selection.value) {
            selectedDisease = disease;
            break;
        }
    }
    setSelectedDiseases(diseases => [...diseases, selectedDisease]);
    setDiseases(diseases => {
        return filter(diseases, (disease) => disease.disid.toString() !== selection.value);
    })
}


const onFileChange = (e, imgUpload) => {
    e.preventDefault();
    imgUpload.click();
}

const onRemoveDisease = (disease, setSelectedDiseases, setDiseases) => {
    setDiseases(diseases => [...diseases, disease]);
    setSelectedDiseases(diseases => {
        return filter(diseases, (dis) => dis.disid.toString() !== disease.disid.toString());
    })
}

const onFormSubmit = (e, formRef, setMsg, setLoading, selectedBreed, selectedDiseases, user) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(formRef);
    const formData = Object.fromEntries(form.entries());
    axios.post(imgBBURL + "?key=" + imgBBApiKey, form)
        .then(res => {
            const dogImgURL = res.data.data.image.url;
            console.log('response URL: ', dogImgURL);
            const dog = {
                name: formData.dogName,
                age: formData.age,
                imageURL: dogImgURL,
                bid: selectedBreed,
                diseasesId: map(selectedDiseases, disease => disease.disid),
                diseaseDescription: formData.diseaseDescp
            }
            const reqBody = JSON.stringify({user,dog});
            console.log(reqBody);
            axios.post(backendURL+dogApiURL,reqBody, {
                headers
            }).then(res=>{
                console.log("ERROR: ", res);
                setMsg("Dog Added Successfully!!!");
                setLoading(false);
                window.location="/ad";
            }).catch(err=>{
                console.log("ERROR: ", err);
                setMsg("ERROR! while uploading, Please try again");
                setTimeout(() => setMsg(""), 5000);
                setLoading(false);
            })

        }).catch(err => {
        console.log("ERROR: ", err);
        setMsg("ERROR! while uploading, Please try again");
        setTimeout(() => setMsg(""), 5000);
        setLoading(false);
    })

}
export default AddDog;


