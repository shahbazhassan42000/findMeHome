
import dogImg from "../../assets/images/bg2.jpg"

const ShelterDogCard =({name,sex,age,breed})=>{
    return (<>
        <div className={"w-[200px] h-[270px] bg-white m-5 flex flex-col rounded-[21px] overflow-hidden shadow-xl"}>
            <div className={"w-[100%] h-[120px]"}>
                <img className={"object-fill h-[100%]"} src={dogImg}/>
            </div>
            <div className={"p-3 w-[100%]"}>
                <h2 className={"text-[15px] text-center font-[600] p-3 text-[#7F99A2]"}>KODA</h2>
                <p className={"text-[#7F99A2] text-[9px] ml-2"}>{`Male,puppy`}</p>
                <p className={"text-[#7F99A2] text-[9px] ml-2"}>Pit Bull Terrier</p>
                <button type={"button"} className={"rounded-[21px] mt-5 items-between text-white text-[13px] font-[600] bg-[#3E665C] w-[100px] h-[22px]"}>See More</button>
            </div>
        </div>
    </>);
}

export default ShelterDogCard;