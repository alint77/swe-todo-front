import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "../../modal";
import Card from "./list/cardCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { route } from "next/dist/server/router";

export default function List(props) {

  console.log(props,'props');


  const[listTitle,setListTitle]=useState(props.obj.title)

  const router = useRouter();

  const[showEditListModal,setShowEditListModal]=useState(false)
  const[editedListTitle,setEditedListTitle]=useState('')
  const handleCloseEditTitleModal = () => {
    setShowEditListModal(false)
    setEditedListTitle('')
  }

  const handleEditList = async () => {
    if (
      editedListTitle == props.obj.title 
    ) {
      return setShowEditListModal(false);
    }

    const res = await fetch(`http://localhost:4000/api/boards/lists/${props.obj.list_id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editedListTitle
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

  const handleDeleteList = async() => {
    const shouldDelete = confirm("Are you sure?");
    if (shouldDelete) {
      const res = await fetch(
        `http://localhost:4000/api/boards/lists/${props.obj.list_id}`,
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
    
  }
  




  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDueDate, setNewCardDueDate] = useState(new Date());
  const handleCloseNewCardModal = () => {
    setNewCardTitle("");
    setNewCardDueDate("");
    setShowAddCardModal(false);
  };
  const handleAddCard = async () => {
    const res = await fetch('http://localhost:4000/api/cards',
    {
      method:'POST',
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      },
      body : JSON.stringify({
        title:newCardTitle,
        list_id:props.obj.list_id,
        due_date_time:newCardDueDate
      })

    })

    if(res.ok){
      alert('success')
      router.reload()
    }
    else{
      alert(res.statusText)
      console.log(res);
    }

  };

  const cardsComps = props.obj.cards.map((v, i) => (
    <Card obj={v} key={v.card_id}  ></Card>
  ));

  return (
    <>
      <div className="list flex flex-col w-[280px] mx-4 my-4 bg-gray-200 p-4 rounded shadow-md h-min">
        <div className="listTop flex flex-row justify-between align-middle ">
          <div className="listTitle flex items-center font-semibold  h-10 ">
            {props.obj.title}
          </div>
          <div
            className="listOptionsBtn h-10 font-bold cursor-pointer "
            onClick={() => setShowEditListModal(true)}
          >
            ...
          </div>
        </div>
        <div className="listMiddle flex flex-col max-h-[600px] overflow-scroll ">{cardsComps}</div>
        <div className="listBottom flex flex-row-reverse mt-1">
          <div
            className="addCardBtn text-sm font-semibold cursor-pointer"
            onClick={() => setShowAddCardModal(true)}
          >
            + Add New Card
          </div>
        </div>
      </div>

      <Modal
        isOpen={showAddCardModal}
        setIsOpen={handleCloseNewCardModal}
        title="Add New Card"
      >
        <div className="p-4">
          <label
            className="block text-gray-700 text-sm my-2"
            htmlFor="cardTitle"
          >
            Card Title
          </label>

          <input
            onChange={(e) => setNewCardTitle(e.target.value)}
            value={newCardTitle}
            className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none "
            id="cardTitle"
            type="text"
            placeholder="Card Title"
          />

          <label
            className="block text-gray-700 text-sm my-2"
            htmlFor="datePicker"
          >
            Card Due Date
          </label>

          <DatePicker placeholderText="Select Date" selected={newCardDueDate} onChange={(date)=>setNewCardDueDate(date)} className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none "></DatePicker>
        </div>
        <div className="flex flex-row-reverse items-center border-t-2 h-12">
          <div
            className="mr-5 px-2 py-1 bg-green-400 text-white rounded font-semibold text-sm cursor-pointer"
            onClick={() => handleAddCard()}
          >
            Add
          </div>
        </div>
      </Modal>


      <Modal
        isOpen={showEditListModal}
        setIsOpen={handleCloseEditTitleModal}
        title={`Edit '${props.obj.title}' List`}
      >
        <div className="p-4">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="listTitle"
          >
            New Title
          </label>

          <input
            onChange={(e) => setEditedListTitle(e.target.value)}
            value={editedListTitle}
            className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none "
            id="listTitle"
            type="text"
            placeholder={props.obj.title}
          />

          

        </div>
        <div className="flex flex-row-reverse items-center border-t-2 h-12">
          <div
            className="mr-5 px-2 py-1 bg-green-500 text-white rounded font-semibold text-sm cursor-pointer"
            onClick={() => handleEditList()}
          >
            Save
          </div>
          <div
            className="mr-3 px-2 py-1 bg-red-500 text-white rounded font-semibold text-sm cursor-pointer"
            onClick={() => handleDeleteList()}
          >
            Delete
          </div>
        </div>
      </Modal>



    </>
  );
}
