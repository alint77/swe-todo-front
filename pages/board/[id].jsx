import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import List from "../../components/boards/board/listCard";
import Modal from "../../components/modal";

export default function boardPage(props) {

  
  

  const [isLoading, setIsLoading] = useState(true);
  const [board, setBoard] = useState({});
  const [lists,setLists]=useState([])
  const [members, setMembers] = useState([]);
  const router = useRouter();


  const [newListTitle, setNewListTitle] = useState("");
  const [showNewListModal, setShowNewListModal] = useState(false);

  const handleCloseNewListModal = () => {
    setNewListTitle("");
    setShowNewListModal(false);
  };


  const handleNewList = async () => {
    const res = await fetch("http://localhost:4000/api/boards/lists", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newListTitle,
        board_id: board.board_id,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("success");

      router.reload();
    } else {
      alert(res.statusText);

      console.log(res, "res");
      console.log(data, "data");
    }
  };





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
    if (res.ok) {
      setBoard(data.board);
      setMembers(data.members);
      setIsLoading(false);
    } else {
      setIsLoading(false);

      console.log(res.status);
    }
  };

  const fetchLists = async () => {
    if(!board.board_id) return
    const res = await fetch(
      `http://localhost:4000/api/cards?board=${board.board_id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await res.json();
    
    if (res.ok) {
      setLists(data)
    }
    else(
      console.log(res.statusText)
    )
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

  useEffect(() => {
    if (router.query.id) fetchBoard();
  }, [router.query.id]);

  useEffect(() => {
    fetchLists();
  }, [board]);

  const listsComps = lists.map((v)=>{
    return <List obj={v} key={v.list_id} ></List>
  })

  if (isLoading) return <div>loading...</div>;
  return (
    <>
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
              onClick={() => setShowNewListModal(true)}
            >
              Create List
            </button>
          </div>
        </div>

        <div className="align-top shrink-0 border-2 p-4 overflow-scroll min-h-[600px]">
          <div className=" w-fit flex flex-row justify-evenly align-top">
            {listsComps}
          </div>
        </div>
      </div>

      <Modal isOpen={showNewListModal} setIsOpen={handleCloseNewListModal} title='Create List' >
      <div className="p-4">
          <label
            className="block text-gray-700 text-sm my-2"
            htmlFor="listTitle"
          >
            List Title:
          </label>

          <input
            onChange={(e) => setNewListTitle(e.target.value)}
            value={newListTitle}
            className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none "
            id="listTitle"
            type="text"
            placeholder="List Title"
          />

          
        </div>
        <div className="flex flex-row-reverse items-center border-t-2 h-12">
          <div
            className="mr-5 px-2 py-1 bg-green-400 text-white rounded font-semibold text-sm cursor-pointer"
            onClick={() => handleNewList()}
          >
            Add
          </div>
        </div>
      </Modal>
      





    </>
  );
}
