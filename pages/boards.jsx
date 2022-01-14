import { useEffect, useState } from "react";
import Board from "../components/boards/boardCard";
import Link from "next/link";

export default function boards(props) {
  const handleAddBoard = () => {};

  const [boards,setBoards]=useState([])

  const fetchBoards = async ()=>{

    const res = await fetch('http://localhost:4000/api/boards',
    {
        method:'GET',
        credentials:'include'
    })
    const data = await res.json()
    if(res.ok) setBoards(data)
    else(console.log(res.status))

  }

  useEffect(()=>{
    fetchBoards()
  },[])

  const boardComponents=boards.map((v,i)=><Board key={v.board_id} obj={v}></Board>)

  return (
    <div className="flex flex-col w-3/4 mx-auto mt-24">
      <div className="flex flex-row justify-between border-b-2 p-2">
        <div className=" font-semibold text-lg">Boards</div>
        <div className="">
          <button
            className="bg-black text-white border-0 rounded-sm p-1 px-2 text-sm"
            onClick={() => handleAddBoard()}
          >
            Add Board
          </button>
        </div>
      </div>

      <div className="flex flex-row flex-wrap justify-evenly shrink-0 p-4">
        {boardComponents}
      </div>
    </div>
  );
}
