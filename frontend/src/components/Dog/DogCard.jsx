const DogCard = ({url, name, age, loc}) => {
    return (
        <div className="w-[256px] h-[350px] flex flex-col text-[#7F99A2] bg-white items-center space-y-3 px-[30px] py-[25px] rounded-[21px] shadow-[0px_14px_20px_#2A5076]">
            <img className="w-[90px]" src={url} alt="dog"/>
            <h3 className="font-bold">{name}</h3>
            <button className="bg-[#3E665C] hover:bg-[#5A8081] text-white font-bold rounded-[6px] px-4 py-1 uppercase">Shelter</button>
            <p>Male, <span>{age}</span></p>
            <p>{loc}</p>
            <button className="bg-[#3E665C] hover:bg-[#5A8081] text-white font-bold rounded-[18px] px-12 py-1">See More</button>
        </div>);
}
export default DogCard;
