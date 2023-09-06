// TALK WITH THE API
import { api } from "../utilities.jsx";
import { userContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

export default function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigateToSignIn = () => {
    navigate("/signin", { replace: true });
  };

  // UPDATE USER DATA
  const { setUser } = useContext(userContext);

  const signUp = async (e) => {
    //PREVENT FORM SUBMISSION
    e.preventDefault();
    let response = await api.post("/users/signup/", {

      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      first_name: firstName,
      last_name: lastName
    });
    console.log(response)
    // GET USERNAME AND AUTH TOKEN FROM THE RESPONSE
    let user = response.data.user;
    let token = response.data.token;
    // CURRENTLY STORING TOKEN IN LOCAL STORAGE
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    setUser(user);
    navigateToSignIn()

  };
  return (
    <form onSubmit={signUp}>
      <main className="relative flex flex-col justify-center items-center w-screen h-screen bg-no-repeat bg-cover bg-[url('../display_images/Bread.png')]">
        <h5 className="absolute top-10 text-5xl font-bold text-center text-white poiret-font">
          Welcome To Plate Pals
        </h5>
        <div className="relative flex flex-col items-center justify-center w-[90%] md:w-[30%] h-[50%] p-6 bg-black/90 rounded-xl shadow-lg lato-font">
          <input
            className="w-full py-2 text-xl text-gray-300 text-center font-normal bg-transparent border-b-2 border-gray-400 mb-4 focus:outline-none placeholder-gray-400"
            type="text"
            id="first_name"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
  
          <input
            className="w-full py-2 text-xl text-gray-300 text-center font-normal bg-transparent border-b-2 border-gray-400 mb-4 focus:outline-none placeholder-gray-400"
            type="text"
            id="last_name"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
  
          <input
            className="w-full py-2 text-xl text-gray-300 text-center font-normal bg-transparent border-b-2 border-gray-400 mb-4 focus:outline-none placeholder-gray-400"
            id="email"
            type="email"
            placeholder="Email"
          />
  
          <input
            className="w-full py-2 text-xl text-gray-300 text-center font-normal bg-transparent border-b-2 border-gray-400 mb-4 focus:outline-none placeholder-gray-400"
            id="password"
            type="password"
            placeholder="Password"
          />
  
          <button
            className="w-full h-12 mt-4 text-xl font-bold text-white text-center bg-slate-500 rounded-xl hover:bg-gunmetal transition-all duration-300 focus:outline-none"
            type="submit"
          >
            Register
          </button>
          <div
            onClick={navigateToSignIn}
            className="w-full mt-4 text-xl text-gray-300 text-center cursor-pointer hover:underline lato-font"
          >
            Already Have an Account?
          </div>
        </div>
      </main>
    </form>
  );
  
}