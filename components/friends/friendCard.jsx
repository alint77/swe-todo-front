import React from "react";

export default function FriendCard() {
  return (
    <div className="flex flex-row justify-between w-72 h-[4.5rem] border-[1px] border-green-300 bg-gray-100  rounded mb-5">
      <div className="flex flex-col justify-between h-full w-52">
        <div className="flex flex-row h-1/2 ml-2 mt-2  ">
          <div className="flex text-white font-bold justify-center w-5 h-5 items-center text-xs bg-black rounded-full cursor-pointer mr-2">
              A
          </div>
          <div className=" text-sm font-medium">ali naeimi zadeh</div>
        </div>
        <div className="flex flex-row text-gray-600 text-sm h-1/2 ml-3">
          alint1377@gmail.com
        </div>
      </div>

      <div className="flex flex-col justify-evenly h-full w-16 mr-1">
        <div className="text-xs font-medium bg-orange-200 text-center rounded py-0.5">
          Unfriend
        </div>
        <div className="text-xs font-medium bg-red-500 text-center text-white rounded py-0.5">
          Block
        </div>
      </div>
    </div>
  );
}
