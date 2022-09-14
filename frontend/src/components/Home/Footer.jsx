import playingDog from "../../assets/gif/playingDog.gif"
const Footer=()=>{
    return (
        <div className="absolute w-full z-30">
            <div className="relative bg-[#7F99A2] px-12 py-8">
                <div className="absolute -top-[186px] -right-[0px] w-[600px]">
                    <img src={playingDog} alt="playing dog"/>
                </div>
                <div className="flex  justify-between">
                    <div className="flex flex-col space-y-4 text-[20px]">
                        <a className="text-white border-b-2 border-[#70CF36] block w-[280px] " href="/">
                            Find Me Home
                        </a>
                        <a className="text-white border-b-2 border-[#70CF36] block w-[280px]" href="/bc">
                            Find Breed
                        </a>
                        <a className="text-white border-b-2 border-[#70CF36] block w-[280px] " href="/login">
                            Find Dog to Adopt
                        </a>
                    </div>
                    <p className=" w-[550px] text-white text-[18px]">
                        Our mission (and passion) is to provide every homeless pet the chance to do what they do best: give people snoopleboops.
                        Special thanks to our partners <a href="https://github.com/shumaim11" target="_blank" className="text-[#70CF36]">Shumaim</a>, <a href="https://github.com/Rafayqayyum" target="_blank" className="text-[#70CF36]">Rafay</a>, <a href="https://github.com/gonashrana" target="_blank" className="text-[#70CF36]">Gonash</a> and <a href="https://github.com/Wajahat43" target="_blank" className="text-[#70CF36]">Wajahat</a>, whose support makes our life-saving work possible.
                    </p>
                </div>
            </div>
            <div className="text-center py-2 bg-white text-black">
                <p>Find Me Home, 2022 © FMH Inc. All rights reserved.</p>
            </div>
        </div>
    );
}
export default Footer;
