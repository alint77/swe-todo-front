import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import Link from "next/link"

export default function profile(props) {


    const {user,error}=useContext(AuthContext)   
    
    


    
    if(!user) return(
        <div className="flex flex-col  w-3/4  mx-auto mt-24 h-[36rem]">
            
                please login: <Link href='/login'>login</Link>
            
        </div>
    )
    return (

         
        <div className="flex flex-col  w-3/4  mx-auto mt-24 h-[36rem]">
            <div className="flex flex-row justify-between border-b-2 p-2">
                <div className=" font-semibold text-lg">My Profile</div>
                <div className="">
                    <button className="bg-black text-white border-0 rounded-sm p-1 px-2 text-sm" onClick={e=>handleChangePass()}>Change Password</button>
                </div>
            </div>
            <div className="flex flex-col  h-full p-3 pt-8 ">
                <div className="flex flex-col h-72 w-72  bg-gray-200 p-4 border-0 rounded shadow-md">
                    <div className="flex flex-row content-center">
                        <span className="flex border-0 bg-slate-800 rounded-full w-7 h-7 mr-2 text-white text-lg font-semibold px-2 ">A</span>
                        <span>{user.firstname} {user.lastname}</span>
                    </div>
                    <div className="bg-white my-2 h-full flex flex-col">
                        <div className="border-0 text-sm bg-orange-100 p-2 ">
                            Registered on {user.create_date_time.substring(0,10)}
                        </div>
                        <div className="border-0 p-4 h-32">
                            {user.email}
                        </div>
                        <div className=" flex justify-end pr-4 pb-1">
                            <button className="p-2 bg-orange-100 border-0 rounded-sm">Edit Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

