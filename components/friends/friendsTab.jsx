import { useEffect, useState } from "react";
import FriendCard from "./friendCard";

export default function FriendsTab({ obj }) {
  const [isLoading, setIsLoading] = useState(true);
  const [friendsList, setFriendsList] = useState([]);

  const handleFetchFriendsList = async () => {
    const res = await fetch("http://localhost:4000/api/users/firends", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) {
      setIsLoading(false);
      setFriendsList(data);
    } else {
      console.log(res);
    }
  };

  useEffect(() => {
    handleFetchFriendsList();
  }, []);

  const friendsListComps = friendsList.map((v) => (
    <FriendCard obj={v} key={v.friend_id}></FriendCard>
  ));

  if (isLoading) return <> loading ... </>;
  return (
    <>
      <div className="flex flex-row flex-wrap justify-evenly align-middle py-8 px-3">
        {friendsListComps}
      </div>

      
    </>
  );
}
