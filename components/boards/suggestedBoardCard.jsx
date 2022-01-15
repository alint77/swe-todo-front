import Link from "next/link";

export default function board({ obj }) {
  const handleJoin = async () => {
    const confirmJoin = confirm("Press OK to confirm");
    if (confirmJoin) {
      const res = await fetch(
        `http://localhost:4000/api/boards/join/${obj.board_id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (res.ok) {
        alert("success");
        router.reload();
      } else console.log();
    }
  };

  return (
    <div className="flex justify-between items-center flex-row h-24 my-4 mx-1 bg-gray-200 p-2 shadow-lg border-0 rounded-md">
      <div className="flex flex-col h-full font-semibold mx-1 ">
        <div className="mt-4">
          <div>{obj.title}</div>
        </div>

        <div className="flex font-normal text-xs my-2">
          {/* TODO: */}
          By: {obj.firstname} {obj.lastname}
        </div>
      </div>
      <div
        className="flex items-center text-xs text-white  font-semibold h-8 p-1 bg-green-400 border-0 rounded-md cursor-pointer "
        onClick={() => handleJoin()}
      >
        Join
      </div>
    </div>
  );
}
