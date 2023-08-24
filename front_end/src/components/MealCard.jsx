import React from "react";
import { api } from "../utilities";
import { useState, useEffect, useContext } from "react";
import { userContext } from "../App";

export default function MealCard({ meal, onClose }) {
  const [mealDetails, setMealDetails] = useState([]);
  const myImageURL = `${import.meta.env.VITE_BACKEND_URL}${mealDetails.image}`;

  useEffect(() => {
    const getMealDetails = async () => {
      try {
        if (meal.daily_meal) {
          const response = await api.get(`meals/meal/${meal.daily_meal.id}/`);
          console.log(response);
          setMealDetails(response.data);
        }
        // }
      } catch (error) {
        console.error(error);
      }
    };
    getMealDetails();
  }, [meal.id]);

  return (
    <>
      <div
        className="crimson_font fixed rounded-lg w-[20%] h-[30%] bg-platinum/80 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div className="food-data  grow shrink basis-0">
          <h1 className="text-gray text-6xl">Meal Details:</h1>
          <h2 className="text-gray text-xl">Meal Name: {mealDetails.title}</h2>
          <div className="text-gray text-xl">
            Instructions: {mealDetails.instructions}
          </div>
          <div className="text-gray text-xl">
            Ingredients: {mealDetails.ingredients}
          </div>
          <div className="text-gray text-xl">
            Catgegory: {mealDetails.category}
          </div>
          <div className="text-gray text-xl">Notes: {mealDetails.notes}</div>
          {/* {meals.imageURL && ( */}
          <img src={myImageURL} alt={`Meal Image`} className="w-20 h-20" />
        </div>
        {/* <button className="text-gray-200" onClick={onClose}>
          Close
        </button> */}
        {/* )} */}
      </div>
    </>
  );
}
