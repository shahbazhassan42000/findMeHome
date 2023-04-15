import React, {useState} from "react";
import dogImg from "../../assets/images/bg2.jpg"
import {useSelector} from "react-redux";
import {map} from "lodash";
import ShelterDogCard from "./ShelterDogCard";
import logo from "../../assets/images/logo.png";

const ShelterHomePage = () => {
  const user = useSelector(state => state.dogStore.user);
  const [ages, setAges] = useState(useSelector(state => state.dogStore.ages));
  const [breeds, setBreeds] = useState(useSelector(state => state.dogStore.breeds));
  const dogs=useSelector(state=>state.dogStore.dogs);

  return <div className={"flex justify-center items-center"}>
  <div className={"max-w-screen-xl w-[100%]"}>
    <div className="flex flex-col w-[100%]">
      <nav className="fixed -ml-[33px] bg-[#EFEEF1] z-50 w-full px-8">
        <div className="flex justify-between items-center py-3">
          <a href="/" className="w-[180px]">
            <img src={logo} alt="logo"/>
          </a>
          <ul className="flex space-x-10 underline-offset-4 decoration-[#70CF36] text-[#7F99A2] uppercase font-[700] text-[20px]">
            <li className="underline text-[#3E665C]">Home</li>
            <li className="hover:text-[#3E665C]">Blog</li>
            <li className="hover:text-[#3E665C]">About Us</li>
            <li className="hover:text-[#3E665C]"><a href="/bc">Breed</a></li>
            <li className="hover:text-[#3E665C]"><a href="/logout">Log Out</a></li>
            <li><img title={user.username} className="h-[33px]" src={user.picture}
                     alt="user profile"/></li>
          </ul>
        </div>
      </nav>
      <div className="flex flex-row mt-[69px] p-3 items-center h-[150px]">
        <img className="w-[77px] h-[77px] rounded-[50%] object-cover" src={user.picture} alt=""/>
        <div className={"ml-5"}>
          <h1 className="text-[#3E665C] font-[900] text-[40px]">{user.type === "shelter"?user.name:user.fname + " " + user.lname}</h1>
          <p className={"text-[15px] font-bold text-gray-400"}>{user.type==="shelter"?user.street+", "+user.city+", "+user.country:user.city+", "+user.country}</p>
        </div>
      </div>
      <div className={"h-[1px] w-[100%] bg-[#70CF36] block"}></div>
      <div className={" h-[50px]  m-3 mt-10 flex justify-center items-center"}>
      <span className={"text-[30px] text-[#3E665C] fa-solid fa-filter"}></span>
        <p className={"text-[15px] mx-2 text-[#3E665C] font-[900]"}>Filter</p>
        <div className={"flex items-center border border-[#3E665C] ml-5 h-[54px] rounded-[50px]"}>
            <div className={"w-auto  px-4 border-r border-[#3E665C] text-center"}>
              <label className={"text-[10px] text-gray-600"}>Age of Pet</label>
              <br/>
              <select name="Age" className={"bg-transparent outline-0 font-[600] text-[15px] text-[#3E665C]"}>
                <option className={""}>select Age</option>
                {map(ages, age => {
                  return <option key={age[0]} value={age[0]}>{`${age[0]}(${age[1]})`}</option>
                })}
              </select>
            </div>
          <div className={"w-auto px-4 border-r border-[#3E665C] text-center"}>
            <label className={"text-[10px] text-gray-600"}>Breed</label>
            <br/>
            <select name={"Breed"} className={"bg-transparent font-[600] outline-0 text-[15px] text-[#3E665C]"}>
            <option value="Select Breed">Select Breed</option>
            {map(breeds, breed => {
              return <option key={breed.bid} value={breed.bid}>{breed.bname}</option>
            })}
            </select>
          </div>
          <div className={"w-[100px] text-center"}>
          <span className={"text-[25px] text-[#3E665C] fa-solid fa-magnifying-glass"}></span>
          </div>
        </div>

      </div>
      <div className={"mt-12"}>
        <div className={"flex flex-wrap justify-center items-center"}>
          {map(dogs,dog=>{
            return <ShelterDogCard  key={dog.did} dog={dog} name={dog.dname} age={dog.age} breed={breeds[dog.bid-1].bname} dogImg={dog.imageurl} did={dog.did} type={user.type==="adopter"?"see more":""}/>;
          })}
        </div>
         </div>
      <div className={"flex justify-center p-10"}>
      <button type={"button"} className={"rounded-[21px] mt-5 items-between text-white text-[13px] font-[600] bg-[#3E665C] w-[140px] h-[40px]"}> Load More</button>
      </div>
      <div className={"mt-5 bg-[#3E665C] p-5 flex justify-around items-center" }>
        <span><span className={"text-[18px] mx-2 text-[#70CF36] font-[900]"}>Email : <span className={"text-[15px] font-bold text-white"}>{user.email}</span></span></span>
        <span><span className={"text-[18px] mx-2 text-[#70CF36] mr-auto font-[900]"}>Phone no : <span className={"text-[15px] font-bold text-white"}>{user.phone}</span></span></span>
      </div>
    </div>
  </div>
  </div>;
};

export default ShelterHomePage;
