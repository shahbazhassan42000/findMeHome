import playingDog from "../../assets/gif/playingDog.gif"
const Footer=()=>{
    return (
        <div className="absolute w-full z-30">
            <div className="bg-[#7F99A2] px-12 pt-8 pb-2">
                <div className="flex justify-between">
                    <div className="flex flex-col space-y-4">
                        <a className="text-white border-b-2 border-[#70CF36] block w-[280px] text-[30px]" href="/home">
                            Find Me Home
                        </a>
                        <a className="text-white border-b-2 border-[#70CF36] block w-[280px] text-[30px]" href="/">
                            Find Breed
                        </a>
                        <a className="text-white border-b-2 border-[#70CF36] block w-[280px] text-[30px]" href="#">
                            Find Dog to Adopt
                        </a>
                    </div>
                    <div className="w-[400px]">
                        <img src={playingDog} alt="playing dog"/>
                    </div>
                </div>
                <p className=" mt-5 text-white text-[25px]">
                    Our mission (and passion) is to provide every homeless pet the chance to do what they do best: give people snoopleboops.
                    Special thanks to our partners <span className="text-[#70CF36]">Shumaim</span>, <span className="text-[#70CF36]">Rafay</span>, <span className="text-[#70CF36]">Gonash</span> and <span className="text-[#70CF36]">Wajahat</span>, whose support makes our life-saving work possible.
                </p>
            </div>
            <div className="text-center py-2 bg-white text-black">
                <p>Find Me Home, 2022 © FMH Inc. All rights reserved.</p>
            </div>
        </div>
    );
}
export default Footer;
