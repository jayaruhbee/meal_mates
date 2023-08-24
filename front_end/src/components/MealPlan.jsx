import { useState, useEffect, useContext } from "react";
import { api } from "../utilities";
import { userContext } from "../App";
// MEAL PLAN AKA HOME RN
import MealCard from "./MealCard";

export default function MealPlan() {
  const [mealPlans, setMealPlans] = useState([]);
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);
  const { user } = useContext(userContext);
  const [viewMeal, setViewMeal] = useState(null);
  const [emptyPlate, setEmptyPlate] = useState(false);
  const [planId, setPlanId] = useState("");

  const handleViewMeal = (meal) => {
    setViewMeal(meal);
  };

  const closeMealDetails = () => {
    setViewMeal(null);
  };

  useEffect(() => {
    const getMealPlan = async () => {
      try {
        const response = await api.get("meal_plans/");
        setMealPlans(response.data);
        console.log("setmealplans: ", response.data);
        if (response.data.length > 0) {
          setSelectedMealPlan(response.data[0]);
          setPlanId(response.data[0].id);
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
  const removeMealFromPlate = async () => {
    try {
      const response = await api.delete(
        `meals/delete_meal/${planId}/${viewMeal.id}/`
      );

      console.log(response.data);
      setEmptyPlate(true);
    } catch (error) {
      console.error(error);
    }
  };
  // const currentPlan = mealPlan.id
  // console.log("current plan:", currentPlan)

  const stringDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <main className="main flex flex-col justify-center h-screen items-center">
       <div className="meal-plans-options-container crimson_font text-white fixed top-[15%] left-5 flex flex-col">
          <header className="meal-plan-options-header"> Meal Plans</header>
          <div className="meal-plans">
            {mealPlans.map((plan) => (
              <div
                key={plan.id}
                className={`text-white  hover:text-black bg-gray-300 meal-plan ${
                  plan === selectedMealPlan ? "selected" : ""
                }`}
                onClick={() => setSelectedMealPlan(plan)}
              >
                {plan.days_of_meals.id}
                {`Week of ${stringDate(plan.days_of_meals[0].date)}`}
              </div>
            ))}
          </div>
       </div>
        
{selectedMealPlan && (
        <div className="w-[60%] h-[20%] bg-jet-700/50 rounded-2xl relative flex flex-row shadow-2xl justify-center items-center ">
          {selectedMealPlan.days_of_meals.map((meal, index) => (
            <div
              key={index}
              className="w-[14%] aspect-w-1 aspect-h-1 relative bg-white rounded-full m-2"
              onClick={() => handleViewMeal(meal)}
            >
              {meal.daily_meal ? (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${
                    meal.daily_meal.image
                  }`}
                  alt={`Meal Image`}
                  className="w-[100%] h-[100%] rounded-full filter brightness-75"
                  // onClose={closeMeal}
                />
              ) : (
                <div className="empty-plate w-0 h-10 rounded-full bg-white"></div>
              )}
            </div>
          ))}
        </div>
)}
         {viewMeal && <MealCard meal={viewMeal} onClose={closeMealDetails} />}
        <button
          className="text-white crimson_font bg-gunmetal text-2xl p-3 rounded-md mt-40 "
          onClick={() => removeMealFromPlate(planId, viewMeal.id)}
        >
          Empty Plate
        </button>
 

      </main>
    </>
  );
}

/*
    // return (
    //   <>
    //     <main className="flex flex-col justify-center h-screen items-center bg-gradient-to-r from-gray-700 via-gray-900 to-black">
    //       <div className="w-[60%] h-[20%] bg-jet-700/50 rounded-2xl relative flex flex-row shadow-2xl justify-center items-center">
    //         {mealPlan.map((meal, index) => (
    //           <div
    //             key={index}
    //             className="w-[14%] aspect-w-1 aspect-h-1 relative bg-white rounded-full m-2"
    //             onClick={ () => handleViewMeal(meal)}
    //           >
    //           {meal.daily_meal ? ( 
  
    //             <img
    //             src={`${import.meta.env.VITE_BACKEND_URL}${meal.daily_meal.image}`}
    //             alt={`Meal Image`}
    //             className="w-[100%] h-[100%] rounded-full filter brightness-75"
    //             // onClose={closeMeal}
    //             /> 
                
                
    //             ) :(
    //         <div className="empty-plate w-10 h-10 rounded-full bg-white"></div>
  
    //               )}
    //               </div>
    //               ))}
    //             </div>
    //           {viewMeal &&  (
    //             <MealCard meal={viewMeal}  onClose={closeMealDetails}/>
                
    //              )}
    //               <button 
    //               className="text-white bg-gray-300/30 text-2xl p-3 rounded-sm mt-40 "
    //               onClick={()=> removeMealFromPlate(planId, viewMeal.id)}>Empty Plate</button>
    //               </main>
      
    //   </>
    // );
  // }
  */
