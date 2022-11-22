import './App.css';
import { createBrowserRouter, RouterProvider, Link, } from 'react-router-dom'
import { useState, useEffect } from "react";
import Root from './routes/Root';
import ErrorPage from './ErrorPage';
import RecipeList from './RecipeList';
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


function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          PocketRecipe
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function IndexPage() {
  return (
    <BasePage>
      <h1>Pocket Recipe</h1>
    </BasePage>
    
  );
}

function MainPage() {
  return (
    // <div id="App">
      <RouterProvider router={router} />
    // </div>
  );
}

function BasePage({ children }) {
  return (
    <div>
      <header>
        <NavBar></NavBar>
      </header>
      <main>{children}</main>
      
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

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
    
  //  <Router>
  //     <div>User: {JSON.stringify(user)}</div>
  //     <Routes>
  //       <Route path="/login" element={<LoginPage />}></Route>

  //       <Route path="/" element={<IndexPage />}></Route>
  //     </Routes>
  //   </Router>
  );
}



export default App;
