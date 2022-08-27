import loading from "../assets/gif/loadingMini.gif"
const Loading=()=>(
    <div className="z-[999] flex justify-center items-center fixed h-screen w-screen top-0 left-0 bg-[#000000a3]">
        <img src={loading} className="h-[100px]" alt="loading gif"/>
    </div>
);
export default Loading;
