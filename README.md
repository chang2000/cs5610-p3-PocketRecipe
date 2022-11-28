# PocketRecipe: your recipe on the go

<a href="https://github.com/chang2000/chang2000.github.io/stargazers"><img src="https://img.shields.io/github/stars/chang2000/chang2000.github.io" alt="Stars Badge"/></a>

Author: Tianchang Wang & Guoqin Sun

Course Link: https://johnguerra.co/classes/webDevelopment_fall_2022/

Live Demo: https://pocket-recipe.onrender.com/

Slides Presentation:

Presentation Video:

Design Document [./design-document.md](./design-document.md).

## Project Objective

## ScreenShots

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
