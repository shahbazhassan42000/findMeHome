import "@fontsource/bubblegum-sans";
import arrowRight from "../../assets/icons/arrowRight.png"
import arrowLeft from "../../assets/icons/arrowLeft.png"
import DogCard from "./DogCard";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {map} from "lodash";
const FeaturedDogs = () => {
    const breeds=useSelector(state=>state.dogStore.breeds);
    const featuredDogs=useSelector(state=>state.dogStore.featuredDogs);
    const [index,setIndex]=useState(0);
    const dogs=featuredDogs.slice(index,index+4);
    useEffect(() => {

        return () => {

        };
    }, []);

    return (
        <div className="flex flex-col px-8 text-center">
            <h2 className="text-[#3E665C] font-bold text-[40px]">Featured <span className="text-[#70CF36]  font-['Bubblegum_Sans']">dogs</span></h2>
            <p className="-mt-2 text-[29px]">Adorable adoptable near you!</p>
            <div className="flex items-center justify-evenly mt-9">
                <img className="h-[70px] cursor-pointer" src={arrowLeft} alt="arrow left"/>
                {map(dogs,dog=>{
                    return <DogCard key={dog.did} name={dog.dname} url={dog.imageurl} age={dog.age} breed={breeds[dog.bid].bname} sid={dog.sid} />;
                })}
                <img className="h-[70px] cursor-pointer" src={arrowRight} alt="arrow right"/>
            </div>
        </div>
    );
}
export default FeaturedDogs;
