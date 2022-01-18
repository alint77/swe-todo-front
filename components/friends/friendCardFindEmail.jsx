import React from "react";

export default function FriendCardFindEmail({ obj }) {
  const capitalizeFirstLetter = (s) => s && s[0].toUpperCase() + s.slice(1);

  const handleRequest = async () => {
    const res = await fetch(
      `http://localhost:4000/api/users/firends/${obj.user_id}`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    if (res.ok) {
      alert("success");
    } else {
      alert("Something went wrong! status:",res.status);
    }
  };

  return (
    <div className="flex flex-row justify-between w-72 h-[4.5rem] border-[1px] border-green-300 bg-gray-100  rounded my-2 mx-2">
      <div className="flex flex-col justify-between h-full w-52">
        <div className="flex flex-row h-1/2 ml-2 mt-2  ">
          <div className="flex text-white font-bold justify-center w-5 h-5 items-center text-xs bg-black rounded-full cursor-pointer mr-2">
            {obj.firstname[0].toUpperCase()}
          </div>
          <div className=" text-sm font-medium">
            {capitalizeFirstLetter(obj.firstname)}{" "}
            {capitalizeFirstLetter(obj.lastname)}{" "}
          </div>
        </div>
        <div className="flex flex-row text-gray-600 text-sm h-1/2 ml-3">
          {obj.email}
        </div>
      </div>

      <div className="flex flex-col justify-evenly h-full w-16 mr-1">
        <div
          className="text-xs font-medium bg-orange-200 text-center rounded py-1 mr-1 cursor-pointer"
          onClick={() => handleRequest()}
        >
          Send Request
        </div>
      </div>
    </div>
  );
}
