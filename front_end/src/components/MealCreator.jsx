import ImageCreation from "./Image";
import { useState, useEffect, useRef } from "react";
import { api } from "../utilities";
import { useOutletContext } from "react-router-dom";
import MealSuggester from "./MealSuggester";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import MealPlanCreator from "./MealPlanCreator";
// import { Link, scroller } from "react-scroll";

// import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function MealCreator() {
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState(null);
  const [instructions, setInstructions] = useState();
  const [notes, setNotes] = useState();
  const [ingredients, setIngredients] = useState();
  const [suggestion, setSuggestion] = useState(null);
  // const [viewSuggestion, setViewSuggestion] = useState(false)

  const navigate = useNavigate();

  // CREATE MEAL IF FORM SUBMITTED
  const createMeal = async (e) => {
    e.preventDefault();
    // NEW FORMDATA INSTANCE --WORKING W IMAGE
    const meal = new FormData();
    meal.append("title", title);
    meal.append("image", image);
    // meal.append("image_url", imageURL);
    meal.append("category", category);
    meal.append("instructions", instructions);
    meal.append("ingredients", ingredients);
    meal.append("notes", notes);

    try {
      const response = await api.post("meals/create_meal/", meal, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        navigate("/setmealplan");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const closeInspo = () => {
    setSuggestion(null);
  };
  return (
    <>
      <div className="flex h-screen overflow-y-hidden">
      <div className="">
  <img
    src="/display_images/Garlic.png"
    alt="Meal-Prep"
    className="w-full hidden sm:block overflow-y-hidden"
  />
  <h1 className="hidden sm:block absolute bottom-2 left-2 text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white poiret-font">
    Create Meals. Save Time. Inspire Others.
  </h1>
</div>

  
        <div className="creation-right-side lato-font sm:w-[50%] md:w-[60%] lg:w-[70%] bg-gradient-to-r from-gray-700 via-gray-900 to-black">
          <div className="creator-and-suggestion-container grid grid-rows-6 justify-center h-full">
            <div className="inspo-details-and-button fixed right-0">
              {suggestion && (
                <div>
                  <MealSuggester clicked={setSuggestion} onClose={closeInspo} />
                </div>
              )}
              <button
                className="p-1 m-4 bg-gray-200 rounded-md w-[fit-content] inspo-button shadow-lg shadow-black-800"
                onClick={() => setSuggestion(true)}
              >
                Need Some Inspo?
              </button>
            </div>
  
            <form
              onSubmit={createMeal}
              className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] h-auto ml-24 mb-28 row-start-3"
            >
              <div className="create-meal-container gap-3 p-4 rounded-lg shadow-2xl w-[80%]  bg-night-700">
              <input
                    className="w-full p-2 m-2 text-center bg-gray-100 rounded-md"
                    placeholder="Title"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <input
                    className="w-full p-2 m-2 text-center  bg-gray-100 rounded-md grow"
                    placeholder="Instructions"
                    type="text"
                    onChange={(e) => setInstructions(e.target.value)}
                    required
                  />
                  <input
                    className="w-full p-2 m-2 text-center bg-gray-100 rounded-md"
                    placeholder="Ingredients"
                    type="text"
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                  <input
                    className="w-full p-2 m-2 text-center bg-gray-100 rounded-md"
                    placeholder="Category"
                    type="text"
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                  <input
                    className="w-full p-2 m-2 text-center bg-gray-100 rounded-md"
                    placeholder="Notes"
                    type="text"
                    onChange={(e) => setNotes(e.target.value)}
                  />                <div className="flex flex-col justify-center ml-2 image">
                  <ImageCreation onImageSelect={(image) => setImage(image)} />
                </div>
                <button
                  className="w-full p-2 mt-4 text-lg font-bold text-gray-200 bg-gray-900 rounded-md create-meal-button"
                  type="submit"
                >
                  Create Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
              }  
