import logo from "../../assets/images/find_me_home_logo.png";
import {useRef} from "react";

const SignupAdopter = () => {
    const passwdRef=useRef(null);
    return (
        <div>
            <div className="flex flex-col mx-auto items-center">
                <div className="w-[220px] mt-[20px]">
                    <img src={logo} alt="logo"/>
                </div>
                <div className="font-['Montserrat'] flex flex-col space-y-10">
                    <h1 className="text-[#3E665C] text-[30px] font-[900] mx-auto">Sign up</h1>
                    <form onSubmit={(e)=>onFormSubmit(e)} className="flex flex-col space-y-7 w-[295px]">
                        <input
                            className="p-[5px] w-full border border-[#7F99A2] bg-transparent outline-0 placeholder:text-[#7F99A2] active:placeholder:text-white hover:placeholder:text-[#5A8081] rounded-[5px]"
                            type="email" name="email" placeholder="Email*" required/>
                        <input
                            className="p-[5px] w-full border border-[#7F99A2] bg-transparent outline-0 placeholder:text-[#7F99A2] active:placeholder:text-white hover:placeholder:text-[#5A8081] rounded-[5px]"
                            type="text" name="username" placeholder="Username*" required/>
                        <div className="relative flex items-center w-full">
                            <input
                                ref={passwdRef}
                                className="p-[5px] w-full border border-[#7F99A2] bg-transparent outline-0 placeholder:text-[#7F99A2] active:placeholder:text-white hover:placeholder:text-[#5A8081] rounded-[5px]"
                                type="password" name="password" placeholder="Password*" required/>
                            <span onClick={(e) => onTogglePasswd(e)}
                                  className="text-[#7F99A2] absolute right-2 cursor-pointer fa-solid fa-eye"></span>
                        </div>
                        <button type="submit"
                                className="w-full bg-[#3E665C] hover:bg-[#5A8081] py-[5px] px-[50px] text-white rounded-[14px]">
                            Sign up
                        </button>
                        <div className="w-full flex flex-col -space-y-1 text-center text-[14px] italic">
                            <p className="text-[#7F99A2]">
                                Already have an account?
                            </p>
                            <a href="/login"
                               className="text-[#5A8081] font-[600] hover:text-[#3E665C]">Login</a>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export const onTogglePasswd = (e) => {
    const btn = e.target;
    const passwd = e.target.previousSibling;
    if (passwd.type === "password") {
        passwd.type = "text";
        btn.classList.remove("fa-eye");
        btn.classList.add("fa-eye-slash");
    } else {
        passwd.type = "password";
        btn.classList.remove("fa-eye-slash");
        btn.classList.add("fa-eye");

    }
}

export const onPasswdChang=(confirmPasswd,passwd)=>{
    console.log(confirmPasswd.value);
    console.log(passwd.value);
}

const onFormSubmit=(e)=>{
    e.preventDefault();

}

export default SignupAdopter;

