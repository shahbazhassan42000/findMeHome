import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import logo from "../../assets/images/find_me_home_logo.png";
import {userReceived} from "../../store/dogs/dogSlice";
import ellipseUp from "../../assets/icons/Ellipse uppper.png";
import ellipseDown from "../../assets/icons/Ellipse down.png";
import vector from "../../assets/icons/Vector 1.png";

const Logout = () => {
    const user=useSelector(state=>state.dogStore.user);
    const dispatch=useDispatch();
    const [msg, setMsg] = useState({show: false, msg: ""});
    return (
        <div>
            <img className="-z-10 fixed h-[280px]" src={ellipseUp} alt="ellipse upper"/>
            <img className="-z-10 fixed h-[180px] bottom-0" src={ellipseDown} alt="ellipse down"/>
            <img className="-z-10 fixed h-[430px] bottom-0 right-0" src={vector} alt="vector"/>
            <div className="flex flex-col mx-auto items-center">
                <a href="/" className="w-[220px] mt-[20px]">
                    <img src={logo} alt="logo"/>
                </a>
            </div>
            <section className="overflow-visible mt-9 max-w-[400px] mx-auto">
                <form
                    className="flex flex-col space-y-5 text-center bg-[#ffffff] rounded-[3px] py-[25px] px-[40px] shadow-[0_0_10px_rgba(0,0,0,0.15)]">
                    <h1 className="mb-2 text-[#5E6C84] text-[30px] font-[900]">Log out</h1>
                    <div className="flex space-x-3 items-center">
                        <div className="relative flex justify-center items-center py-2 w-[72px]">
                            <img src={user.picture} alt="profile"/>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[#3E665C] text-start font-bold text-[20px]">{user.username}</p>
                            <p className="text-[14px] text-[#7F99A2]">{user.email}</p>
                        </div>
                    </div>
                    {msg.show && <p className={`text-[14px] green !mt-0`}>{msg.msg}</p>}
                    <button
                        onClick={(e) => {
                            localStorage.removeItem("token");
                            dispatch(userReceived(null))
                            setMsg({show: true, msg: "Log out successfully"});
                            window.location.pathname = "/login";
                            e.preventDefault();
                        }}
                        className="bg-[#3E665C] hover:bg-[#5A8081] py-[8px] px-[50px] text-white rounded-[14px]">
                        Log out
                    </button>
                    <a href="/" className="text-[#7F99A2] text-[14px] hover:underline">Back to home page</a>
                </form>
            </section>
        </div>

    );
}
export default Logout;

