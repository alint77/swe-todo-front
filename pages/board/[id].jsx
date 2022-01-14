import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import List from "../../components/boards/board/listCard";

export default function boardPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [board, setBoard] = useState({});
  const [members, setMembers] = useState([]);

  const router = useRouter();

  const fetchBoard = async () => {
    setIsLoading(true);

    const res = await fetch(
      `http://localhost:4000/api/boards/${router.query.id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setBoard(data.board);
      setMembers(data.members);
      setIsLoading(false);
    } else {
      setIsLoading(false);

      console.log(res.status);
    }
  };

  const visibilityCss = board.is_private
    ? " ml-4 px-1 bg-red-500 text-white rounded"
    : " ml-4 px-1 bg-green-500 text-white rounded";

  const membersList = members.map((v, i) => (
    <div
      className="flex text-white font-bold justify-center w-7 h-7 items-center text-lg bg-black rounded-full cursor-pointer mx-1"
      key={i}
      title={v.firstname + " " + v.lastname}
    >
      
      {v.firstname.substring(0, 1)}
    </div>
  ));
  //@TODO :
  const cardMembersList = [];
  console.log(members);

  useEffect(() => {
    if (router.query.id) fetchBoard();
  }, [router.query.id]);

  if (isLoading) return <div>loading...</div>;
  return (
    <div className="flex flex-col w-5/6 mx-auto mt-24 ">
      <div className="flex flex-row justify-between border-b-2 p-2  ">
        <div className="flex flex-row items-center">
          <div className="font-semibold text-lg">{board.title}</div>
          <div className={visibilityCss}>
            {board.is_private ? "private" : "Public"}
          </div>
        </div>

        <div className="flex flex-row">
          <div className="memebersAndAdd flex flex-row-reverse border-0 mr-4">
            <div
              className="addMemberBtn flex text-white font-bold justify-center w-7 h-7 items-center text-lg bg-black rounded-full cursor-pointer"
              title="Add Member"
              onClick={() => handleAddMember()}
            >
              +
            </div>
            <div className="members flex flex-row">{membersList}</div>
          </div>

          <button
            className=" createListBtn bg-black  font-semibold text-white border-0 rounded-sm p-1 px-3 text-sm"
            onClick={() => handleCreateList()}
          >
            Create List
          </button>
        </div>
      </div>

      <div className="flex flex-row flex-wrap justify-evenly align-top shrink-0  p-4 overflow-scroll">
        {/* List Start */}
        <List cards={5}></List>
        <List cards={2}></List>
        <List cards={3}></List>
        <List cards={2}></List>
      </div>
    </div>
  );
}
