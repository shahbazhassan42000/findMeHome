import playingDog from "../../assets/gif/playingDog.gif"
const Footer=()=>{
    return (
        <div className="absolute w-full z-30">
            <div className="bg-[#7F99A2] px-12 pt-8 pb-2">
                <div className="flex justify-between">
                    <div className="flex flex-col space-y-4">
                        <a className="text-white border-b-2 border-[#70CF36] block w-[280px] text-[30px]" href="/">
                            Find Me Home
                        </a>
                        <a className="text-white border-b-2 border-[#70CF36] block w-[280px] text-[30px]" href="/bc">
                            Find Breed
                        </a>
                        <a className="text-white border-b-2 border-[#70CF36] block w-[280px] text-[30px]" href="/login">
                            Find Dog to Adopt
                        </a>
                    </div>
                    <div className="w-[400px]">
                        <img src={playingDog} alt="playing dog"/>
                    </div>
                </div>
                <p className=" mt-5 text-white text-[25px]">
                    Our mission (and passion) is to provide every homeless pet the chance to do what they do best: give people snoopleboops.
                    Special thanks to our partners <a href="https://github.com/shumaim11" target="_blank" className="text-[#70CF36]">Shumaim</a>, <a href="https://github.com/Rafayqayyum" target="_blank" className="text-[#70CF36]">Rafay</a>, <a href="https://github.com/gonashrana" target="_blank" className="text-[#70CF36]">Gonash</a> and <a href="https://github.com/Wajahat43" target="_blank" className="text-[#70CF36]">Wajahat</a>, whose support makes our life-saving work possible.
                </p>
            </div>
            <div className="text-center py-2 bg-white text-black">
                <p>Find Me Home, 2022 © FMH Inc. All rights reserved.</p>
            </div>
        </div>
    );
}
export default Footer;
