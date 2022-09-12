import logo from "../../../assets/images/find_me_home_logo.png";
import heart from "../../../assets/icons/heart.png"
import dogMini from "../../../assets/icons/dog2.png"
import msg from "../../../assets/icons/email-forward.png"
import people from "../../../assets/icons/people.png"
import pc from "../../../assets/icons/pc.png"
import free from "../../../assets/icons/free.png"
import ellipseUp from "../../../assets/icons/Ellipse uppper.png";
import ellipseDown from "../../../assets/icons/Ellipse down.png";
import vector from "../../../assets/icons/Vector 1.png";

const Signup = () => {
    return (
        <>
            <img className="-z-10 fixed h-[280px]" src={ellipseUp} alt="ellipse upper"/>
            <img className="-z-10 fixed h-[180px] bottom-0" src={ellipseDown} alt="ellipse down"/>
            <img className="-z-10 fixed h-[430px] bottom-0 right-0" src={vector} alt="vector"/>
            <div>
                <div className="flex flex-col w-[60%] mx-auto items-center">
                    <div className="w-[220px] mt-[20px]">
                        <img src={logo} alt="logo"/>
                    </div>
                    <div className="font-['Montserrat'] flex space-x-10">
                        <div
                            className="w-[400px] flex flex-col space-y-4 items-start p-[35px] bg-white shadow-[4px_5px_6px_1px_#CFCFD0] rounded-[4px]">
                            <h1 className="text-[#5A8081] text-[26px] font-[600] mx-auto">Adopter</h1>
                            <div className="flex space-x-7 mb-[5px]">
                                <img className="h-[20px] mt-[6px]" src={heart} alt="heart"/>
                                <p className="text-[18px]">
                                    Save and keep track of your favorite pets
                                </p>
                            </div>
                            <div className="flex space-x-7">
                                <img className="h-[20px] mt-[6px]" src={dogMini} alt="heart"/>
                                <p className="text-[18px]">
                                    Manage your pet searches and email alerts
                                </p>
                            </div>
                            <div className="flex space-x-7">
                                <img className="h-[20px] mt-[6px]" src={msg} alt="heart"/>
                                <p className="text-[18px]">
                                    Send pet inquiries quickly
                                </p>
                            </div>
                            <a href="/signup/a"
                               className="bg-[#3E665C] hover:bg-[#5A8081] py-[5px] px-[50px] mx-auto text-white rounded-[14px]">
                                Sign up
                            </a>
                        </div>
                        <div
                            className="w-[400px] flex flex-col space-y-4 items-start p-[35px] bg-white shadow-[4px_5px_6px_1px_#CFCFD0] rounded-[4px]">
                            <h1 className="text-[#5A8081] text-[26px] font-[600] mx-auto">Shelter</h1>
                            <div className="flex space-x-7 mb-[5px]">
                                <img className="h-[20px] mt-[6px]" src={people} alt="people"/>
                                <p className="text-[18px]">
                                    Get your pets seen by more potential adopters
                                </p>
                            </div>
                            <div className="flex space-x-7">
                                <img className="h-[20px] mt-[6px]" src={pc} alt="pc"/>
                                <p className="text-[18px]">
                                    Automate pet uploads with custom software imports
                                </p>
                            </div>
                            <div className="flex space-x-7">
                                <img className="h-[7px] mt-[6px]" src={free} alt="free"/>
                                <p className="text-[18px]">
                                    It's free and easy to use
                                </p>
                            </div>
                            <a href="/signup/s"
                               className="bg-[#3E665C] hover:bg-[#5A8081] py-[5px] px-[50px] mx-auto text-white rounded-[14px]">
                                Sign up
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Signup;
