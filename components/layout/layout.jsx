import Link from "next/link"
import { useContext } from "react"
import AuthContext from "../../context/AuthContext"
import {useRouter} from "next/router"

export default function layout(props) {

    const {logout,user}=useContext(AuthContext)
    const router=useRouter()




    let menuItem = "menuItem flex flex-row items-center h-10 border-0 rounded-lg my-1 leading-10 pl-3"
    let menuItemActive = "menuItem flex flex-row items-center h-10 border-0 rounded-lg my-1 leading-10 pl-3 bg-blue-800"

    





    return (
        <div className="flex flex-row w-full h-screen ">
            <div className="flex flex-col  bg-blue-700 h-full w-[320px]  p-3 ">
                <div className="logoHolder flex flex-row  mt-8">
                    <div className="logo w-8 flex items-center pl-1">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="white">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex-col px-2">
                        <div className=" font-semibold text-xl text-white">To-Do Planner</div>
                        <div className=" font-semibold text-xs text-[lightgray]">Manage Your Boards</div>
                    </div>
                </div>
                <div className="menuHolder flex flex-col  h-2/3 mt-12">
                    <div className="menuTitle text-[#f5f5f59a] font-semibold text-center pt-4">Menu</div>
                    <div className="menuItems text-white font-semibold p-2">
                        <div className={router.pathname=='/boards' ? menuItemActive : menuItem}>
                            <div className="mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </div>
                            <Link href='/boards'>Boards</Link>
                        </div>
                        <div className={router.pathname=='/friends' ? menuItemActive : menuItem}>
                            <div className="mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                </svg>
                            </div>
                            <Link href='/friends'>Friends</Link>
                        </div>
                        <div className={router.pathname=='/profile' ? menuItemActive : menuItem}>
                            <div className="mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <Link href='/profile'>My Profile</Link>
                        </div>
                    </div>

                    {user ? <div className="flex flex-col border-0 rounded-lg text-white bg-blue-800 font-semibold text-sm mt-36 h-8 w-3/4 mx-auto">
                        <div className="m-auto cursor-pointer" onClick={e=>logout()}>Sign Out</div>
                    </div>: null
                    }
                    
                    
                </div>
            </div>
            <div className=" border-2 flex  w-screen overflow-scroll">
                {props.children}

            </div>


        </div>
    )
};



