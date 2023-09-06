import React from "react";
import { api } from "../utilities";
import { useState, useEffect, useContext } from "react";

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
    <div>
      {mealDetails && mealDetails.id && (
        <div
          className="poiret-font fixed rounded-lg w-full sm:w-[80%] md:w-[60%] lg:w-[40%] h-auto pb-2 bg-platinum/90 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <div className="food-data grow shrink basis-0">
            <h1 className="text-gray-200 text-3xl sm:text-4xl lg:text-6xl flex justify-center mb-3 sm:mb-5 lg:mb-7 mt-3 sm:mt-5 lg:mt-7 bg-gray-700 capitalize">
              {mealDetails.title}
            </h1>
            <div className="food-data-text">
              <div>
                {mealDetails.instructions && (
                  <div className="text-gray text-xl sm:text-2xl lg:text-2xl">
                    <p className="underline font-bold text-2xl sm:text-3xl lg:text-3xl">
                      Instructions
                    </p>{" "}
                    {mealDetails.instructions}
                  </div>
                )}
              </div>
              <div>
                {mealDetails.ingredients && (
                  <div className="text-gray text-xl sm:text-2xl lg:text-2xl capitalize">
                    <p className="underline font-bold text-2xl sm:text-3xl lg:text-3xl">
                      Ingredients
                    </p>{" "}
                    {mealDetails.ingredients}
                  </div>
                )}
              </div>
              <div>
                {mealDetails.category && (
                  <div className="text-gray text-xl sm:text-2xl lg:text-2xl capitalize">
                    <p className="underline font-bold text-2xl sm:text-3xl lg:text-3xl">
                      Category
                    </p>{" "}
                    {mealDetails.category}
                  </div>
                )}
              </div>
              <div>
                {mealDetails.notes && (
                  <div className="text-gray text-xl sm:text-2xl lg:text-2xl capitalize">
                    <p className="underline font-bold text-2xl sm:text-3xl lg:text-3xl">
                      Notes
                    </p>
                    {mealDetails.notes}
                  </div>
                )}
              </div>
            </div>
            {/* <div>
              {myImageURL && (
                <img
                  src={myImageURL}
                  alt={`Meal Image`}
                  className="w-20 h-20"
                />
              )}
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
