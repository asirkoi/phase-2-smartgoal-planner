

import { useState, useEffect } from "react"
import "./App.css"
// imports from components
import GoalList from "./components/GoalList"
import GoalForm from "./components/GoalForm"
import DepositForm from "./components/DepositForm"
import Overview from "./components/Overview"

// Rest API from db.json
const API_URL = "http://localhost:3001/goals"

function App() {
  // usestates 
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)

  // calls API once on mount
  useEffect(() => {
    fetchGoals()
  }, [])
// Async functions using CRUD

  const fetchGoals = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setGoals(data)
    } catch (error) {
      console.error("Error fetching goals:", error)
    } finally {
      setLoading(false)
    }
  }
// Adding a goal function
  const addGoal = async (goalData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...goalData,
          id: Date.now().toString(),
          savedAmount: 0,
          createdAt: new Date().toISOString().split("T")[0],
        }),
      })
      const newGoal = await response.json()
      setGoals([...goals, newGoal])
    } catch (error) {
      console.error("Error adding goal:", error)
    }
  }

  //updating a goal function
  const updateGoal = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
      const updatedGoal = await response.json()
      setGoals(goals.map((goal) => (goal.id === id ? updatedGoal : goal)))
    } catch (error) {
      console.error("Error updating goal:", error)
    }
  }

  //deleting a goal function
  const deleteGoal = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      })
      setGoals(goals.filter((goal) => goal.id !== id))
    } catch (error) {
      console.error("Error deleting goal:", error)
    }
  }

 //find goal and make the deposit
  const makeDeposit = async (goalId, amount) => {
    const goal = goals.find((g) => g.id === goalId)
    if (goal) {
      const newSavedAmount = goal.savedAmount + amount
      await updateGoal(goalId, { savedAmount: newSavedAmount })
    }
  }

  if (loading) {
    return <div className="loading">Loading goals...</div>
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Smart Goal Planner</h1>
        <p>Manage your savings goals and track your progress</p>
      </header>

      <main className="app-main">
        {/* rendering of the imported components */}
        <Overview goals={goals} />

        <div className="forms-section">
          <GoalForm onAddGoal={addGoal} />
          <DepositForm goals={goals} onMakeDeposit={makeDeposit} />
        </div>

        <GoalList goals={goals} onUpdateGoal={updateGoal} onDeleteGoal={deleteGoal} />
      </main>
    </div>
  )
}

export default App
