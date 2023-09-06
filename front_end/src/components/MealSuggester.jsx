import { api } from "../utilities";
import { useState, useEffect } from "react";

export default function MealSuggester({ clicked, onClose }) {
  const [suggestion, setSuggestion] = useState([]);

  const apiKey = "a8f829bcd6ba403b8d573e72afca2248";


  const getSuggestion = async () => {
    try {
      console.log("true")
      const response = await api.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1&tags=main%20course`
      );
      setSuggestion(response.data.recipes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (clicked) {
      getSuggestion();
    }
  }, []);

  return (
    <main onClick={onClose} className="suggestion-background poiret-font rounded-lg w-[300px] h-[300px] bg-platinum-900  mr-5 flex flex-col items-center  shadow-lg">
     <div className="inspo-image">
        {suggestion.length > 0 && (
          <img
          src={suggestion[0].image}
          className="w-fit h-[100%]"
          alt="suggested-meal"
          />
          )}
     </div>
     <div className="inspo-title-details ">
        {suggestion.length > 0 && (
          <div className="poiret-font pt-6 text-gunmetal underline text-2xl w-fit ">
            {suggestion[0].title}
          </div>
        )}
     </div>

    </main>
  );
}
