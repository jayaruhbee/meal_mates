import { useState, useEffect, useRef } from "react";
import NavbarDefault from "./pages/NavBarComponent";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { createContext } from "react";
import { api } from "./utilities.jsx";

export const userContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const lastVisited = useRef();

  // *WHO AM I
  const whoAmI = async () => {
    // Check if a token is stored in the localStorage
    let token = localStorage.getItem("token");
    if (token) {
      // If the token exists, set it in the API headers for authentication
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      // Fetch the user data from the server using the API
      let response = await api.get("users/");
      // console.log(response.data)
      // Check if the response contains the user data (email field exists)
      if (response.data.user) {
        // Set the user data in the context or state (assuming `setUser` is a state update function)
        setUser(response.data.user);
        // If the user is authenticated and there is a stored lastVisited page,
        // navigate to the lastVisited page; otherwise, navigate to the default homepage "/home"
        if (lastVisited.current) {
          navigate(lastVisited.current);
        } else {
          navigate("/home");
        }
      } else {
        navigate("/signin");
      }
    }
  };
  useEffect(() => {
    whoAmI();
  }, []);

  useEffect(() => {
    if (!user) {
      // If the user is not authenticated, update the lastVisited ref with the current location pathname
      lastVisited.current = location.pathname;
    }
  }, [location]);
  //* TO ENSURE USER IS BEING SET PROPERLY
 

  return (
    <>
      <userContext.Provider value={{ user, setUser }}>
        <NavbarDefault />
        <Outlet context={{user}}/>
      </userContext.Provider>
    </>
  );
}
