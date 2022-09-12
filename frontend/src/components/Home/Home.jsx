//https://i.ibb.co/s5nT3Mg/profile-img.png
import logo from "../../assets/images/logo.png"
import bg1 from "../../assets/images/bg1.png"
import bg2 from "../../assets/images/bg2.png"
import {useSelector} from "react-redux";
import FeaturedDogs from "./FeaturedDogs";

const Home = () => {
    const user = useSelector(state => state.dogStore.user);
    return (<div className="relative flex flex-col">
        <header className="px-8">
            <nav className="fixed bg-white z-50 w-[95.3%] flex justify-between items-center py-3">
                <div className="w-[180px]">
                    <img src={logo} alt="logo"/>
                </div>
                <ul className="flex space-x-10 underline-offset-4 decoration-[#70CF36] text-[#7F99A2] uppercase font-[700] text-[20px]">
                    <li className="underline text-[#3E665C]">Home</li>
                    <li className="hover:text-[#3E665C]">Blog</li>
                    <li className="hover:text-[#3E665C]">About Us</li>
                    <li className="hover:text-[#3E665C]"><a href="/">Breed</a></li>
                    <li><img title={user.username} className="h-[33px]" src="https://i.ibb.co/s5nT3Mg/profile-img.png"
                             alt="user profile"/></li>
                </ul>
            </nav>
            <div className="mt-[69px] flex flex-col space-y-10">
                <div className="relative">
                    <img className="" src={bg1} alt="bg-1"/>
                    <h1 className="absolute drop-shadow-[1px_2px_9px_#3E665C] right-[130px] leading-[59px] top-[96px] text-[55px] font-bold text-[#70CF36] backdrop-blur-[2px]">
                        ADOPT<br/>a Forever<br/>Friend Today!
                    </h1>
                </div>
                <div className="flex">
                    <div className="relative bg-[#3E665C] z-10 -mr-14 -mt-10 mb-10 w-full">
                        <div className="absolute text-[20px] p-8 bottom-16 left-16 w-[400px] h-[400px] border bg-white">
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                            </p>

                             <p className="w-[76%]">
                                 ever since the 1500s,
                                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry 1500s,
                             </p>
                        </div>
                        <div className="absolute -right-48 bottom-32 flex flex-col space-y-5 font-bold">
                            <button className="bg-[#3E665C] py-[20px] px-[18px] text-white">
                                Registered as Shelter
                            </button>
                            <button className="bg-[#3E665C] py-[20px] px-[18px] text-white">
                                Adopt Dog
                            </button>
                        </div>
                    </div>
                    <img className="w-[75%]" src={bg2} alt="bg-2"/>
                </div>
            </div>
        </header>
        <main className="bg-[#EFEEF1] flex flex-col py-16">
            <FeaturedDogs/>
        </main>
    </div>);

}

export default Home;
