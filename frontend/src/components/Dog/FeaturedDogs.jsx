import "@fontsource/bubblegum-sans";
import arrowRight from "../../assets/icons/arrowRight.png"
import arrowLeft from "../../assets/icons/arrowLeft.png"
import DogCard from "./DogCard";
const FeaturedDogs = () => {
    return (
        <div className="flex flex-col px-8 text-center">
            <h2 className="text-[#3E665C] font-bold text-[40px]">Featured <span className="text-[#70CF36]  font-['Bubblegum_Sans']">dogs</span></h2>
            <p className="-mt-2 text-[29px]">Adorable adoptable near you!</p>
            <div className="flex items-center justify-evenly mt-9">
                <img className="h-[70px] cursor-pointer" src={arrowLeft} alt="arrow left"/>
                <DogCard name={"Koda"} url={"https://i.ibb.co/s5nT3Mg/profile-img.png"} age={"Young"} loc={"OakLand CA"} />
                <DogCard name={"Koda"} url={"https://i.ibb.co/s5nT3Mg/profile-img.png"} age={"Young"} loc={"OakLand CA"} />
                <DogCard name={"Koda"} url={"https://i.ibb.co/s5nT3Mg/profile-img.png"} age={"Young"} loc={"OakLand CA"} />
                <DogCard name={"Koda"} url={"https://i.ibb.co/s5nT3Mg/profile-img.png"} age={"Young"} loc={"OakLand CA"} />
                <img className="h-[70px] cursor-pointer" src={arrowRight} alt="arrow right"/>
            </div>
        </div>
    );
}
export default FeaturedDogs;
