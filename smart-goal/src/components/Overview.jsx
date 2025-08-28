
import { useMemo } from "react"

//goals props passed down the function
function Overview({ goals }) {
  const stats = useMemo(() => {
    //length of total goals
    const totalGoals = goals.length
    //calculating the total goals
    const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0)

    // filtering through the completed goals and displaying
    const completedGoals = goals.filter((goal) => goal.savedAmount >= goal.targetAmount).length

     
    const today = new Date()
    const warningGoals = goals.filter((goal) => {
      const deadline = new Date(goal.deadline)
      // calculating the number of days left
      const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
      return daysLeft <= 30 && daysLeft > 0 && goal.savedAmount < goal.targetAmount
    })

    const overdueGoals = goals.filter((goal) => {
      const deadline = new Date(goal.deadline)
      return deadline < today && goal.savedAmount < goal.targetAmount
    })

    return {
      totalGoals,
      totalSaved,
      completedGoals,
      warningGoals: warningGoals.length,
      overdueGoals: overdueGoals.length,
    }
  }, [goals])

  return (
    // props passed down of total goals, completed goals, warning goals, totalsaved and overdue goals
    <div className="overview">
      <h2>Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Goals</h3>

          <p className="stat-number">{stats.totalGoals}</p>
        </div>
        <div className="stat-card">
          <h3>Total Saved</h3>
          <p className="stat-number">${stats.totalSaved.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-number">{stats.completedGoals}</p>
        </div>
        <div className="stat-card warning">
          <h3>Due Soon</h3>
          <p className="stat-number">{stats.warningGoals}</p>
        </div>
        <div className="stat-card danger">
          <h3>Overdue</h3>
          <p className="stat-number">{stats.overdueGoals}</p>
        </div>
      </div>
    </div>
  )
}
//default export making overview accessible for imports
export default Overview
