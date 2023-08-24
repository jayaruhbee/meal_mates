import { api } from "../utilities";
import { useState, useEffect } from "react";

export default function MealSuggester({ clicked }) {
  const [suggestion, setSuggestion] = useState([]);

  const apiKey = "a8f829bcd6ba403b8d573e72afca2248";
  //   const tags = "vegetarian"
  //   const diets = "vegetarian"
  const mealtypes = "soup";
  // ALSO SOUP, SALAD

  const getSuggestion = async () => {
    try {
      const response = await api.get(
      //   `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1&type=${mealtypes}`
      // );
        `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1&tags=${mealtypes}`
      );
      // const response = await api.get("https://api.spoonacular.com/recipes/random")
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
    <main className="suggestion-background crimson_font rounded-lg w-[100%] h-[100%] bg-platinum/80 flex flex-row items-center justify-center">
     <div className="inspo-title-details bg-jet-200/50 rounded-lg">
        {suggestion.length > 0 && (
          <div className="crimson_font text-white text-xl pb-2 w-[40%] h-[80%]">
            {suggestion[0].title}
          </div>
        )}
     </div>

     <div className="inspo-image">
        {suggestion.length > 0 && (
          <img
            src={suggestion[0].image}
            className="w-[60%] h-[80%] filter brightness-75 rounded-md mr-2 ml-2"
            alt={suggestion[0].title}
          />
          )}
     </div>
    </main>
  );
}
