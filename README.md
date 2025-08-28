# phase-2-smartgoal-planner
users can: Add new financial goals (e.g., “Travel Fund”, “Emergency Fund”) Track progress for each goal Make deposits to any goal See a full overview of all their savings activity


Used vite for development


 added server("server" : "json-server --watch db.json --port 3001") in the package.json npm run server to start the server

components
 1. DepositForm- allowing users to select a saving goal and deposit money, when submited it calls the onMakeDeposit funtion
 2. Goalcard- displays single savings goal and progress, remaining amount, deadline status and allowing user to edit or delete goal
 3. GoalForm- a form for adding a goal
 4. GoalList- takes a list of goals and displays each one using the goal card component
 5. Overview- a summary of the goals total number of goals, total amount saved how many completed overdue and soon

 App.jsx- The main container that renders the components, interacting with the REST API using CRUD (Create, Read, Update and Delete) passing data and handlers to child components (Overview, GoalForm, DepositForm and Goallist ) It also handles landing state and initial data fetching

 db.json- the data  of the goals