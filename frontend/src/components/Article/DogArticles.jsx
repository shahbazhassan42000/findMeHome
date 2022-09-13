import ArticleCard from "./ArticleCard";
import articleCardBg from '../../assets/images/articleCardBg.png'

const DogArticles = () => {
    return (
        <div className="flex flex-col px-8 text-center">
            <h2 className="text-[#3E665C] font-bold text-[40px]">Dog <span
                className="text-[#70CF36]  font-['Bubblegum_Sans']">Articles</span></h2>
            <div>
                <ArticleCard name={"Dog Care"} bgURL={articleCardBg} url={"https://i.ibb.co/s5nT3Mg/profile-img.png"} descp={"Learn more about caring your new dog"} />
            </div>
        </div>
    )
}

export default DogArticles;
