import logo from "../../assets/images/find_me_home_logo.png";
import ellipseUp from "../../assets/icons/Ellipse uppper.png";
import ellipseDown from "../../assets/icons/Ellipse down.png";
import vector from "../../assets/icons/Vector 1.png";
import {useSelector} from "react-redux";
import {map} from "lodash";


const DogInfo = () => {
    const dog=useSelector(state=>state.dogStore.dogInfo);
    const breeds=useSelector(state=>state.dogStore.breeds);
    const dogDiseases=useSelector(state=>state.dogStore.dogDiseases);
    const shelter=useSelector(state=>state.dogStore.shelter);
    return (
        <>
            <img className="-z-10 fixed h-[280px]" src={ellipseUp} alt="ellipse upper"/>
            <img className="-z-10 fixed h-[180px] bottom-0" src={ellipseDown} alt="ellipse down"/>
            <img className="-z-10 fixed h-[430px] bottom-0 right-0" src={vector} alt="vector"/>
            <div>

                <div className="flex flex-col w-[70%] mx-auto items-center">
                    <a href="/" className="w-[220px] mt-[20px]">
                        <img src={logo} alt="logo"/>
                    </a>
                    <div className="font-['Montserrat'] flex w-full space-x-14">
                        <div className="border-[7px] border-[#3E665C] ">
                            <img className="object-cover w-[330px] h-[400px]" src={dog.imageurl} alt={"dog"}/>
                        </div>
                        <div
                            className="flex flex-col justify-between h-[400px]"
                        >
                            <div className="flex flex-col">
                                <h1 className="text-[32px] mx-auto px-[40px] font-[700]  mb-[50px] text-center text-[#3E665C]">
                                    Dog Information
                                </h1>
                                <div className="text-[22px] flex space-x-5">
                                    <span className="text-[#7F99A2]">Name:</span>
                                    <span className="text-[#3E665C]">{dog.dname}</span>
                                </div>
                                <div className="text-[22px]  flex space-x-5">
                                    <span className="text-[#7F99A2]">Age:</span>
                                    <span className="text-[#3E665C]">{dog.age}</span>
                                </div>
                                <div className="text-[22px]  flex space-x-5">
                                    <span className="text-[#7F99A2] pr-[1px]">Breed:</span>
                                    <span className="text-[#3E665C]">{breeds[dog.bid-1].bname}</span>
                                </div>
                                <div className="text-[22px]  flex space-x-5">
                                    <span className="text-[#7F99A2] pr-[1px]">Shelter Name:</span>
                                    <span className="text-[#3E665C]">{shelter.name}</span>
                                </div>
                                <div className="text-[22px]  flex space-x-5">
                                    <span className="text-[#7F99A2] pr-[1px]">Shelter Contact:</span>
                                    <span className="text-[#3E665C]">{shelter.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default DogInfo;

