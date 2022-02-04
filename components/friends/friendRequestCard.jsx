import { useRouter } from "next/router";
import React from "react";

export default function FriendRequestCard({ obj }) {
  const capitalizeFirstLetter = (s) => s && s[0].toUpperCase() + s.slice(1);

  const router = useRouter();

  const handleAccept = async () => {
    const confirmA = confirm("Are you sure?");

    if (confirmA) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/firends/accept/${obj.requested_user_id}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      if (res.ok) {
        alert("success");
        router.reload();
      } else {
        alert("Something went wrong! status:", res.status);
      }
    }
  };
  const handleReject = async () => {
    const confirmR = confirm("Are you sure?");

    if (confirmR) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/firends/reject/${obj.requested_user_id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (res.ok) {
        alert("success");
        router.reload();
      } else {
        alert("Something went wrong! status:", res.status);
      }
    }
  };

  return (
    <div className="flex flex-row justify-between w-72 h-[4.5rem] border-[1px] border-green-300 bg-gray-100  rounded mb-5 mx-2">
      <div className="flex flex-col justify-between h-full w-52">
        <div className="flex flex-row h-full items-center ml-3 ">
          <div className="flex text-white font-bold justify-center w-8 h-8 items-center bg-black rounded-full cursor-pointer mr-2">
            {obj.firstname[0].toUpperCase()}
          </div>
          <div className=" font-medium">
            {capitalizeFirstLetter(obj.firstname)}{" "}
            {capitalizeFirstLetter(obj.lastname)}{" "}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-evenly h-full w-16 mr-1">
        <div
          className="text-xs font-medium bg-green-300 text-center rounded py-1 mr-1 cursor-pointer"
          onClick={() => handleAccept()}
        >
          Accept
        </div>

        <div
          className="text-xs font-medium bg-red-500 text-center rounded py-1 mr-1 text-white cursor-pointer"
          onClick={() => handleReject()}
        >
          Reject
        </div>
      </div>
    </div>
  );
}
