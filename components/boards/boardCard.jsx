import Link from "next/link";
import Router, { useRouter } from "next/router";

export default function board({ obj }) {
  const router = useRouter();
  const handleDelete = async () => {

    const shouldDelete = confirm("Are you sure?");
    if(shouldDelete){
    const res = await fetch(
      `http://localhost:4000/api/boards/${obj.board_id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (res.ok) {
      alert("Success");
      router.reload();
    }
    }
  };

  const publicCss =
    "flex items-center text-xs text-white font-semibold h-8  p-1 bg-green-400 border-0 rounded-md mb-1";
  const privateCss =
    "flex items-center text-xs text-white font-semibold h-8  p-1 bg-red-500 border-0 rounded-md mb-1";

  return (
    <div className="flex justify-between items-center flex-row h-20 my-4 mx-1 bg-gray-200 p-2 shadow-lg border-0 rounded-md">
      <div className="flex items-center h-full font-semibold mx-1 ">
        <Link href={`/board/${obj.board_id}`}>{obj.title}</Link>
      </div>

      <div className="w-12">
        <div className={obj.is_private ? privateCss : publicCss}>
          {obj.is_private ? "Private" : "Public"}
        </div>
        <div
          className="flex items-center text-xs  font-semibold h-8 w-12 text-center p-1 bg-orange-200 border-0 rounded-md cursor-pointer "
          onClick={() => handleDelete()}
        >
          Delete
        </div>
      </div>
    </div>
  );
}
