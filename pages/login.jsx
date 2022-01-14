import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import cookie from "js-cookie";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { login, user, error } = useContext(AuthContext);

  useEffect(() => error && alert(error));

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ email, password });
  };

  return (
    <div className="w-full max-w-[28rem] m-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 h-[28rem] w-[28rem] shadow-md rounded p-12 pb-8 mb-4"
      >
        <div className="titleHolder flex w-full text-3xl font-semibold mb-10">
          Login
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none "
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>

        <div className="flex flex-row-reverse  items-center justify-between pt-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign In
          </button>

          <label className="text-gray-500" htmlFor="remember">
            <input className="mx-1" type="checkbox" id="remember" />
            <span className="text-sm">remember me</span>
          </label>
        </div>
      </form>
      <div className=" text-center w-full font-semibold text-blue-800">
        <Link href="/register">Create a New Account</Link>
      </div>
    </div>
  );
}
