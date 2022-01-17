import { useEffect, useRef, useState, useContext } from "react";

import Link from "next/link";
import Modal from "../components/modal";
import Router, { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import FriendsTab from "../components/friends/friendsTab";

export default function friends(props) {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [currTab,setCurrTab]=useState(0)
  

  const activeTabCss='w-1/3 border-b-2  border-black text-center h-10 cursor-pointer px-2'
  const disableTabCss='w-1/3 border-b-2  text-center h-10 text-gray-400 cursor-pointer px-2'

  const [friendsList,setFriendsList]=useState([])

  const fetchFriendsList = async () => {
    const res = await fetch('http://localhost:4000/api/users/firends',{
      method:'GET',
      credentials:'include'
    })
    const data = await res.json()
    if(res.ok){
      console.log('success fetch');
      setFriendsList(data)
    }else{
      return
    }

  }

  




  if (!user)
    return (
      <div className="flex flex-col  w-3/4  mx-auto mt-24 h-[36rem]">
        please login: <Link href="/login">login</Link>
      </div>
    );
  return (
    <div className="flex flex-col w-5/6 mx-auto mt-24">
      <div className="flex flex-row justify-between border-b-2 p-2">
        <div className=" font-semibold text-lg">Friends</div>
        <div className="">
          <button
            className="bg-black text-white border-0 rounded-sm p-1 px-2 text-sm"
            onClick={() => handleFindPersonBtn()}
          >
            Find Person
          </button>
        </div>
      </div>

      <div className="flex flex-row flex-wrap justify-between pt-4 ">

            <div className="flex flex-row justify-evenly items-center tabsHolder h-14 w-5/6 m-auto font-semibold  ">
                <div className={currTab==0 ? activeTabCss : disableTabCss} onClick={()=>setCurrTab(0)}>Friends</div>
                <div className={currTab==1 ? activeTabCss : disableTabCss} onClick={()=>setCurrTab(1)}>Friend Requests</div>
                <div className={currTab==2 ? activeTabCss : disableTabCss} onClick={()=>setCurrTab(2)}>Blocked Users</div>
            </div>
      </div>

      <div className=" min-h-[400px] ">
        
        {currTab==0 ? <FriendsTab></FriendsTab>:''}
      
      </div>
    </div>
  );
}
