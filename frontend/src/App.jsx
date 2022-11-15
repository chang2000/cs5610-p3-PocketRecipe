import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/Root';
import ErrorPage from './ErrorPage';
import RecipeList from './RecipeList';
import RecipeDetail, {
  loader as recipeDetailLoader
} from './RecipeDetail';

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
  return (
    <div id="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
