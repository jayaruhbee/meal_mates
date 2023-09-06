import React, { useState, useEffect } from "react";
import { api } from "../utilities";
import UserMealPlan from "../components/UserMealPlan";
import UserRelationships from "../components/UserRelationships";
import { userContext } from "../App";
import { useContext } from "react";

export default function Users() {
  const { user } = useContext(userContext);
  const [users, setUsers] = useState([]);
  const [followedUserIds, setFollowedUserIds] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 768);
  };

  //*GET ALL USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("squad/get_users/");
        if(user) {
          const otherUsers = response.data.filter((pal) => pal.id !== user?.id);
          setUsers(otherUsers);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [user]);

 
  useEffect(() => {
    const checkFollowed = async () => {
      try {
        const response = await api.get("squad/all_followed/");
        console.log("response:", response.data)
        setFollowedUserIds(response.data);
      } catch (error) {
        console.error(error);
      }
    };
      checkFollowed();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
console.log("user", user)
  return (
    <main className="poiret-font flex justify-center items-center w-screen h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black flex-col  px-5 py-9 bg-slate-700 rounded-2xl  gap-1 shadow-2xl overflow-y-scroll">
      <div className="outer-user-container flex-col justify-start items-start w-[65%] h-[80%] p-4 bg-slate-700 rounded-2xl  gap-1 inline-flex shadow-2xl overflow-scroll no-scrollbar">
        <div className="user-header-container w-96 p-6 gap-2.5 ">
          <div className="user-title grow shrink basis-0  text-gray-100 text-4xl font-bold capitalize">
            Pals
          </div>
        </div>
        
        {users.map((user) => (
          <div
            className="self-stretch h-[100%]  px-2 py-2 border-b border-gray-300 items-center gap-2 mb-1 inline-flex"
            key={user.id}
          >
            <div className="follow-unfollow">
              <UserRelationships palId={user.id} />
            </div>

            <div className="user-data flex flex-row">
              <div className=" flex-col justify-start inline-flex">
                <div className="email-meal-plan grid grid-cols-9">
                  <div className="user-text flex flex-col col-span-2">
                    <div className="user-name lato-font text-white capitalize text-xl">
                      {user.first_name} {user.last_name}
                    </div>
                    <div className="user-email lato-font self-stretch h-7 text-gray-400 font-normal capitalize">
                      {user.email}
                    </div>
                  </div>
                  <div className={`col-start-4 col-span-5 pl-8 ${isSmallScreen ? 'hidden' : ''}`}>
                    {followedUserIds.includes(user.id) && (
                      <UserMealPlan palId={user.id}  />
                   )} 
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
    </main>
  );
}
