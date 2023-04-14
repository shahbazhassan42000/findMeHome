import {useDispatch} from "react-redux";
import {deleteDog, dogInfoReceived, loadDogDiseases, loadShelter} from "../../store/dogs/dogSlice";

const ShelterDogCard = ({type, dog, name, dogImg, age, breed, did}) => {
    const dispatch = useDispatch();
    return (<>
        <div className={"w-[200px] h-[270px] bg-white m-5 flex flex-col rounded-[21px] overflow-hidden shadow-xl"}>
            <div className={"w-[100%] h-[120px]"}>
                <img className={"object-fill w-[100%] h-[100%]"} src={dogImg}/>
            </div>
            <div className={"relative p-3 w-[100%]"}>
                <h2 className={"text-[15px] text-center font-[600] p-3 text-[#7F99A2]"}>{name}</h2>
                <p className={"text-[#7F99A2] text-[9px] ml-2"}>{`${age}`}</p>
                <p className={"text-[#7F99A2] text-[9px] ml-2"}>{breed}</p>
                {
                    (type === "see more") ? (<button onClick={() => {
                            dispatch(loadShelter(dog.sid));
                            dispatch((loadDogDiseases({"dog":{"did":dog.did}})));
                            dispatch(dogInfoReceived(dog));
                            window.location="/di"
                        }
                        } type={"button"}
                                                     className={"absolute rounded-[21px] mt-5 items-between text-white text-[13px] font-[600] bg-[#3E665C] w-[100px] h-[22px] "}>See
                            More</button>) :
                        (<div className={"flex"}>
                            <button type={"button"}
                                    className={"rounded-[21px] mx-1 mt-5 items-between text-white text-[13px] font-[600] bg-[#3E665C] w-[100px] h-[22px]"}>Edit
                            </button>
                            <button onClick={() => {
                                dispatch(deleteDog({"dog": {did}}));
                                window.location.reload();
                            }} type={"button"}
                                    className={"rounded-[21px] mx-1 mt-5 items-between text-white text-[13px] font-[600] bg-[#3E665C] w-[100px] h-[22px]"}>Delete
                            </button>
                        </div>)
                }
            </div>
        </div>
    </>);
}

export default ShelterDogCard;
