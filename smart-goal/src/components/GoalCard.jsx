
import { useState } from "react"

//props goal, onupdate and ondelete passing data 
function GoalCard({ goal, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false) //controls card if its on edit
  
  //initialize with current goal
  const [editData, setEditData] = useState({
    name: goal.name,
    targetAmount: goal.targetAmount,
    category: goal.category,
    deadline: goal.deadline,
  })

  // calculates the goal saved as percentage
  const progress = (goal.savedAmount / goal.targetAmount) * 100
  //calculation of the remaining amount and if goal is funded
  const remaining = goal.targetAmount - goal.savedAmount
  const isCompleted = goal.savedAmount >= goal.targetAmount

  const today = new Date()
  //calculating how many days are left until the deadline
  const deadline = new Date(goal.deadline)
  const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
  const isOverdue = deadline < today && !isCompleted
  const isDueSoon = daysLeft <= 30 && daysLeft > 0 && !isCompleted

  const handleSave = () => {
    onUpdate(goal.id, editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      name: goal.name,
      targetAmount: goal.targetAmount,
      category: goal.category,
      deadline: goal.deadline,
    })
    setIsEditing(false)
  }

  return (
    <div
      className={`goal-card ${isCompleted ? "completed" : ""} ${isOverdue ? "overdue" : ""} ${isDueSoon ? "warning" : ""}`}
    >
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            placeholder="Goal name"
          />
          <input
            type="number"
            value={editData.targetAmount}
            onChange={(e) => setEditData({ ...editData, targetAmount: Number(e.target.value) })}
            placeholder="Target amount"
          />
          <input
            type="text"
            value={editData.category}
            onChange={(e) => setEditData({ ...editData, category: e.target.value })}
            placeholder="Category"
          />
          <input
            type="date"
            value={editData.deadline}
            onChange={(e) => setEditData({ ...editData, deadline: e.target.value })}
          />
          <div className="edit-buttons">
            <button onClick={handleSave} className="save-btn">
              Save
            </button>
            {/* event listener on click */}
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="goal-header">
            <h3>{goal.name}</h3>
            <span className="category">{goal.category}</span>
          </div>

          <div className="goal-amounts">
            <p>
              <strong>${goal.savedAmount.toLocaleString()}</strong> of ${goal.targetAmount.toLocaleString()}
            </p>
            <p className="remaining">Remaining: ${remaining.toLocaleString()}</p>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%` }}></div>
          </div>
          <p className="progress-text">{progress.toFixed(1)}% complete</p>

          <div className="goal-deadline">
            {/* displaying the deadline */}
            <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
            {isOverdue && <p className="status overdue">OVERDUE</p>}
            {isDueSoon && <p className="status warning">Due in {daysLeft} days</p>}
            {isCompleted && <p className="status completed">COMPLETED</p>}
          </div>

          <div className="goal-actions">
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              Edit
            </button>
            <button onClick={() => onDelete(goal.id)} className="delete-btn">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}
// default export making it accessible for import
export default GoalCard
