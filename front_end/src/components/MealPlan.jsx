import { useState, useEffect, useContext } from "react";
import { api } from "../utilities";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
// MEAL PLAN AKA HOME RN
import MealCard from "./MealCard";

export default function MealPlan() {
  const [mealPlans, setMealPlans] = useState([]);
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);
  const { user } = useContext(userContext);
  const [viewMeal, setViewMeal] = useState(null);
 
  const navigate = useNavigate();

  const handleViewMeal = (meal) => {
    setViewMeal(meal);
  };

  const closeMealDetails = () => {
    setViewMeal(null);
  };

  const handleButtonClick = () => {
    navigate("/setmealplan");
  };
  useEffect(() => {
    const getMealPlan = async () => {
      try {
        const response = await api.get("meal_plans/");
        // console.log("setmealplans: ", response.data[0]["days_of_meals"]);
        const sortedResponse = response.data[0]["days_of_meals"].sort((a,b) => new Date(a.date) - new Date(b.date))
        console.log(sortedResponse)
        setMealPlans(sortedResponse);
        if (response.data.length > 0) {
          setSelectedMealPlan(response.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
      getMealPlan();
    }
  }, [user]);
  console.log("view meal:", viewMeal);
  console.log("selected mealplan:", selectedMealPlan);


  const stringDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };



  return (
    <>
      <main className="flex flex-col poiret-font justify-center items-center min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black">
        <h1 className="poiret-font text-white text-4xl md:text-5xl mb-4 md:mb-6 text-center">
          Make It A Great Week
        </h1>
        <div className="w-full md:w-[60%] bg-jet-700/50 rounded-2xl relative flex flex-col md:flex-row shadow-2xl justify-center items-center">
          {mealPlans.map((meal, index) => (
            <div
              key={index}
              className="w-36 h-36 md:w-[10rem] md:h-[10rem] relative bg-white rounded-full m-2"
              onClick={() => handleViewMeal(meal)}
            >
              {meal.daily_meal ? (
                <>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${
                      meal.daily_meal.image
                    }`}
                    alt={`Meal Image`}
                    className="w-full h-full rounded-full"
                  />
                </>
              ) : (
                <div className="empty-plate w-full h-full flex justify-center items-center rounded-full bg-white">
                  <p className="empty-plate-date text-2xl text-gray-900 text-center">
                    {stringDate(meal.date)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          className="text-white bg-gray-300/30 text-lg md:text-2xl p-2 md:p-3 rounded-sm mt-6 md:mt-10"
          onClick={handleButtonClick}
        >
          Fill My Plates
        </button>
        {viewMeal && viewMeal.daily_meal && (
          <MealCard meal={viewMeal} onClose={closeMealDetails} />
        )}
      </main>
    </>
  );
}
