import { useAuth } from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function App() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [checkedAuth, setCheckedAuth] = useState(false);


;

  // const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setCheckedAuth(true);
    }
  }, []);

  // if (!checkedAuth) {
  //   return null; // Optionally show loader here
  // }

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };







  return (
    <main className="w-screen h-screen flex">
      {/* sidebar */}
      <section className="flex flex-col max-w-[250px] text-white bg-slate-950">
        <div className="bg-white">
          <img
            src="https://southerncalibration.com/image/logo.png"
            alt="logo"
          />
        </div>

        <div className="flex flex-col flex-1 gap-2 p-6 overflow-y-auto">
          <a href="">Dashbord</a>
          <a href="">Dashbord</a>
          <a href="">Dashbord</a>
        </div>

        <div className="p-6">
          <div className="flex h-[20px] border-t-1">
            <a className="pt-1" href="#" onClick={handleLogout}>
              Logout
            </a>
          </div>
        </div>
      </section>

      {/* main content */}
      <section className="flex flex-1">


    
      </section>

  

   
    </main>
  );
}

export default App;
