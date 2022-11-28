# PocketRecipe: your recipe on the go

<a href="https://github.com/chang2000/chang2000.github.io/stargazers"><img src="https://img.shields.io/github/stars/chang2000/chang2000.github.io" alt="Stars Badge"/></a>

Author: Tianchang Wang & Guoqin Sun

Course Link: https://johnguerra.co/classes/webDevelopment_fall_2022/

Live Demo: https://pocket-recipe.onrender.com/

Slides Presentation: https://docs.google.com/presentation/d/1eYxaN23WkqVQN5hwlESTOvhD5IR_deif8qmiLbZScAE/edit?usp=sharing

Presentation Video: https://youtu.be/1ZqE6n1yzlg

Design Document [./design-document.md](./design-document.md).

## Project Objective

A web application for writing recipes and discovering new recipes posted by others. Users can create a new receipt and edit it later, with information like ingredients, cooking time, cooking instructions, nutrition and uploading beautiful images for the recipe. Users can assign tags for a recipe and search with tag name to get corresponding recipes. Users can mark any recipe as “Favorite” and could be found in the Favorite page. Users can view the latest recipes posted by other users in the Discover page. Users can also choose whether to make a recipe public to other users. All the user data is stored online.

## ScreenShots

**Login/Sign Up**

![login](./document-images/login.png)


**Whole View**

![overview](./document-images/overview.png)

**Dual Sidebar**
![firstsecondtab](./document-images/firstsecondtab.png)

**Current User & Log Out**

![current-user](./document-images/user.png)

![logout](./document-images/logout.png)



**Recipe Detail**
![detail](./document-images/detail.png)

## Instruction on Build

**Development Mode**

Pre-requiste: MongoDB running on `localhost:27017`

1. `cd frontend`->`yarn` -> `yarn start`
2. `cd ../backend` -> `yarn`->`yarn run dev`
3. Visit `localhost:3000`

**Deployment Mode**

Pre-requiste: MongoDB running on `localhost:27017`

1. `yarn` will install dependencies for Express and the `postinstall` will automatically install the dependencies for frontend and build frontend.
2. `yarn importdata` to import the user collection with 2 records and recipe collection with 1200 records.
3. `yarn start`, then visit `localhost:5555` to view the page.



To specify which DB to use, set up a env variable and run like following

`MONGO_URL="mongodb+srv://username:pwd@dburl" yarn run dev`

## MISC

### 80% CHECKPOINT for Nov 22

What we already done:

- **All functionalities**, for both frontend and backend

What's left:

- Styling
- Mock Data
- Deployment
- Report, Slides & demo videos

### 60% CHECKPOINT

What we already done:

- **All backend apis** (13 routes)
- Integrate React Router, implemented all possible client routing
- **All read-only function**, swithcing between different tabs and view different recipes
- Like/unlike a recipe and make it public/private

What's left:

- Client side: user create/login
- Client side: Edit A recipe
- Add CSS
- Client side: delete a recipe
