import { useEffect, useRef, useState, useContext } from "react";
import Board from "../components/boards/boardCard";
import SharedBoard from "../components/boards/sharedBoardCard";
import SuggestedBoard from "../components/boards/suggestedBoardCard";
import Link from "next/link";
import Modal from "../components/modal";
import Router, { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

export default function boards(props) {
  const [boards, setBoards] = useState([]);
  const [sharedBoards, setSharedBoards] = useState([]);
  const [suggestedBoards, setSuggestedBoards] = useState([]);
  const [addBoardModalFlag, setAddBoardModalFlag] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const newBoardPrivateCheckRef = useRef();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const handleAddBtn = () => {
    addBoardModalFlag
      ? setAddBoardModalFlag(false)
      : setAddBoardModalFlag(true);
  };

  const handleAddBoard = async () => {
    const is_private = newBoardPrivateCheckRef.current.checked;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards`, {
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
    const resCreated = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/boards/created`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const resShared = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/boards/joined`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const resSuggested = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/boards/suggested`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const dataCreated = await resCreated.json();
    const dataShared = await resShared.json();
    const dataSuggested = await resSuggested.json();

    if (resCreated.ok && resShared.ok && resSuggested.ok) {
      setBoards(dataCreated);
      setSharedBoards(dataShared);
      console.log(dataShared, "shared");
      setSuggestedBoards(dataSuggested);
      console.log(dataSuggested, "suggested");
    } else
      console.log(
        resCreated.status,
        resShared.status,
        resSuggested.status,
        "createdError,sharedError,suggestedError"
      );
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const boardComponents = boards.map((v, i) => (
    <Board key={v.board_id} obj={v}></Board>
  ));

  const sharedBoardComponents = sharedBoards.map((v, i) => (
    <SharedBoard key={v.board_id} obj={v}></SharedBoard>
  ));
  const suggestedBoardComponents = suggestedBoards.map((v, i) => (
    <SuggestedBoard key={v.board_id} obj={v}></SuggestedBoard>
  ));

  if (!user)
    return (
      <div className="flex flex-col  w-3/4  mx-auto mt-24 h-[36rem]">
        please login: <Link href="/login">login</Link>
      </div>
    );
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
        <div className="flex flex-col w-1/4 min-w-[240px]  ">
          <div className="titleHolder font-semibold border-b-2 p-2">
            My Boards
          </div>
          <div className="boardsHolder mx-auto w-full">{boardComponents}</div>
        </div>
        <div className="flex flex-col w-1/4 min-w-[240px]  ">
          <div className="titleHolder font-semibold border-b-2 p-2">
            Shared Boards
          </div>
          <div className="boardsHolder mx-auto w-full">
            {sharedBoardComponents}
          </div>
        </div>
        <div className="flex flex-col w-1/4 min-w-[240px]  ">
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
