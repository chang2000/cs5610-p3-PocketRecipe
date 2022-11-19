import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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


function LoginPage() {
  return (
    <BasePage>
      <div>
        <h1>Sign in</h1>
        <form action="/login/password" method="post">
          <div>
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              className="form-control"
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              autoFocus
            />
          </div>
          <div>
            <label className="form-label" htmlFor="current-password">
              Password
            </label>
            <input
              className="form-control"
              id="current-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          <br />
          <button className="btn btn-primary" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </BasePage>
  );
}

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
    <div id="App">
      <RouterProvider router={router} />
    </div>
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

  useEffect(() => {
    async function getUser() {
      const res = await fetch("/getCurrentUser");
      const currentUser = await res.json();
      console.log("got user", currentUser);
      setUser(currentUser.user);
    }

    getUser();
  }, []);
  return (
    

   <Router>


      <div>User: {JSON.stringify(user)}</div>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>

        <Route path="/" element={<IndexPage />}></Route>
      </Routes>
    </Router>
  );
}



export default App;
