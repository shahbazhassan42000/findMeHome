import dancingDog from '../../assets/gif/dancingDog.gif'
import logo from "../../assets/images/logo.png"
import bg1 from "../../assets/images/bg1.jpg"
import bg2 from "../../assets/images/bg2.jpg"
import {useSelector} from "react-redux";
import FeaturedDogs from "../Dog/FeaturedDogs";
import DogArticles from "../Article/DogArticles";
import Footer from "./Footer";

const Home = () => {
    const user = useSelector(state => state.dogStore.user);
    return (<div id="top" className="relative flex flex-col">
        <nav className="fixed bg-white z-50 w-full px-8">
            <div className="flex justify-between items-center py-3">
                <a href="#top" className="w-[180px]">
                    <img src={logo} alt="logo"/>
                </a>
                <ul className="flex space-x-10 underline-offset-4 decoration-[#70CF36] text-[#7F99A2] uppercase font-[700] text-[20px]">
                    <li className="underline text-[#3E665C] cursor-pointer">Home</li>
                    <li className="hover:text-[#3E665C] cursor-pointer">Blog</li>
                    <li className="hover:text-[#3E665C] cursor-pointer">About Us</li>
                    <li className="hover:text-[#3E665C] cursor-pointer"><a href="/bc">Breed</a></li>
                </ul>
            </div>
        </nav>
        <header className="px-8">
            <div className="mt-[69px] flex flex-col space-y-10">
                <div className="relative">
                    <img className="w-full" src={bg1} alt="bg-1"/>
                    <h1 className="absolute drop-shadow-[1px_2px_9px_#3E665C] right-[130px] leading-[6rem] top-[96px] text-[6rem] font-bold text-[#70CF36] backdrop-blur-[2px]">
                        ADOPT<br/>a Forever<br/>Friend Today!
                    </h1>
                </div>
                <div className="flex">
                    <div className="relative bg-[#3E665C] w-[25%] z-10 -mr-14 -mt-10 mb-10 w-full">
                        <div className="absolute text-[20px] p-8 bottom-16 left-16 w-[400px] h-[400px] border bg-white">
                            <p className="font-['Bubblegum_Sans'] text-[52px] text-center text-[#70CF36]">
                                Welcome to FIND ME HOME
                            </p>
                            <div className="flex">
                                <p className="w-[80%] text-justify text-[#3E665C] text-[20px] font-bold">
                                    FInd Me Home is The online Dog adoption Website where people who want to adopt a Dog connect with shelters.
                                </p>
                                <div className="relative ">
                                    <div className="absolute left-5 -top-2 w-[189px] space-y-5 font-bold">
                                        <a href="/login"
                                           className="rounded-[30px] block bg-[#3E665C] text-center hover:bg-[#5A8081] py-[15px] px-[20px] text-[16px] font-bold uppercase text-white">
                                            Log In
                                        </a>
                                        <a href="/signup"
                                           className="rounded-[30px] block bg-[#3E665C] text-center hover:bg-[#5A8081]  py-[15px] px-[20px] text-[16px] font-bold uppercase text-white">
                                            Sign up
                                        </a>
                                        <a href="/bc"
                                           className="rounded-[30px] block bg-[#3E665C] text-center hover:bg-[#5A8081]  py-[15px] px-[20px] text-[16px] font-bold uppercase text-white">
                                            Check Breed
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <img className="w-full" src={bg2} alt="bg-2"/>
                </div>
            </div>
        </header>
        <main className="bg-[#EFEEF1] flex flex-col py-16">
            <FeaturedDogs/>
            <div className="flex flex-col items-center px-24 mb-20">
                <img src={dancingDog} alt="dancing dog"/>
                <h2 className="text-[#3E665C] font-bold text-[40px]">Pet Adoption <span
                    className="text-[#70CF36]  font-['Bubblegum_Sans']">tips</span></h2>
                <div className="flex space-x-10 mt-5">
                    <div>
                        <h4 className="text-[29px] font-[600]">Why Adoption Over Buying</h4>
                        <p className="text-[20px]">
                            Did you know that over 1,000 people per hour run a search right here looking to adopt a
                            pet? Pet adoption is quickly becoming the preferred way to find a new dog or cat, and
                            rightly so, there are many benefits to adopting a pet. Pet adoption fees are usually
                            much lower than buying from a breeder. You’re also likely to find a pet who’s already
                            learned a few things. Adoptable pets are often already house-trained, good with kids,
                            and
                            do well with other pets. And don’t forget the wonderful feeling you get from saving a
                            life!
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[29px] font-[600]">How to Find the Perfect Pet</h4>
                        <p className="text-[20px]">
                            Do you know what type of pet personality you’re looking for? Finding the ideal pet for
                            your home should start with understanding the personality that best fits your lifestyle,
                            not necessarily a specific breed. Consider this, do you need a dog that is low key?
                            Perhaps a cat that gets along well with others? The rescue professionals posting on our
                            site are experts at matching you with the right pet. Our website even has a "New Pet
                            Alert" feature to help you narrow things down. Simply tell us what you are looking for
                            and we’ll email you your matches!
                        </p>
                    </div>
                </div>
            </div>
            <DogArticles/>
            <div className="relative mt-32">
                <Footer/>
            </div>
        </main>
    </div>);

}

export default Home;
