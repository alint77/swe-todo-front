import { useRouter } from "next/router";

import { useState } from "react";

import Modal from "../../../modal";

export default function Card({ obj, boardmembers }) {
  const router = useRouter();

  const [assignedUsers, setAssignedUsers] = useState(obj.assignedUsers);
  const [showAssignUserModal, setShowAssignUserModal] = useState(false);

  const l = boardmembers.filter((v) => {
    if (assignedUsers.find((e) => e.id == v.user_id)) return;
    return v;
  });

  const handleAssignUser = async (userId) => {
    console.log(userId);
    const res = await fetch("http://localhost:4000/api/cards/assign", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        card_id: obj.card_id,
        user_id: userId,
      }),
    });
    if(res.ok){
      alert('success')
      router.reload()
    }
    else{
      alert('Something went wrong. status:',res.status)
    }
  };

  const handleCloseAssignUserModal = () => {
    setShowAssignUserModal(false);
    setShowCardModal(true);
  };

  const [cardIsDone, setCardIsDone] = useState(obj.is_done);
  const [cardTitle, setCardTitle] = useState(obj.title);
  const [dueDate, setDueDate] = useState(obj.due_date_time);
  const [showCardModal, setShowCardModal] = useState(false);

  const isExpired = dueDate >= Date.now() ? true : false;

  const handleEditCard = async () => {
    if (
      cardIsDone == obj.is_done &&
      cardTitle == obj.title &&
      dueDate == obj.due_date_time
    ) {
      return setShowCardModal(false);
    }

    const res = await fetch(`http://localhost:4000/api/cards/${obj.card_id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: cardTitle,
        is_done: cardIsDone,
        due_date_time: dueDate,
      }),
    });

    if (res.ok) {
      alert("success");
      router.reload();
    } else {
      alert(res.statusText);
      console.log(res, "response");
    }
  };

  const handleDeleteCard = async () => {
    const shouldDelete = confirm("Are you sure?");
    if (shouldDelete) {
      const res = await fetch(
        `http://localhost:4000/api/cards/${obj.card_id}`,
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

  const membersList = assignedUsers.map((v, i) => (
    <div
      className="flex text-white font-bold justify-center w-5 h-5 items-center text-xs bg-black rounded-full cursor-pointer mr-1"
      key={i}
      title={v.firstname + " " + v.lastname}
    >
      {v.firstname.substring(0, 1).toUpperCase()}
    </div>
  ));

  const membersListInModal = assignedUsers.map((v, i) => (
    <div
      className="flex text-white font-bold justify-center w-8 h-8 items-center text-sm bg-black rounded-full cursor-pointer mr-1"
      key={i}
      title={v.firstname + " " + v.lastname}
    >
      {v.firstname.substring(0, 1).toUpperCase()}
    </div>
  ));

  const titleComp = (
    <div className="font-medium text-base">
      Added By : {obj.creator.firstname} {obj.creator.lastname}{" "}
    </div>
  );

  const createDate = new Date(obj.create_date_time).toUTCString();

  const date = new Date(obj.due_date_time);
  const sth = date.getMonth() + 1;
  const st = date.getDate();

  return (
    <>
      <div
        className="card flex flex-col bg-white shadow-md p-2 mb-3 rounded cursor-pointer"
        onClick={() => setShowCardModal(true)}
      >
        <div className="cardTopbox flex flex-row justify-between ">
          <div className="membersIcons flex flex-row px-1 ">{membersList}</div>
          <div
            className={
              "createDate  flex items-center rounded  px-1 text-sm " +
              (isExpired
                ? " bg-red-300 text-white"
                : obj.is_done
                ? "bg-green-300"
                : "bg-orange-200")
            }
          >
            {sth}/{st}
          </div>
        </div>
        <div className="cardTitle text-sm font-medium mt-2">{obj.title}</div>
      </div>

      <Modal
        isOpen={showCardModal}
        setIsOpen={setShowCardModal}
        title={titleComp}
      >
        <div className="">
          <div className="flex justify-between items-center border-b-2 h-14 px-4">
            <div>
              <input
                className=" w-72"
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
                type="text"
              />
              {!isExpired && (
                <input
                  className="ml-1"
                  checked={cardIsDone}
                  onChange={() =>
                    cardIsDone ? setCardIsDone(false) : setCardIsDone(true)
                  }
                  type="checkbox"
                />
              )}
            </div>

            <div
              className={
                "createDate  flex items-center rounded px-1 py-px text-sm " +
                (isExpired
                  ? " bg-red-500 text-white"
                  : cardIsDone
                  ? "bg-green-300"
                  : "bg-orange-200")
              }
            >
              {sth}/{st}
            </div>
          </div>
          <div className="border-b-2 min-h-[4rem]">
            {/* TODO: Description */}
          </div>
          <div className="flex items-center font-medium text-xs pl-4 border-b-2 h-10">
            Card Added on {createDate}
          </div>
        </div>
        <div className="flex flex-col  items-center">
          <div className="flex justify-between items-center w-full h-10 ">
            <div className="pl-4 font-medium "> Members :</div>
            <div
              className="pr-4 font-medium text-xs text-gray-600 cursor-pointer"
              onClick={() => {
                setShowAssignUserModal(true);
                setShowCardModal(false);
                console.log(assignedUsers);
              }}
            >
              + Assign User
            </div>
          </div>
          <div className="flex items-center w-full h-14 px-4">
            {membersListInModal}
          </div>
        </div>
        <div className="flex flex-row-reverse items-center border-t-2 h-12">
          <div
            className="mr-5 px-2 py-1 bg-green-500 text-white rounded font-semibold text-sm cursor-pointer"
            onClick={() => handleEditCard()}
          >
            Save
          </div>

          <div
            className="mr-3 px-2 py-1 bg-red-500 text-white rounded font-semibold text-sm cursor-pointer"
            onClick={() => handleDeleteCard()}
          >
            Delete
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showAssignUserModal}
        setIsOpen={handleCloseAssignUserModal}
        title="Assign User To Card :"
      >
        <div className="pb-6">

          

          {l.map((v, i) => {
            return (
              <div
                key={i}
                className="flex flex-row justify-between mx-12 h-12  bg-gray-200 mt-4 shadow-md rounded "
              >
                <div className="flex flex-row items-center">
                  <div className=" flex flex-row items-center justify-center mx-2 bg-black h-8 w-8 text-white font-semibold text-lg rounded-full  ">
                    {v.firstname.substring(0, 1).toUpperCase()}
                  </div>
                  <div>
                    {v.firstname} {v.lastname}
                  </div>
                </div>
                <div
                  className="flex items-center bg-green-500 rounded px-2 my-2 mr-2 text-white font-medium text-sm cursor-pointer"
                  onClick={() => handleAssignUser(v.user_id)}
                >
                  Add
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
}
