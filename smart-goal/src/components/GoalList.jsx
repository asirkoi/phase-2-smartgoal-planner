import GoalCard from "./GoalCard"

//props goals , onUpdateGoal and onDeleteGoal passed in the function
function GoalList({ goals, onUpdateGoal, onDeleteGoal }) {
  return (
    <div className="goal-list">
      <h2>Your Goals are here</h2>
      <div className="goals-grid">
        {/* mapping through goals and rendering the goalscard component */}
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} onUpdate={onUpdateGoal} onDelete={onDeleteGoal} />
        ))}
      </div>
    </div>
  )
}
//default export allowing it to be accessible for imports
export default GoalList
