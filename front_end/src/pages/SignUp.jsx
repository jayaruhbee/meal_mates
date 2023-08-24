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
      
      // first_name: document.getElementById("first_name").value,
      // last_name: document.getElementById("last_name").value,
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
    // navigate("/signin");
  };
  return (
    <form onSubmit={signUp}>
      <main className="relative flex flex-col justify-center items-center w-screen h-screen bg-no-repeat bg-cover bg-[url('../display_images/signin.png')]">
        <h5 className="custom_font text-center text-white text-9xl font-normal absolute top-10">
          Welcome To Plate Pals
        </h5>
        <div className="flex flex-col julius-font justify-center pt-3 items-center w-[30%] h-[30%] bg-black/40 relative ">
          <div className="flex flex-col justify-center items-center w-[60%] h-[48%] bg-white/50">
            
              <input
                className=" py-1 w-[90%] h-[17%]  bg-black/40 rounded-2xl m-1 text-white text-xl text-center font-normal lowercase"
                type="text"
                id = "first_name"
                placeholder="First Name"
                // value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
          

            <input
              className="py-1 w-[90%] h-[17%] bg-black/40 rounded-2xl m-1 text-white text-xl text-center font-normal lowercase"
              type="text"
              id = "last_name"
              placeholder="Last Name"
              // value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <input
              className="py-1 w-[90%] h-[17%] bg-black/40 rounded-2xl m-1 text-white text-xl text-center font-normal lowercase"
              id="email"
              type="email"
              placeholder="email"
              // value={userName}
              // onChange={(e) => setUserName(e.target.value)}
            />

            <input
              className="py-1 w-[90%] h-[17%] bg-black/40 rounded-2xl m-1 text-white text-xl text-center font-normal lowercase"
              id="password"
              type="password"
              placeholder="Password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-[60%] h-7 mt-3 bg-black/40 rounded-2xl text-white text-xl text-center font-normal lowercase"
            type="submit"
          >
            Register
          </button>
        </div>
        <div
          onClick={navigateToSignIn}
          className="julius-font w-60 h-7 mt-3 bg-black/40 rounded-xl text-white text-xl text-center lowercase"
        >
          already have an account?
        </div>
      </main>
    </form>
  );
}
