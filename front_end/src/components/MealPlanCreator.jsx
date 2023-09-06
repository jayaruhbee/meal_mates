import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { api } from "../utilities";
import { userContext } from "../App";
import MealCard from "./MealCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Helper function to format date
const stringDate = (dateString) => {
  const options = { month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const MealPlanCreator = () => {
  const { user } = useContext(userContext);
  const [meals, setMeals] = useState([]);
  const [selectedPreviousMeal, setSelectedPreviousMeal] = useState(null);
  const [mealPlans, setMealPlans] = useState([]);
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);
  const [viewMeal, setViewMeal] = useState(null);
  const [editPlateClicked, setEditPlateClicked] = useState(false);
  const [emptyPlateClicked, setEmptyPlateClicked] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(new Date());

  // *CREATE MEAL PLAN
  const createMealPlan = async () => {
    try {
      const formattedWeek = selectedWeek.toISOString();
      const response = await api.post("meal_plans/create_plan/", {
        selectedWeek: formattedWeek,
      });
      if (response === 201) {
        console.log(response);
        alert("Meal Plan Created!");
      }
    } catch (error) {
      alert("You already have a plan for this week!");
      console.error(error);
    }
  };

  // *GET MEALS
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

  // *GET MEAL PLAN(S) & SET MEAL PLAN
  useEffect(() => {
    const getMealPlans = async () => {
      try {
        const response = await api.get("meal_plans/");
        setMealPlans(response.data);
        if (response.data.length > 0) {
          setSelectedMealPlan(response.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
    getMealPlans();
    setSelectedMealPlan(null)
    }
  }, [user]);

  const pickMealForPlan = (mealId) => {
    console.log("pick meal for plan", mealId);
    setSelectedPreviousMeal(mealId);
  };
  // *EMPTY PLATE
  useEffect(() => {
    const removeMealFromPlate = async () => {
      try {
        const response = await api.delete(
          `meals/delete_meal/${selectedMealPlan.id}/${viewMeal.id}/`
        );
        console.log("response.data", response.data)
        const tempPlans = [...mealPlans];
        for (let tempPlan of tempPlans) {
          if (tempPlan.id === selectedMealPlan.id) {
            tempPlan = response.data;
          }
        }
        setMealPlans(tempPlans);
        setSelectedMealPlan(response.data)
      } catch (error) {
        console.error(error);
      } finally {
        setEmptyPlateClicked(false);
        closeMealDetails();
      }
    };
    if (emptyPlateClicked) {
      removeMealFromPlate(viewMeal.id);
    }
  }, [emptyPlateClicked, selectedMealPlan]);

  //* SET OR EDIT DAILY MEALS ON PLAN
  useEffect(() => {
    const setDailyMealOnPlan = async () => {
      try {
        const response = await api.put(
          // MEAL PLAN, THEN DAY, THEN MEAL
          `meals/update_meal/${selectedMealPlan.id}/${viewMeal.id}/${selectedPreviousMeal}/`
        );
        setSelectedMealPlan(response.data)

        console.log(response);
      } catch (error) {
        console.error(error);
      } finally {
        setEditPlateClicked(false);
        closeMealDetails();
      }
    };
    if (editPlateClicked) {
      setDailyMealOnPlan();
    }
  }, [editPlateClicked, selectedMealPlan, emptyPlateClicked]);

  // *CLOSE MEAL CARD DETAILS
  const closeMealDetails = () => {
    setViewMeal(null);
  };
  // *HANDLE DRAGGING MEAL
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const draggedMeals = Array.from(meals);
    const [reorderedDraggedMeals] = draggedMeals.splice(result.source.index, 1);
    draggedMeals.splice(result.destination.index, 0, reorderedDraggedMeals);
    setMeals(draggedMeals);
  };

  console.log("meal plans", mealPlans);
  return (
    <>
      <div className="w-screen h-screen page poiret-font">
        <div className="meal-plans-selections-container md:w-[10%] h-auto md:h-fit pb-2 flex flex-col bg-gray-500 items-center mt-5 md:mt-0 ml-0 md:ml-9 rounded-lg">
          <div className="meal-plans-selections-header text-2xl font-bold text-black underline">
            Your Meal Plans
          </div>
          <select
            className="text-white bg-gray-500 cursor-pointer mt-2 w-fit"
            onChange={(e) => {
              const selectedPlanId = parseInt(e.target.value);
              console.log("selected plan id", selectedPlanId);
              let selectedPlan = null;
              for (let plan of mealPlans) {
                if (plan.id === selectedPlanId) {
                  selectedPlan = plan;
                  break;
                }
              }
              setSelectedMealPlan(selectedPlan);
            }}
          >
            <option value="" disabled>
              Select a Meal Plan
            </option>
            {mealPlans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {`Week of ${stringDate(plan.days_of_meals[0].date)}`}
              </option>
            ))}
          </select>
        </div>
        {/* {//*CREATE MEAL PLAN} */}
        <div className="create-plan-select-week-container grid grid-rows-1 gap-2 md:gap-0 md:flex md:items-center md:ml-10 md:mt-2">
          <button
            className="create-plan-button text-white poiret-font text-2xl w-fit px-1 ml-0 md:ml-10 mt-2 bg-gray-500 rounded-md"
            onClick={createMealPlan}
          >
            Create New Plan
          </button>
          <DatePicker
            selected={selectedWeek}
            onChange={(date) => setSelectedWeek(date)}
            className="date-picker ml-2 md:ml-12"
          />
        </div>

        <div className="md:fixed md:ml-[500px] mt-36 flex items-center justify-center">
          {viewMeal && (
            <>
              <div className="grid grid-row-3 gap-4">
                <div className="meal-details row-start-3">
                  <MealCard meal={viewMeal} onClose={closeMealDetails} />
                </div>
                {/* //*CLOSE MEAL CARD AND EMPTY PLATE */}
                <div className="grid-cols-2">
                  {viewMeal && viewMeal.daily_meal && (
                    <button
                      className="empty-plate-button w-20 h-10 col-start-1 text-white bg-gray-500 rounded-md poiret-font text-md"
                      onClick={() => setEmptyPlateClicked(true)}
                    >
                      Empty Plate
                    </button>
                  )}
                </div>

                {/* //*SET AND EDIT DAILY MEALS */}
                <button
                  className="set-meal-button w-20 h-10 col-start-2 text-white bg-gray-500 rounded-md poiret-font text-md"
                  onClick={() => setEditPlateClicked(true)}
                >
                  Edit Plate
                </button>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4  meal-options-and-selected-plan-container">
          {selectedMealPlan && (
            <>
              <div className="selected-meal-plan col-span-4">
                <div className="selected-meal-plan-content flex flex-col md:flex-row justify-evenly items-center mb-7 mt-0 md:mt-[200px] ml-0 md:ml-10 w-full md:w-[90%] h-auto md:h-[20%] bg-jet-700/50 rounded-2xl">
                  {selectedMealPlan.days_of_meals.map((meal) => (
                    <div
                      key={meal.date}
                      className="day-on-plan inline-flex w-[120px] h-[120px] md:w-[12rem] md:h-[12rem] "
                      onClick={() => setViewMeal(meal)}
                    >
                      {meal.daily_meal ? (
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}${
                            meal.daily_meal.image
                          }`}
                          className="w-[100%] h-[100%] rounded-full meal-on-plan-image cursor-pointer"
                          alt="meal"
                        />
                      ) : (
                        //*EMPTY PLATES - NEED TO GET THE ID
                        <div className="empty-plate w-[100%] h-[100%] cursor-pointer flex justify-center items-center rounded-full bg-white">
                          <p className="flex justify-center empty-plate-day">
                            {stringDate(meal.date)}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <h2 className="selected-meal-week-header ml-0 md:ml-10 text-4xl w-fit text-white overline">
                  {`Week of ${stringDate(
                    selectedMealPlan.days_of_meals[0].date
                  )}`}
                </h2>
              </div>
            </>
          )}

          <div className="col-span-1 col-end-6 ">
            <main className="grid grid-col-2 previously-made-meal h-[80%] overflow-scroll ">
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="meals">
                  {(provided) => (
                    <ul
                      className="grid grid-cols-2 md:grid-cols-2 meals"
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
                              <div className="flex flex-col place-content-center w-20 h-20 md:w-24 md:h-24 rounded-lg meal-image bg-black/40">
                                <img
                                  onClick={() => {
                                    pickMealForPlan(meal.id);
                                  }}
                                  src={`${import.meta.env.VITE_BACKEND_URL}${
                                    meal.image
                                  }`}
                                  alt="meal image"
                                  className="w-[90%] h-[90%] rounded-md "
                                />
                              </div>
                              <p className="text-white capitalize font-semi-bold pl-2">
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
