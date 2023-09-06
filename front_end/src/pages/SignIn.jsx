import { useState, useContext } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { api } from "../utilities";

export default function SignIn() {
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

 
    const navigateToSignUp = () => {
      navigate("/signup");
    };

  const SignIn = async (e) => {
    e.preventDefault();
    let response = await api
      .post("users/signin/", {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      })
      .catch((err) => {
        alert("Incorrect credentials");
      });
      console.log(response)
    let user = response.data.user;
    let token = response.data.token;
    setUser(user);
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    navigate("/home");
  };
  return (
    <form onSubmit={SignIn}>
      <main className="relative flex flex-col justify-center items-center w-screen h-screen bg-no-repeat bg-cover bg-[url('../display_images/Bread.png')]">
        <h5 className="absolute top-10 text-5xl font-bold text-center text-white poiret-font">
          Welcome Back
        </h5>
        <div className="relative flex flex-col items-center justify-center w-[90%] md:w-[30%] h-[50%] p-6 bg-black/90 rounded-xl shadow-lg lato-font">
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
            Sign In
          </button>
          <div
            onClick={navigateToSignUp}
            className="w-full mt-4 text-xl text-gray-300 text-center cursor-pointer hover:underline lato-font"
          >
            Need an Account?
          </div>
        </div>
      </main>
    </form>
  );
  
}
