import { useEffect, useRef, useState, useContext } from "react";

import Link from "next/link";
import Modal from "../components/modal";
import Router, { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import FriendsTab from "../components/friends/friendsTab";
import FriendCardFindEmail from "../components/friends/friendCardFindEmail";
import FriendRequestsTab from "../components/friends/friendRequestsTab";

export default function friends(props) {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [currTab, setCurrTab] = useState(0);


  const [foundUserObj,setFoundUserObj]=useState(undefined)
  const [showFindPersonModal, setShowFindPersonModal] = useState(false);
  const [findPersonModalEmailInput, setFindPersonModalEmailInput] =
    useState("");

  const handleCloseFindPersonModal = () => {
    setShowFindPersonModal(false);
    setFindPersonModalEmailInput("");
  };

  const handleFindFriendBtn = async () => {
    const res = await fetch('http://localhost:4000/api/users?email='+findPersonModalEmailInput,{
      credentials:'include'
    })
    const data = await res.json()
    if(res.ok){
      setFoundUserObj(data)

    }else{
      setFoundUserObj(undefined)
      alert('Could Not Find User')
    }
  }

  const activeTabCss =
    "w-1/2 border-b-2  border-black text-center h-10 cursor-pointer px-2";
  const disableTabCss =
    "w-1/2 border-b-2  text-center h-10 text-gray-400 cursor-pointer px-2";

  if (!user)
    return (
      <div className="flex flex-col  w-3/4  mx-auto mt-24 h-[36rem]">
        please login: <Link href="/login">login</Link>
      </div>
    );

  console.log(foundUserObj);
  return (
    <>
      <div className="flex flex-col w-5/6 mx-auto mt-24">
        <div className="flex flex-row justify-between border-b-2 p-2">
          <div className=" font-semibold text-lg">Friends</div>
          <div className="">
            <button
              className="bg-black text-white border-0 rounded-sm p-1 px-2 text-sm"
              onClick={() => setShowFindPersonModal(true)}
            >
              Find Person
            </button>
          </div>
        </div>

        <div className="flex flex-row flex-wrap justify-between pt-4 ">
          <div className="flex flex-row justify-evenly items-center tabsHolder h-14 w-5/6 m-auto font-semibold  ">
            <div
              className={currTab == 0 ? activeTabCss : disableTabCss}
              onClick={() => setCurrTab(0)}
            >
              Friends
            </div>
            <div
              className={currTab == 1 ? activeTabCss : disableTabCss}
              onClick={() => setCurrTab(1)}
            >
              Friend Requests
            </div>
          </div>
        </div>

        <div className=" min-h-[400px] ">
          {currTab == 0 ? <FriendsTab></FriendsTab> : <FriendRequestsTab></FriendRequestsTab>}
        </div>
      </div>

      <Modal
        isOpen={showFindPersonModal}
        setIsOpen={handleCloseFindPersonModal}
        title="Find Person By Email"
      >
        <div className="p-4">
          <label className="block text-gray-700 text-sm my-2" htmlFor="search">
            Email
          </label>

          <div className="flex flex-row justify-between h-8 mb-4">
            <input
              onChange={(e) => setFindPersonModalEmailInput(e.target.value)}
              value={findPersonModalEmailInput}
              className="shadow appearance-none border relative rounded w-full px-4 text-gray-700 leading-tight focus:outline-none "
              id="search"
              type="email"
              placeholder="User Email"
            />
            <div className="flex bg-red-500 text-sm items-center ml-2 px-1 rounded font-medium text-white cursor-pointer" onClick={()=>handleFindFriendBtn()} >Find</div>
          </div>
          <div className="flex justify-center align-middle my-auto item-center w-full ">
            {foundUserObj && <FriendCardFindEmail obj={foundUserObj}></FriendCardFindEmail>}
          </div>
        </div>
        <div className="flex flex-row-reverse items-center border-t-2 h-12">
          <div
            className="mr-5 px-2 py-1 bg-green-500 text-white rounded font-semibold text-sm cursor-pointer"
            onClick={() => router.reload()}
          >
            Done
          </div>
        </div>
      </Modal>
    </>
  );
}
