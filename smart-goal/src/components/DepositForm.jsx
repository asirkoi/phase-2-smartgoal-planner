
import { useState } from "react"

// props(goals,onMakeDeposit) pass down data to goals and onmakedeposit
function DepositForm({ goals, onMakeDeposit }) {
  const [selectedGoalId, setSelectedGoalId] = useState("")  //store the ID
  const [amount, setAmount] = useState("") //store the amount

  // handle submit function
  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedGoalId && amount && Number(amount) > 0) {
      onMakeDeposit(selectedGoalId, Number(amount))
      setAmount("")
      setSelectedGoalId("")
    }
  }

  return (
    <div className="deposit-form">
      <h3>Make a Deposit</h3>
      {/* form for submission */}
      <form onSubmit={handleSubmit}>
        <select value={selectedGoalId} onChange={(e) => setSelectedGoalId(e.target.value)} required>
          <option value="">Select a goal</option>
          {/* map through goals and render */}
          {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.name} (${goal.savedAmount}/${goal.targetAmount})
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Deposit amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0.01"
          step="0.01"
          required
        />
        <button type="submit">Make Deposit</button>
      </form>
    </div>
  )
}

export default DepositForm
