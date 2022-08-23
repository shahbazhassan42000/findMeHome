import logo from "../../assets/images/find_me_home_logo.png"

const Home = () => {
    return (
        <div className="flex flex-col w-[50%] mx-auto items-center">
            <div className="w-[220px] mt-[20px]">
                <img src={logo} alt="logo"/>
            </div>
            <div className="w-[430px]">
                <div className="mt-[35px] flex flex-col items-center  justify-center">
                    <h1 className="text-[40px] font-['Montserrat'] font-[900] text-center text-[#3E665C]">
                        Dog Breed Check
                    </h1>
                    <p className="text-[#5A8081] font-[700] mt-[15px] px-[50px] text-center leading-[16px]">
                        Please write the name and add the picture of Dog to find out its Breed
                    </p>
                    <form className="flex flex-col mt-[25px] w-full px-[33px] ml-1 justify-center items-center">
                        <label className="border border-[#7F99A2] rounded-[3px] w-full py-1">
                            <input className="w-full bg-transparent font-['Montserrat'] font-[700]" type="text" placeholder="Dog Name"/>
                        </label>
                        <button>
                            <span></span>
                            Upload Picture of Dog
                            <span></span>
                        </button>
                        <button>
                            Check Breed
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default Home;
