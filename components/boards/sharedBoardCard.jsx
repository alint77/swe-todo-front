import Link from "next/link";
import { useRouter } from "next/router";

export default function board({ obj }) {
  const router = useRouter();
  const handleLeave = async () => {
    const cnf = confirm("Are you sure ?");
    if (!cnf) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/boards/leave/${obj.board_id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (res.ok) alert("success");
    else alert("error!");

    router.reload();
  };

  return (
    <div className="flex justify-between items-center flex-row h-20 my-4 mx-1 bg-gray-200 p-2 shadow-lg border-0 rounded-md">
      <div className="flex flex-col h-full font-semibold mx-1 ">
        <div className="mt-2">
          <Link href={`/board/${obj.board_id}`}>{obj.title}</Link>
        </div>

        <div className="flex font-normal text-xs my-2">
          {/* TODO: */}
          By: {obj.creator_firstname} {obj.creatpr_lastname}
        </div>
      </div>
      <div
        className="flex items-center text-xs  font-semibold h-8 p-1 bg-orange-200 border-0 rounded-md cursor-pointer "
        onClick={() => handleLeave()}
      >
        Leave
      </div>
    </div>
  );
}
