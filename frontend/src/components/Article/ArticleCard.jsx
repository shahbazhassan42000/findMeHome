const ArticleCard = ({bgURL, url, name, descp}) => {
    return (
        <div
            className="w-[256px] h-[350px] flex flex-col text-[#7F99A2] bg-white items-center space-y-3 px-[30px] py-[25px] rounded-[21px] shadow-[0px_14px_20px_#2A5076]">
            <div className="relative mb-14">
                <img className="w-[256px]" src={bgURL} alt="dog"/>
                <img className="absolute top-11 left-12 w-[90px]" src={url} alt="dog"/>
            </div>
            <h3 className="font-bold uppercase">{name}</h3>
            <p>Male, <span>{descp}</span></p>
            <button className="bg-[#3E665C] hover:bg-[#5A8081] text-white font-bold rounded-[18px] px-12 py-1">Read More</button>
        </div>);
}
export default ArticleCard;
