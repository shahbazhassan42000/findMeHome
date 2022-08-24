import logo from "../../assets/images/find_me_home_logo.png"
import dog from "../../assets/icons/dog.png"

const BreedCheck = () => {
    return (
        <div className="flex flex-col w-[50%] mx-auto items-center">
            <div className="w-[220px] mt-[20px]">
                <img src={logo} alt="logo"/>
            </div>
            <div className="w-[430px] font-['Montserrat']">
                <div className="mt-[35px] flex flex-col items-center  justify-center">
                    <h1 className="text-[40px] font-[900] text-center text-[#3E665C]">
                        Dog Breed Check
                    </h1>
                    <p className="text-[#5A8081] mt-[15px] px-[40px] text-center leading-[16px]">
                        Please write the name and add the picture of Dog to find out its Breed
                    </p>
                    <form className="flex flex-col mt-[25px] w-full px-[33px] ml-1 justify-center items-center">
                        <label className="border border-[#7F99A2] active:border-[#A7B4BF] hover:border-[#5A8081] active:bg-[#5A8081] active:text-white px-[12px] py-[4px] rounded-[7px] w-full flex items-center mb-5">
                            <div className="w-[28px] mr-[10px]"><img src={dog} alt="dog icon" /></div>
                            <input className="w-full bg-transparent outline-0 placeholder:text-[#7F99A2] active:placeholder:text-white hover:placeholder:text-[#5A8081]" type="text" placeholder="Dog Name"/>
                        </label>
                        <button className="border border-[#7F99A2] hover:border-[#5A8081] px-[12px] py-[4px] rounded-[7px] w-full flex justify-between items-center text-[#7F99A2] hover:text-[#5A8081]">
                            <div className="flex items-center">
                                <span className="fa-regular fa-image mr-[10px] text-[24.4px]"></span>
                                Upload Picture of Dog
                            </div>
                            <span className="fa fa-arrow-up-from-bracket text-[24.4px]"></span>
                        </button>
                        <button className="mt-[25px] px-[12px] py-[4px] rounded-[7px] w-full flex items-center bg-[#E0DFE2] hover:bg-[#5A8081] text-[#3E665C] hover:text-white font-bold flex justify-center">
                            <span>Check Breed</span>
                        </button>
                    </form>
                    <div className="mt-[25px] italic text-center">
                        <div>
                            <span className="text-[#7F99A2] text-[14px] mr-2">Be our member to adopt Dog</span>
                            <a href="frontend/src/components/Breed/BreedCheck#" className="text-[#5A8081] font-bold hover:text-[#3E665C]">Register</a>
                        </div>
                        <a href="frontend/src/components/Breed/BreedCheck#" className="text-[#5A8081] font-bold hover:text-[#3E665C]">Login</a>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default BreedCheck;
