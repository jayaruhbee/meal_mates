// import { useOutletContext } from "react-router-dom";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userContext } from "../App";

export default function LandingPage() {
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/signup", { replace: true });
  };

  const navigateToSignIn = () => {
    navigate("/signin", { replace: true });
  };

  return (
    <>
      <div className="flex flex-col justify-center poiret-font w-screen h-screen bg-no-repeat bg-cover bg-[url('../display_images/Bowl.png')] ">
        <div className="flex flex-row justify-center items-center mt-[350px]">
          <div className="w-full py-6 bg-black/80 ">
            <div className="text-center text-white text-7xl font-normal lowercase">
              Plan, Cook, inspire. Dinnertime Made Simple.
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-evenly mt-[300px]">
          <button
            onClick={navigateToSignUp}
            className="px-2 pb-2 w-[300px] bg-amber-500 rounded-md  text-white text-4xl font-normal shadow-2xl"
          >
            start planning
          </button>

          <button
            onClick={navigateToSignIn}
            className="px-2 pb-2 w-[300px] bg-amber-500 rounded-md  text-white text-4xl font-normal shadow-2xl"
          >
            sign in
          </button>
        </div>
      </div>
    </>
  );
}
