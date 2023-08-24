// import { useOutletContext } from "react-router-dom";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userContext } from "../App";

export default function LandingPage() {
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();
  
  const navigateToSignUp = () => {
    navigate("/signup", {replace:true});
  };

  const navigateToSignIn = () => {
    navigate("/signin", {replace:true});
  };

  return (
    <>
      <div className="flex flex-col justify-center w-screen h-screen bg-no-repeat bg-cover bg-[url('../display_images/Meal.jpg')] filter brightness-75">
        <div className="flex flex-row justify-center items-center mt-[175px]">
          <div className="w-full py-6 bg-black/50 ">
            <div className=" custom_font text-center text-white text-6xl font-normal lowercase">
              Plan, Cook, inspire. Dinnertime Made Simple.
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-around mt-[300px]">
          <button
            onClick={navigateToSignUp}
            className="p-2 w-[200px] bg-orange-700 rounded-2xl text-center text-white text-3xl font-normal shadow-2xl"
          >
            start planning
          </button>

          <button
            onClick={navigateToSignIn}
            className="p-2 w-[200px] bg-orange-700 rounded-2xl justify-center items-center gap-2.5 inline-flex text-white text-3xl font-normal shadow-2xl "
          >
            sign in 
          </button>
        </div>
      </div>
    </>
  );
}
