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
            path: "mine/:id",
            element: <RecipeDetail />,
            loader: recipeDetailLoader,
          },
        ]
      },

      {
        path: "fav",
        element: <RecipeList type="fav" />
      },

      {
        path: "fav/:id",
        element: <RecipeList />
      },

      {
        path: "discover",
        element: <RecipeList type="discover" />
      },

      {
        path: "discover/:id",
        element: <RecipeList />
      },
    ]
  }
])
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
