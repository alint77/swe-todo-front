import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Modal from "../components/modal";
import PleaseLoginPage from "../components/pleaseLoginPage";

export default function profile() {
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const handleCloseChangePassModal = () => {
    setCurrPass("");
    setNewPass("");
    setConfirmNewPass("");
    setShowChangePassModal(false);
  };

  const handleChangePassword = async () => {
    if (newPass !== confirmNewPass) {
      alert(`Passwords don't match`);
    } else {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/changePassword`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            current_password: currPass,
            new_password: newPass,
            new_password_confirm: confirmNewPass,
          }),
        }
      );

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        alert("success");
        router.reload();
      } else {
        alert(res.statusText);
      }
    }
  };

  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setShowEditModal(false);
  };

  const handleEditProfile = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstNameInput,
        lastname: lastNameInput,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      alert("success");
      router.reload();
    } else {
      alert(res.statusText);
      console.log(res);
    }
  };

  const router = useRouter();

  const { user, error } = useContext(AuthContext);

  return (
    <div className="flex flex-col  w-5/6  mx-auto mt-24 h-[36rem]">
      <div className="flex flex-row justify-between border-b-2 p-2">
        <div className=" font-semibold text-lg">My Profile</div>
        <div className="">
          <button
            className="bg-black text-white border-0 rounded-sm p-1 px-2 text-sm"
            onClick={() => setShowChangePassModal(true)}
          >
            Change Password
          </button>
        </div>
      </div>
      <div className="flex flex-col  h-full p-3 pt-8 ">
        <div className="flex flex-col h-72 w-72  bg-gray-200 p-4 border-0 rounded shadow-md">
          <div className="flex flex-row content-center">
            <span className="flex border-0 bg-slate-800 rounded-full w-7 h-7 mr-2 text-white text-lg font-semibold px-2 ">
              A
            </span>
            <span>
              {user.firstname} {user.lastname}
            </span>
          </div>
          <div className="bg-white my-2 h-full flex flex-col">
            <div className="border-0 text-sm bg-orange-200 p-2">
              Registered on {user.create_date_time.substring(0, 10)}
            </div>
            <div className="border-0 p-4 h-32">{user.email}</div>
            <div className=" flex justify-end pr-4 pb-1">
              <button
                className="p-1 text-sm bg-orange-200 border-0 rounded"
                onClick={() => setShowEditModal(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showChangePassModal}
        setIsOpen={handleCloseChangePassModal}
        title="Change Password"
      >
        <div className="p-4">
          <label className="block text-gray-700 text-sm my-2" htmlFor="oldPass">
            Old Password :
          </label>

          <input
            onChange={(e) => setCurrPass(e.target.value)}
            value={currPass}
            className=" flex shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none "
            id="oldPass"
            type="password"
            placeholder="**********"
          />
          <label className="block text-gray-700 text-sm my-2" htmlFor="newPass">
            New Password :
          </label>

          <input
            onChange={(e) => setNewPass(e.target.value)}
            value={newPass}
            className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none "
            id="newPass"
            type="password"
            placeholder="**********"
          />

          <label
            className="block text-gray-700 text-sm my-2"
            htmlFor="confirmNewPass"
          >
            Confirm New Password :
          </label>

          <input
            onChange={(e) => setConfirmNewPass(e.target.value)}
            value={confirmNewPass}
            className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none "
            id="confirmNewPass"
            type="password"
            placeholder="**********"
          />
        </div>
        <div className="flex flex-row-reverse items-center border-t-2 h-12">
          <div
            className="mr-5 px-2 py-1 bg-green-400 text-white rounded font-semibold text-sm cursor-pointer"
            onClick={() => handleChangePassword()}
          >
            Save
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showEditModal}
        setIsOpen={handleCloseEditModal}
        title="Edit Profile"
      >
        <div className="p-4">
          <label className="block text-gray-700 text-sm my-2" htmlFor="fName">
            First Name :
          </label>

          <input
            onChange={(e) => setFirstNameInput(e.target.value)}
            value={firstNameInput}
            className=" flex shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none "
            id="fName"
            type="text"
            placeholder={user.firstname}
          />

          <label className="block text-gray-700 text-sm my-2" htmlFor="oldPass">
            Last Name :
          </label>

          <input
            onChange={(e) => setLastNameInput(e.target.value)}
            value={lastNameInput}
            className=" flex shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none "
            id="lName"
            type="text"
            placeholder={user.lastname}
          />
        </div>
        <div className="flex flex-row-reverse items-center border-t-2 h-12">
          <div
            className="mr-5 px-2 py-1 bg-green-400 text-white rounded font-semibold text-sm cursor-pointer"
            onClick={() => handleEditProfile()}
          >
            Save
          </div>
        </div>
      </Modal>
    </div>
  );
}
