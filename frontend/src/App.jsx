import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useState, useEffect } from "react";
import Root from './routes/Root';
import ErrorPage from './ErrorPage';
import RecipeList from './RecipeList';
import RecipeCreate from './RecipeCreate'
import RecipeDetail, {
  loader as recipeDetailLoader
} from './RecipeDetail';

import LoginPage from './LoginPage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "mine",
        element: <RecipeList type="mine" />,
        children: [
          {
            path: ":id",
            element: <RecipeDetail />,
            loader: recipeDetailLoader,
          },
          {
            path: "new",
            element: <RecipeCreate />,
          }
        ]
      },

      {
        path: "fav",
        element: <RecipeList type="fav" />,
        children: [
          {
            path: ":id",
            element: <RecipeDetail />,
            loader: recipeDetailLoader,
          },
        ]
      },

      {
        path: "discover",
        element: <RecipeList type="discover" />,
        children: [
          {
            path: ":id",
            element: <RecipeDetail />,
            loader: recipeDetailLoader,
          },
        ]
      },

    ]
  }
])

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    let email = window.localStorage.getItem("email")
    if (email == null) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
    }
  }, []);
  return (
    isLoggedIn ? (
      <RouterProvider router={router} />
    ) : (
      <LoginPage />
    )
  );
}



export default App;
