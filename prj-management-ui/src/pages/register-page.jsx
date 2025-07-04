import { useMutation } from "@tanstack/react-query";
import { RegisterAPI } from "../api/api";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const registerRef = useRef(null);
  const navigate = useNavigate();
  const { mutate: register } = useMutation({
    mutationFn: RegisterAPI,
    onSuccess: () => {
      console.log("Success!");
      navigate("/login");
    },
  });

  const registerSubmit = (e) => {
    e.preventDefault();
    const registerData = new FormData(registerRef.current);
    register(registerData);
  };
  return (
    <main className="w-screen h-screen flex justify-center items-center bg-gray-200">
      <form
        ref={registerRef}
        onSubmit={registerSubmit}
        className="flex flex-col gap-4 p-4 w-[500px] rounded-md shadow-xl/20
"
      >
        <h1 className="font-semibold">Register</h1>
        <div className="flex flex-wrap place-content-between gap-3">
        <div className="flex flex-col">
          <label>Username</label>
          <input
            name="username"
            type="text"
            className="border-1 p-2 text-sm border-gray-500/50 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label>First Name</label>
          <input
            name="first_name"
            type="text"
            className="border-1 p-2 text-sm border-gray-500/50 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label>Last Name</label>
          <input
            name="last_name"
            type="text"
            className="border-1 p-2 text-sm border-gray-500/50 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            name="email"
            type="text"
            className="border-1 p-2 text-sm border-gray-500/50 rounded-md"
          />
        </div>{" "}
        <div className="flex flex-col">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="border-1 p-2 text-sm border-gray-500/50 rounded-md"
          />
        </div>{" "}
        <div className="flex flex-col">
          <label>Confirm Password</label>
          <input
            name="password_confirm"
            type="password"
            className="border-1 p-2 text-sm border-gray-500/50 rounded-md"
          />
        </div>
        </div>
        <button
          type="submit"
          className="p-2 bg-slate-900 text-white rounded-md hover:bg-slate-700"
        >
          Register
        </button>
        <p>
          Already have an account?{" "}
          <Link className="text-blue-500" to={"/login"}>
            Login here.
          </Link>
        </p>
      </form>
    </main>
  );
}
