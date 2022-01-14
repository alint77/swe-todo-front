import { useEffect, useRef, useState } from "react";
import Board from "../components/boards/boardCard";
import SharedBoard from "../components/boards/sharedBoardCard";
import SuggestedBoard from "../components/boards/suggestedBoardCard";
import Link from "next/link";
import Modal from "../components/modal";
import Router, { useRouter } from "next/router";

export default function boards(props) {
  const [boards, setBoards] = useState([]);
  const [addBoardModalFlag, setAddBoardModalFlag] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const newBoardPrivateCheckRef = useRef();
  const router = useRouter();

  const handleAddBtn = () => {
    addBoardModalFlag
      ? setAddBoardModalFlag(false)
      : setAddBoardModalFlag(true);
  };

  const handleAddBoard = async () => {
    const is_private = newBoardPrivateCheckRef.current.checked;
    const res = await fetch("http://localhost:4000/api/boards", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newBoardTitle,
        is_private: is_private,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      console.log(data);
      alert("success");
      router.reload();
    } else console.log(res.statusText);
  };

  const fetchBoards = async () => {
    const res = await fetch("http://localhost:4000/api/boards", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) setBoards(data);
    else console.log(res.status);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const boardComponents = boards.map((v, i) => (
    <Board key={v.board_id} obj={v}></Board>
  ));

  const sharedBoardComponents = boards.map((v, i) => (
    <SharedBoard key={v.board_id} obj={v}></SharedBoard>
  ));
  const suggestedBoardComponents = boards.map((v, i) => (
    <SuggestedBoard key={v.board_id} obj={v}></SuggestedBoard>
  ));

  return (
    <div className="flex flex-col w-5/6 mx-auto mt-24">
      <div className="flex flex-row justify-between border-b-2 p-2">
        <div className=" font-semibold text-lg">Boards</div>
        <div className="">
          <button
            className="bg-black text-white border-0 rounded-sm p-1 px-2 text-sm"
            onClick={() => handleAddBtn()}
          >
            Add Board
          </button>
        </div>
      </div>

      <div className="flex flex-row flex-wrap justify-between p-4 ">
        <div className="flex flex-col w-1/4 min-w-[280px]  ">
          <div className="titleHolder font-semibold border-b-2 p-2">
            My Boards
          </div>
          <div className="boardsHolder mx-auto w-full">{boardComponents}</div>
        </div>
        <div className="flex flex-col w-1/4 min-w-[280px]  ">
          <div className="titleHolder font-semibold border-b-2 p-2">
            Shared Boards
          </div>
          <div className="boardsHolder mx-auto w-full">
            {sharedBoardComponents}
          </div>
        </div>
        <div className="flex flex-col w-1/4 min-w-[280px]  ">
          <div className="titleHolder font-semibold border-b-2 p-2">
            Suggested Boards
          </div>
          <div className="boardsHolder mx-auto w-full">
            {suggestedBoardComponents}
          </div>
        </div>
      </div>

      <Modal
        isOpen={addBoardModalFlag}
        setIsOpen={setAddBoardModalFlag}
        title="Add Board"
      >
        <div className="p-4">
          <label
            className="block text-gray-700 text-sm my-2"
            htmlFor="boardTitle"
          >
            Board Title:
          </label>

          <input
            onChange={(e) => setNewBoardTitle(e.target.value)}
            value={newBoardTitle}
            className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none "
            id="boardTitle"
            type="text"
            placeholder="Board Title"
          />

          <label className=" text-gray-700 text-sm" htmlFor="remember">
            Private Board
          </label>
          <input
            ref={newBoardPrivateCheckRef}
            className="m-4"
            type="checkbox"
            id="remember"
          />
        </div>
        <div className="flex flex-row-reverse items-center border-t-2 h-12">
          <div
            className="mr-5 px-2 py-1 bg-green-400 text-white rounded font-semibold text-sm cursor-pointer"
            onClick={() => handleAddBoard()}
          >
            Add
          </div>
        </div>
      </Modal>
    </div>
  );
}
