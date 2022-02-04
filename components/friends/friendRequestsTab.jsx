import { useState, useEffect } from "react";
import FriendRequestCard from "./friendRequestCard";

export default function FriendRequestsTab() {
  const [isLoading, setIsLoading] = useState(true);
  const [friendRequestsList, setFriendRequestsList] = useState([]);

  const handleFetchFriendRequestsList = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/firends/requests`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await res.json();
    if (res.ok) {
      console.log(res, "response");
      console.log(data, "data");
      setIsLoading(false);
      setFriendRequestsList(data);
    } else {
      console.log(res);
    }
  };

  useEffect(() => {
    handleFetchFriendRequestsList();
  }, []);

  const friendRequestsListComps = friendRequestsList.map((v) => (
    <FriendRequestCard obj={v} key={v.friend_id}></FriendRequestCard>
  ));

  if (isLoading) return <> loading ... </>;
  return (
    <>
      <div className="flex flex-row flex-wrap justify-evenly align-middle py-8 px-3">
        {friendRequestsListComps}
      </div>
    </>
  );
}
