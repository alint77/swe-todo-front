import { useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import AuthContext from '../context/AuthContext';


export default function login() {

  const [fName,setFName] = useState('');
  const [lName,setLName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [rePassword,setRePassword] = useState('');
  const{register,error}=useContext(AuthContext)

  const router = useRouter()

  useEffect( ()=> error && alert(error))

  const handleSubmit =   e => {
    e.preventDefault();

    

    const user={
        fName,
        lName,
        email,
        password,
        rePassword
    }
    register(user)


  }

  

  return (
    <div className="w-full max-w-[28rem] m-auto">

      <form onSubmit={handleSubmit} className="bg-gray-100 w-[28rem] shadow-md rounded p-12 pb-8 mb-4">
        <div className="titleHolder flex w-full text-3xl font-semibold mb-10">
          Register
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="fName">
            First Name
          </label>
          <input onChange={e=>setFName(e.target.value)} value={fName} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " id="fName" type="fName" placeholder="First Name" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="lName">
            Last Name
          </label>
          <input onChange={e=>setLName(e.target.value)} value={lName} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " id="lName" type="lName" placeholder="Last Name" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
            Email
          </label>
          <input onChange={e=>setEmail(e.target.value)} value={email} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " id="email" type="email" placeholder="Email" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
            Password
          </label>
          <input onChange={e=>setPassword(e.target.value)} value={password} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none " id="password" type="password" placeholder="******************" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="rePassword">
            Repeat Password
          </label>
          <input onChange={e=>setRePassword(e.target.value)} value={rePassword} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none " id="rePassword" type="password" placeholder="******************" />
        </div>

        <div className="flex flex-row-reverse items-center justify-between pt-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign Up
          </button>

          

          
        </div>
      </form>
      <div className=' text-center w-full font-semibold text-blue-800'>
          <Link href='/login'>Login</Link>
      </div>

    </div>
  )
}