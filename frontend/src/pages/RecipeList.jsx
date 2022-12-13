import '../App.css'
import React, { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types'

function RecipeList(props) {
  const type = props.type
  // the recipes stores ids of recipe of the current list
  const [recipes, setRecipes] = useState([])
  const user = window.localStorage.getItem('email')
  const navigation = useNavigation()

  // Do this once page reloaded
  useEffect(() => {
    const fetchData = async () => {
      let requestAPI = ''
      const toastID = toast.loading("Loading...")
      if (type === 'mine') {
        requestAPI = `/item/getByUser?email=${user}`
      } else if (type === 'discover') {
        requestAPI = '/item/getAllPub'
      } else if (type === 'fav') {
        requestAPI = `/item/getFav?email=${user}`
      }
      let res = await fetch(requestAPI)
      let data = await res.json()
      console.log(data)
      setRecipes(data.recipes)
      toast.update(toastID, { render: "Loaded!", type: "success", isLoading: false, autoClose: 2000 });
    }
    fetchData()
  }, [type, user])

  return (
    <>
      {/* also create a bunch of Link here */}
      <div id="recipe-list">
        {/* {`Current List Type: ${type}`} */}
        {/* <br></br> */}
        <nav id={`recipe-list-nav-${type}`}>
          <ul>
            {/* The following items should be dynamic */}
            {/* Dynamic render */}
            {recipes.map((item, i) => (
              <li key={i} tabIndex={`${type}-item-${i}`}>
                <NavLink
                  to={`/${type}/${item._id}`}
                  className={({ isActive, isPending }) =>
                    isActive ? 'active' : isPending ? 'pending' : ''
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <ToastContainer />
      <div
        id="contact"
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
      </div>
    </>
  )
}

RecipeList.propTypes = {
  type: PropTypes.string.isRequired,
}

export default RecipeList
