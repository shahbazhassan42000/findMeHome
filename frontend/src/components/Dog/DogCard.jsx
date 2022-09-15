import {useDispatch} from "react-redux";
import {loadShelter} from "../../store/dogs/dogSlice";

const DogCard = ({url, name, age, breed,sid}) => {
    const dispatch=useDispatch();
    return (
        <div className="w-[256px] h-[350px] flex flex-col text-[#7F99A2] bg-white items-center space-y-3 pb-[25px] rounded-[21px] shadow-[0px_14px_20px_#2A5076]">
            <img className="h-[160px]  w-[256px] rounded-t-[21px]" src={url} alt="dog"/>
            <div className=" px-[30px] space-y-1 ">
                <h3 className="font-bold">{name}</h3>
                <button onClick={()=>{
                    dispatch(loadShelter(sid));
                    window.location="/s"
                }} className="bg-[#3E665C] hover:bg-[#5A8081] text-white font-bold rounded-[6px] px-4 py-1 uppercase">Shelter</button>
                <p>Male, <span>{age}</span></p>
                <p>{breed}</p>
                <button  className="bg-[#3E665C] hover:bg-[#5A8081] text-white font-bold rounded-[18px] px-12 py-1">See More</button>
            </div>
            </div>);
}
export default DogCard;
