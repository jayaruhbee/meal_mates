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
      <main className="relative flex flex-col justify-center items-center w-screen h-screen bg-no-repeat bg-cover bg-[url('../display_images/signin.png')]">
        <h5 className="custom_font text-center text-white text-9xl font-normal absolute top-10">Welcome Back</h5>
        <div className="flex flex-col julius-font justify-center pt-3 items-center w-[30%] h-[30%] bg-black/40 relative ">
          <div className="flex flex-col justify-center items-center w-[60%] h-[48%] bg-white/50">
            <input
              className="w-60 h-7  bg-black/40 rounded-2xl m-3 text-white text-xl text-center font-normal lowercase"
              id="email"
              type="email"
              placeholder="email"
            />
            <input
              className="w-60 h-7  bg-black/40 rounded-2xl text-white text-xl text-center font-normal lowercase"
              id="password"
              type="password"
              placeholder="password"
            />
          </div>
          <input
            className="w-[60%]  h-7 mt-3 bg-black/40 rounded-2xl text-white text-xl text-center font-normal lowercase"
            type="submit"
          />
        </div>
        <div onClick={navigateToSignUp} className="julius-font w-60 h-7 mt-3 bg-black/40 rounded-2xl text-white text-xl text-center font-normal lowercase">Need an Account?</div>
      </main>
    </form>
  );
}
