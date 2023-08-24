import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { api } from "../utilities";
import { userContext } from "../App";
import MealCard from "./MealCard";

// Helper function to format date
const stringDate = (dateString) => {
  const options = { month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const MealPlanCreator = () => {
  const { user } = useContext(userContext);
  const [meals, setMeals] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);
  const [emptyPlate, setEmptyPlate] = useState(false);
  const [viewMeal, setViewMeal] = useState(null);
  const [planId, setPlanId] = useState("");

  const createMealPlan = async () => {
    try {
      const response = await api.post("meal_plans/create_plan/");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getMeals = async () => {
      try {
        const response = await api.get("/meals/");
        setMeals(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getMeals();
  }, []);

  useEffect(() => {
    const getMealPlan = async () => {
      try {
        const response = await api.get("meal_plans/");
        setMealPlans(response.data);
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

  // useEffect(() => {
  const removeMealFromPlate = async () => {
    try {
      const response = await api.delete(
        `meals/delete_meal/${selectedMealPlan.id}/${viewMeal.id}`
      );
      console.log(response.data);
      setEmptyPlate(true);
    } catch (error) {
      console.error(error);
    }
  };
  // },[emptyPlate])

  const handleViewMeal = (meal) => {
    setViewMeal(meal);
  };

  const closeMealDetails = () => {
    setViewMeal(null);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const draggedMeals = Array.from(meals);
    const [reorderedDraggedMeals] = draggedMeals.splice(result.source.index, 1);
    draggedMeals.splice(result.destination.index, 0, reorderedDraggedMeals);
    setMeals(draggedMeals);
  };
  // console.log("viewMeal:", viewMeal.daily_meal.id)
  // console.log("selectedMealPlan:", selectedMealPlan.id)

  return (
    <>
      <div className="w-screen h-screen page crimson_font">
        <div className="meal-plans-selections-container w-[10%] h-[10%] flex flex-col bg-gray-500 items-center mt-5 ml-2 rounded-lg">
          <div className="text-2xl font-bold text-black underline meal-plans-selections-header">
            Your Meal Plans
          </div>
          <ul className="text-white list-disc meal-plans-selections">
            {mealPlans.map((plan) => (
              <li
                key={plan.id}
                className={`text-white mt-2 cursor-pointer hover:text-gray-900  ${
                  plan === selectedMealPlan ? "selected" : ""
                }`}
                onClick={() => setSelectedMealPlan(plan)}
              >
                {`Week of ${stringDate(plan.days_of_meals[0].date)}`}
              </li>
            ))}
          </ul>
        </div>
        <button
          className="create-plan-button text-white crimson_font text-2xl w-[10] h-[10] ml-2 mt-2 bg-gray-500 rounded-md"
          onClick={createMealPlan}
        >
          Create New Plan
        </button>
        <div className="grid grid-cols-3 gap-4 meal-options-and-selected-plan-container">
          {selectedMealPlan && (
            <>
              <div className="col-span-2 selected-meal-plan">
              {/* <div className="flex flex-col justify-center selected-meal-plan"> */}
                <h2 className="selected-meal-week-header mt-[200px] ml-4 text-white overline w-40 h-10">{`Week of ${stringDate(
                  selectedMealPlan.days_of_meals[0].date
                )}`}</h2>
                <div className="selected-meal-plan-content flex flex-row justify-center items-center ml-10 h-[20%]  bg-black">
                  {selectedMealPlan.days_of_meals.map((meal, index) => (
                    <div
                      key={index}
                      className="inline-flex h-20 day-on-plan "
                      onClick={() => handleViewMeal(meal)}
                    >
                      {meal.daily_meal ? (
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}${
                            meal.daily_meal.image
                          }`}
                          className="w-20 h-20 m-2 rounded-full meal-on-plan-image filter brightness-75"
                          alt="meal"
                        />
                      ) : (
                        //*EMPTY PLATES - NEED TO GET THE ID
                        <div className="w-20 h-20 m-2 bg-white rounded-full empty-plate-on-plan filter brightness-75">
                          <p className="flex justify-center empty-plate-day">
                            {stringDate(meal.date)}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {viewMeal && (
            <>
              <MealCard meal={viewMeal} onClose={closeMealDetails} />
              <button
                className="w-20 h-10 text-white bg-gray-500 rounded-md empty-plate-button crimson_font text-md"
                // onClick={() => removeMealFromPlate(selectedMealPlan.id, viewMeal.daily_meal.id)}
                onClick={() => {
                  removeMealFromPlate();
                  closeMealDetails();
                }}
              >
                Empty Plate
              </button>
            </>
          )}
          <div className="col-span-1 col-end-4">
            <main className="flex flex-row justify-center previously-made-meals">
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="meals">
                  {(provided) => (
                    <ul
                      className="grid grid-cols-2 meals "
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {meals.map((meal, index) => (
                        <Draggable
                          key={meal.id}
                          draggableId={meal.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="flex flex-col items-center justify-center w-20 h-20 m-1 rounded-lg meal-image bg-black/40">
                                <img
                                  src={`${import.meta.env.VITE_BACKEND_URL}${
                                    meal.image
                                  }`}
                                  alt="meal image"
                                  className=" w-[90%] h-[90%] rounded-md filter brightness-75"
                                />
                              </div>
                              <p className="flex justify-center text-white capitalize font-semi-bold">
                                {meal.title}
                              </p>
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default MealPlanCreator;
