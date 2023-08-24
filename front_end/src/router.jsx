import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx';
import LandingPage  from './pages/Landing.jsx';
import SignUp from './pages/Signup.jsx';
import SignIn from './pages/SignIn.jsx'
// import Home from './pages/Home.jsx';
import MealCreator from './components/MealCreator.jsx';
import MealCard from './components/MealCard.jsx';
import Users from './pages/Users.jsx';
import MealPlan from './components/MealPlan.jsx';
// import UserMealPlan from './components/UserMealPlan.jsx';
import MealSuggester from './components/MealSuggester.jsx';
import MealPlanCreator from './components/MealPlanCreator.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'home',
        element: <MealPlan />,
        // element: <Home />,
      },
      {
        path: 'mealCreation',
        element: <MealCreator />,
      },
      {
        path: 'mealCard',
        element: <MealCard />,
      },
      // {
      //   path: 'mealplan',
      //   element: <MealPlan />,
      // },
      {
        path: 'all_users',
        element: <Users />,
      },
      // {
      //   path: 'usermealplan',
      //   element: <UserMealPlan />
      // },
      {
        path: 'suggestion',
        element: <MealSuggester />
      },
      {
        path: 'setmealplan',
        element: <MealPlanCreator />
      },
    ],
    
  },
]);

export default router;
