import {useState} from "react";
import {user} from "../../App";

const Logout = () => {
    const [msg, setMsg] = useState({show: false, msg: ""});
    return (
        <section className="overflow-visible max-w-[400px] mx-auto">
            <form
                className="flex flex-col space-y-5 text-center bg-[#ffffff] rounded-[3px] py-[25px] px-[40px] shadow-[0_0_10px_rgba(0,0,0,0.15)]">
                <h1 className="mb-2 text-[#5E6C84] font-bold">Log out of your trello account</h1>
                <div className="flex space-x-3 items-center">
                    <div className="relative flex justify-center items-center py-2 w-[72px]">
                        <img src={user.image} alt="profile"/>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[#5e6c84] text-start font-bold text-[20px]">{user.username}</p>
                        <p className="text-[14px] text-[#253858]">{user.email}</p>
                    </div>
                </div>
                {msg.show && <p className={`text-[14px] green !mt-0`}>{msg.msg}</p>}
                <button
                    onClick={(e) => {
                        localStorage.removeItem("user");
                        setMsg({show: true, msg: "Log out successfully"});
                        window.location.pathname = "/login";
                        e.preventDefault();
                    }}
                    className="bg-[#0052cc] text-[#ffffff] font-bold hover:bg-[#0065ff] py-[0.6em] px-[1.3em] rounded-[0.3em]">
                    Log out
                </button>
                <a href="/" className="text-[#0052cc] text-[14px] hover:underline">Back to home page</a>
            </form>
        </section>
    );
}
export default Logout;

