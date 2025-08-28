
import { useState } from "react"

function GoalForm({ onAddGoal }) {
  //initialize form state with empty values
  const [formData, setFormData] = useState({  
    name: "",
    targetAmount: "",
    category: "",
    deadline: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    //Ensuring  all fields are filled 
    if (formData.name && formData.targetAmount && formData.category && formData.deadline) {
      onAddGoal({
        ...formData,
        targetAmount: Number(formData.targetAmount),
      })
      // reset the form to initial empty state
      setFormData({
        name: "",
        targetAmount: "",
        category: "",
        deadline: "",
      })
    }
  }

  return (
    <div className="goal-form">
      <h3>Add New Goal</h3>
      {/* rendering the form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Goal name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Target amount"
          value={formData.targetAmount}
          onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        />
        <input
          type="date"
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          required
        />
        <button type="submit">Add Goal</button>
      </form>
    </div>
  )
}

//default export making the form available for import
export default GoalForm
