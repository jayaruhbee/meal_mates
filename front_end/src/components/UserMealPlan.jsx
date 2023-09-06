// MEAL PLAN
import { useState, useEffect } from "react";
import { api } from "../utilities";
import MealCard from "./MealCard";


export default function UserMealPlan({ palId }) {
  const [palPlan, setPalPlan] = useState([]);
  const [viewMeal, setViewMeal] = useState(null);
  
  useEffect(() => {
    const getPalPlan = async () => {
      try {
        const response = await api.get(`meal_plans/pal_plans/${palId}/`);
        if (response.data.length > 0) {
          // console.log("response", response.data);
          setPalPlan(response.data[0].days_of_meals);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getPalPlan();
  }, []);

  const handleViewMeal = (meal) => {
    setViewMeal(meal)
  }

  
  return (
    
    <div className="">
      <div className="inline-flex bg-white rounded-2xl">
        {palPlan.map((meal, index) => (
          <div key={index} className=" ">
            {meal.daily_meal ? (
              <img
              src={`${import.meta.env.VITE_BACKEND_URL}${
                meal.daily_meal.image
              }`}
              alt={`Meal Image`}
              className="bg-white rounded-full mx-1 w-[75px] h-[75px] p-1"
              onClick={() => handleViewMeal(meal)}
              />
              ) : (
                <div className="empty-plate bg-white mx-1 w-18 h-18 rounded-full"></div>
                )}
          </div>
        ))}
        
      </div>
      {viewMeal && (
        <MealCard meal={viewMeal} onClose={() => setViewMeal(null)} /> 
      )}
    </div>
  );
}
