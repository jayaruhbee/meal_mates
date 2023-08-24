import React, { useState, useEffect } from "react";
import { api } from "../utilities";
import UserMealPlan from "../components/UserMealPlan";
import UserRelationships from "../components/UserRelationships";
import { userContext } from "../App";
import { useContext } from "react";


export default function Users() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(userContext);
  // console.log("user", user)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("squad/get_users/");
        setUsers(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [user]);


  // FILTER OUT USER FROM USER LIST
  const authUser = user
  // console.log("authuser", authUser.id)
  const otherUsers = users.filter((self) => self.id !== authUser.id)

  return (
    <main className="crimson_font flex justify-center items-center w-screen h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <div className="outer-user-container flex-col justify-start items-start w-[60%] h-[80%] p-4 bg-platinum/40 rounded-2xl  gap-1 inline-flex shadow-2xl overflow-y-hidden ">
        <div className="user-header-container w-96 p-2 justify-start items-start gap-2.5 inline-flex">
          <div className="user-title grow shrink basis-0  text-gray-100 text-4xl font-bold capitalize">
            Users
          </div>
        </div>
        {otherUsers.map((user) => (
          <div
            className="self-stretch h-[100%] grow shrink basis-0 px-2 py-2 border-b border-gray-300 justify-start items-center gap-2 mb-1 inline-flex"
            key={user.id}
          >
            {/* <div className="user-avatar-background w-10 h-10 bg-white rounded-3xl shadow justify-center items-center gap-2.5 flex"> */}
            <div className="follow-unfollow">
              <UserRelationships  palId={user.id} />
            </div>
            {/* <img className="user-avatar w-8 h-8" src={"/media/user_images/default.png"}  /> */}
            {/* </div> */}

             <div className="user-data flex flex-row  ">
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex px-2">
                <div className="crimson_font self-stretch h-5 text-white text-base capitalize">
                  {user.first_name} {user.last_name}{" "}
                </div>
               <div className=" email-meal-plan grid grid-cols-2 ">
                  <div className="self-stretch h-7 text-gray-100 text-base font-normal capitalize flex flex-auto items-center content-center">
                    {user.email}
                  </div>
    
                  <div
                  className="flex-grow flex-shrink basis-0 "> <UserMealPlan palId={user.id} /> </div>
               </div>
             </div>

            
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
