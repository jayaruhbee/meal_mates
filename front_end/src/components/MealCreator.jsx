import ImageCreation from "./Image";
import { useState, useEffect, useRef } from "react";
import { api } from "../utilities";
import { useOutletContext } from "react-router-dom";
import MealSuggester from "./MealSuggester";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import MealPlanCreator from "./MealPlanCreator";
import { Link, scroller } from "react-scroll";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function MealCreator() {
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState(null);
  const [instructions, setInstructions] = useState();
  const [notes, setNotes] = useState();
  const [ingredients, setIngredients] = useState();
  const [suggestion, setSuggestion] = useState(null);
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

  const scrollToMealPlan = () => {
    scroller.scrollTo("mealPlanSection", {
      smooth: true,
      offset: -50,
      duration: 1000,
    });
  };

  return (
    <>
      <div className="flex h-screen relative crimson-font ">
        <img
          src="/display_images/Garlic.png"
          alt="Meal-Prep"
          className=" w-full h-auto filter brightness-75"
        />
        <div className=" absolute inset-0 flex flex-col justify-end mb-[15%] ml-4 p-6 w-[60%]">
          <h1 className="text-5xl crimson-font text-white mb-2">
            Create Meals. Save Time. Inspire Others.
          </h1>
          {/*<Link to='/setmealplan'className="text-gray-400 bg-black/40 text-4xl hover:text-white">Style Your Week </Link> */}
        </div>

        <div className="custom_font flex w-[60%] items-center justify-center bg-gradient-to-r from-gray-700 via-gray-900 to-black ">
          {/* <main className="custom_font flex items-center justify-center h-screen w-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black"> */}
          <form onSubmit={createMeal} className="w-[95%] ">
            <div className="gap-3 p-4 bg-night-700 shadow-2xl rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="m-2 p-2 w-full text-center bg-gray-100 rounded-md"
                  placeholder="Title"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <input
                  className="m-2 p-2 w-full text-center bg-gray-100 rounded-md"
                  placeholder="Instructions"
                  type="text"
                  onChange={(e) => setInstructions(e.target.value)}
                  required
                />
                <input
                  className="m-2 p-2 w-full text-center bg-gray-100 rounded-md"
                  placeholder="Ingredients"
                  type="text"
                  onChange={(e) => setIngredients(e.target.value)}
                />
                <input
                  className="m-2 p-2 w-full text-center bg-gray-100 rounded-md"
                  placeholder="Category"
                  type="text"
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
                <input
                  className="m-2 p-2 w-full text-center bg-gray-100 rounded-md"
                  placeholder="Notes"
                  type="text"
                  onChange={(e) => setNotes(e.target.value)}
                />
                <div className="image ml-2 flex flex-col justify-center">
                  <ImageCreation onImageSelect={(image) => setImage(image)} />
                </div>
              </div>
              <button
                className="create-meal-button bg-gray-900 rounded-md mt-4 p-2 font-bold text-lg text-gray-200 w-full"
                type="submit"
              >
                Create Meal
              </button>
            </div>
          </form>
        </div>
      </div>
      <button
        onClick={scrollToMealPlan}
        className=" text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        <ChevronDownIcon />
        Scroll to Meal Plan
      </button>

      <div id="mealPlanSection">
        <MealPlanCreator />
      </div>
    </>
  );
}

{
  /* <div className="inspo-container fixed right-0 flex flex-col w-[20%] h-[20%]"> */
}
{
  /* <button
    className="inspo-button w-30 h-30 text-gray-200 p-2 rounded-md bg-gray-600/50"
    // onClick={openInspo}
  >
    Need Some Inspo?
  </button> */
}
{
  /* {suggestion && (
    <div className="inspo-details w-full h-full mb-2">
      <MealSuggester clicked={setSuggestion} onClose={closeInspo} />
    </div>
  )} */
}
