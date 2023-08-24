// MEAL PLAN
import { useState, useEffect } from "react";
import { api } from "../utilities";



  export default function UserMealPlan({palId}) {
      const [palPlan, setPalPlan] = useState([]);


  useEffect(() => {
    const getPalPlan = async () => {
      try {
        const response = await api.get(`meal_plans/pal_plans/${palId}/`);
        if (response.data.length > 0) {
          console.log("response", response.data);
          setPalPlan(response.data[0].days_of_meals);
        }
      } catch (error) {
        console.error(error);
      }
    };
      getPalPlan();
  }, []);


  return (
      <>
    
        <div className="w-[100%]  bg-jet-700/50  rounded-2xl flex flex-row shadow-2xl justify-center items-center">
          {palPlan.map((meal, index) => (
            <div key={index} className=" w-35 h-35 bg-white rounded-full m-2">
              {meal.daily_meal ? (
              <img
              src={`${import.meta.env.VITE_BACKEND_URL}${meal.daily_meal.image}`}
              alt={`Meal Image`}
              className=" rounded-full filter brightness-75 aspect-w-1 aspect-h-1 "
              />
            ): (
              <div className="empty-plate w-35 h-35 rounded-full bg-white"></div>
            )}
            </div>
          ))}
        </div>
    </>
  );
}


