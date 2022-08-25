import logo from "../../assets/images/find_me_home_logo.png";
import dog from "../../assets/images/dummy_dog.png"
import {useRef} from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import ap2  from "api2pdf";


const BreedResult = () => {
    const breedData = useRef(null);
    return (
        <div className="flex flex-col w-[70%] mx-auto items-center">
            <div className="w-[220px] mt-[20px]">
                <img src={logo} alt="logo"/>
            </div>
            <div className="font-['Montserrat'] flex w-full space-x-14 items-start">
                <div className="border-[7px] border-[#3E665C] w-[330px] h-[400px]">
                    <img src="https://i.ibb.co/2cxXjJf/dummy-dog.png" alt={"dog"}/>
                </div>
                <div
                    ref={breedData}
                    className="flex flex-col justify-between h-[400px]"
                >
                    <div className="flex flex-col">
                        <h1 className="text-[32px] mx-auto px-[40px] font-[700]  mb-[50px] text-center text-[#3E665C]">
                            Dog Breed Details
                        </h1>
                        <div className="text-[22px] flex space-x-5">
                            <span className="text-[#7F99A2]">Name:</span>
                            <span className="text-[#3E665C]">Lanzo</span>
                        </div>
                        <div className="text-[22px]  flex space-x-5">
                            <span className="text-[#7F99A2] pr-[25px]">Age:</span>
                            <span className="text-[#3E665C]">23</span>
                        </div>
                        <div className="text-[22px]  flex space-x-5">
                            <span className="text-[#7F99A2] pr-[1px]">Breed:</span>
                            <span className="text-[#3E665C]">Lagotto Romagnolo</span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex space-x-5">
                            <span className="text-[18px] italic text-[#7F99A2]">Download<br></br>Details?</span>
                            <span
                                className="fa fa-arrow-up-from-bracket text-[48px] text-[#7F99A2] cursor-pointer hover:text-[#3E665C]"

                                onClick={() => generatePDF(breedData.current)}
                            >
                            </span>
                        </div>
                    </div>


                </div>
            </div>
            <div className="mt-[25px] italic text-center">
                <div>
                    <span className="text-[#7F99A2] text-[14px] mr-2">Be our member to adopt Dog</span>
                    <a href="/register"
                       className="text-[#5A8081] font-bold hover:text-[#3E665C]">Register</a>
                </div>
                <a href="/login"
                   className="text-[#5A8081] font-bold hover:text-[#3E665C]">Login</a>
            </div>
        </div>
    )
}

const generatePDF = (breedData) => {
    console.log("Generating pdf...");

    const img=breedData.parentElement.firstElementChild.firstElementChild;

    fetch('https://v2018.api2pdf.com/chrome/html', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'YOUR-API-KEY' //Get your API key from https://portal.api2pdf.com
        },
        body: JSON.stringify({html: '<p>hello world from reactjs</p>', inlinePdf: true, fileName: 'test.pdf' })
    }).then(res=>res.json())
        .then(res => console.log(res.pdf));













    // context = canvas.getContext('2d');


    // context.drawImage(base_image, 0, 0);
    //
    // const imgData = canvas.toDataURL('image/png');
    // const pdf = new jsPDF();
    // pdf.addImage(imgData, 'JPEG', 0, 0);
    // pdf.save(`abc.pdf`);


    // html2canvas(breedData)
    //     .then((canvas) => {
    //         const imgData = canvas.toDataURL('image/png');
    //         const pdf = new jsPDF();
    //         pdf.addImage(imgData, 'JPEG', 0, 0);
    //         pdf.save(`abc.pdf`);
    //     })


    // let opt = {
    //     margin: [10, 0, 10, 0],
    //     filename: `document.pdf`,
    //     image: {type: 'jpg', quality: 0.98},
    //     html2canvas: {scale: 2, useCORS: true},
    //     jsPDF: {unit: 'mm', format: 'letter', orientation: 'portrait'}
    // };
    // html2pdf(breedData).set(opt).save();
    // html2pdfEs(breedData).set(opt).save();
}

export default BreedResult;

