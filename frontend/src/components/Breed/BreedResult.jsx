import logo from "../../assets/images/find_me_home_logo.png";
import {useRef} from "react";
import {useSelector} from "react-redux";
import {api2PdfURL} from "../../utils/EndPoints";
import ellipseUp from "../../assets/icons/Ellipse uppper.png";
import ellipseDown from "../../assets/icons/Ellipse down.png";
import vector from "../../assets/icons/Vector 1.png";


const BreedResult = () => {
    const dog = useSelector(state => state.dogStore.dog);
    const breedData = useRef(null);
    if(!dog.breed) window.location.pathname = "/";
    return (
        <>
            <img className="-z-10 fixed h-[280px]" src={ellipseUp} alt="ellipse upper"/>
            <img className="-z-10 fixed h-[180px] bottom-0" src={ellipseDown} alt="ellipse down"/>
            <img className="-z-10 fixed h-[430px] bottom-0 right-0" src={vector} alt="vector"/>
        <div>
            {!dog.breed ?
                <div className="flex h-screen items-center">
                    <h1 className="text-[32px] mx-auto px-[40px] font-[700]  mb-[50px] text-[#3E665C]">
                        Please Enter Dog Data First To See Dog Breed
                    </h1>
                </div> :
                <div className="flex flex-col w-[70%] mx-auto items-center">
                    <a href="/" className="w-[220px] mt-[20px]">
                        <img src={logo} alt="logo"/>
                    </a>
                    <div className="font-['Montserrat'] flex w-full space-x-14">
                        <div className="border-[7px] border-[#3E665C] ">
                            <img className="object-cover w-[330px] h-[400px]" src={dog.image} alt={"dog"}/>
                        </div>
                        <div
                            ref={breedData}
                            className="flex flex-col justify-between h-[400px]"
                        >
                            <div className="flex flex-col">
                                <h1 className="text-[32px] mx-auto px-[40px] font-[700]  mb-[50px] text-center text-[#3E665C]">
                                    Dog Breed Detail
                                </h1>
                                <div className="text-[22px] flex space-x-5">
                                    <span className="text-[#7F99A2]">Name:</span>
                                    <span className="text-[#3E665C]">{dog.name}</span>
                                </div>
                                <div className="text-[22px]  flex space-x-5">
                                    <span className="text-[#3E665C]">{dog.age}</span>
                                </div>
                                <div className="text-[22px]  flex space-x-5">
                                    <span className="text-[#7F99A2] pr-[1px]">Breed:</span>
                                    <span className="text-[#3E665C]">{dog.breed}</span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="flex space-x-5">
                                    <span className="text-[18px] italic text-[#7F99A2]">Download<br></br>Details?</span>
                                    <span
                                        className="fa fa-arrow-up-from-bracket text-[48px] text-[#7F99A2] cursor-pointer hover:text-[#3E665C]"
                                        onClick={() => generatePDF(breedData.current,dog.name,dog.breed)}
                                    >
                            </span>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="mt-[25px] italic text-center">
                        <div>
                            <span className="text-[#7F99A2] text-[14px] mr-2">Be our member to adopt Dog</span>
                            <a href="/signup"
                               className="text-[#5A8081] font-bold hover:text-[#3E665C]">Register</a>
                        </div>
                        <a href="/login"
                           className="text-[#5A8081] font-bold hover:text-[#3E665C]">Login</a>
                    </div>
                </div>
            }
        </div>
        </>
    )
}

const generatePDF = (breedData,dogName,dogBreed) => {
    console.log("Generating pdf...");
    const img = breedData.parentElement.firstElementChild.firstElementChild;
    let data = `<div style="font-family: 'Montserrat',serif; width: 80%; display: flex; "><div style="border: 7px solid #3E665C;"><img style="object-fit: cover;" height="400px" width="330px" src=${img.src} alt="dog" /></div> <div style=" width: 100%; margin-left: 56px; display: flex; flex-direction: column; height: 400px;"> <h1 style="font-size: 32px; padding-right: 20px; padding-left: 20px font-weight: 700; margin: 0 auto 50px; text-align: center;color:#3E665C;">Dog Breed Details</h1> <div style="font-size: 22px; display: flex;"> <span style="color: #7F99A2">Name:</span> <span style="color: #3E665C; margin-left: 20px;">${dogName}</span> </div>  <div style="font-size: 22px; display: flex;">   </div>  <div style="font-size: 22px; display: flex;"> <span style="color: #7F99A2; padding-right: 1px;">Breed:</span> <span style="color: #3E665C; margin-left: 20px;">${dogBreed}</span> </div> </div> </div>`;
    fetch(api2PdfURL, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'd733a96e-3b3e-4177-bd1a-e9d05a674432'
        },
        body: JSON.stringify({html: data, inlinePdf: true, fileName: 'breedData.pdf'})
    }).then(res => res.json())
        .then(res => {
            const link = res.pdf;
            const aRef = document.createElement("a");
            aRef.href = link;
            aRef.click();
        });
}

export default BreedResult;

