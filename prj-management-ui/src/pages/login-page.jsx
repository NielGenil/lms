import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LoginAPI } from "../api/api";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [showError, setShowError] = useState(false);
  const [errorShow, setError] = useState(null);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    // Already navigated, optionally return null
    return null;
  }

  const { mutate } = useMutation({
    mutationFn: LoginAPI,
    onSuccess: (data) => {
      Cookies.set("access", data.access, { secure: true, sameSite: "strict" });
      Cookies.set("refresh", data.refresh, {
        secure: true,
        sameSite: "strict",
      });
      navigate("/");
    },
    onError: (error) => {
      setShowError(true);
      console.log(error.detail);
      setError(error.detail);
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = new FormData(formRef.current);
    mutate(loginData);
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-gray-200">
      <form
        ref={formRef}
        onSubmit={handleLogin}
        className=" flex flex-col gap-4 p-4   rounded-md shadow-xl/20
"
      >
        <h1 className="font-semibold">Login</h1>
        <label>Username</label>
        <input name="username" type="text" className="border-1 p-2 text-sm border-gray-500/50 rounded-md" />

        <label>Password</label>
        <input
          name="password"
          type="password"
          className="border-1 p-2 text-sm border-gray-500/50 rounded-md"
        />

        <button type="submit" className="p-2 bg-slate-900 text-white rounded-md hover:bg-slate-700">
          Login
        </button>

        <p>Dont have an account yet? <Link className="text-blue-500" to={"/register"}>Register here.</Link></p>

        {showError && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow">
              <p>{errorShow}</p>
              <button
                onClick={() => setShowError(false)}
                className="mt-2 bg-red-500 p-2 text-white"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </form>
    </main>
  );
}
