import { useState, useEffect } from "react";
import { api } from "../utilities";

export default function UserRelationships({ palId }) {
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const checkFollowed = async () => {
      const response = await api.get("squad/all_followed/");
      response.data.forEach((user) => { if (user.following.id === palId) { setFollowed(true)}})
      // console.log(response.data);
  
    };checkFollowed()
  }, 
  [followed]);

  const followPal = async () => {
    try {
      const response = await api.post(`squad/follow/${palId}/`);
      // console.log(response);
      setFollowed(true);
    } catch (error) {
      console.log(error);
    }
  };

  const unfollowPal = async () => {
    try {
      const response = await api.delete(`squad/unfollow/${palId}/`);
      // console.log(response);
      setFollowed(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {followed ? (
        <button
          onClick={unfollowPal}
          className="lato-font w-20 text-gray-300 bg-gradient-to-br from-jet-500 to-platinum-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-jet-200 dark:focus:ring-jet-800 font-semibold  rounded-lg text-md px-2.5 py-2.5 text-center mr-2 mb-2"
        >
          Unfollow
        </button>
      ) : (
        <button
          onClick={followPal}
          className="lato-font text-white w-20 bg-gradient-to-br from-jet-500 to-platinum-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-jet-200 dark:focus:ring-jet-800 font-semibold rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2"
        >
          Follow
        </button>
      )}
    </>
  );
}
