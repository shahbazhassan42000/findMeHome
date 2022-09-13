import ArticleCard from "./ArticleCard";
import articleCardBg from "../../assets/images/dogArticleBg.png"
import arrowRight from "../../assets/icons/arrowRight.png";
import arrowLeft from "../../assets/icons/arrowLeft.png"
const DogArticles = () => {
    return (
        <div className="flex flex-col px-8 text-center">
            <h2 className="text-[#3E665C] font-bold text-[40px]">Dog <span
                className="text-[#70CF36]  font-['Bubblegum_Sans']">Articles</span></h2>
            <div className="flex items-center justify-evenly mt-9">
                <img className="h-[70px] cursor-pointer" src={arrowLeft} alt="arrow left"/>
                <ArticleCard name={"Dog Care"} bgURL={articleCardBg} url={"https://i.ibb.co/s5nT3Mg/profile-img.png"} descp={"Learn more about caring your new dog"} />
                <ArticleCard name={"Dog Care"} bgURL={articleCardBg} url={"https://i.ibb.co/s5nT3Mg/profile-img.png"} descp={"Learn more about caring your new dog"} />
                <ArticleCard name={"Dog Care"} bgURL={articleCardBg} url={"https://i.ibb.co/s5nT3Mg/profile-img.png"} descp={"Learn more about caring your new dog"} />
                <ArticleCard name={"Dog Care"} bgURL={articleCardBg} url={"https://i.ibb.co/s5nT3Mg/profile-img.png"} descp={"Learn more about caring your new dog"} />
                <img className="h-[70px] cursor-pointer" src={arrowRight} alt="arrow right"/>
            </div>

        </div>
    )
}

export default DogArticles;
