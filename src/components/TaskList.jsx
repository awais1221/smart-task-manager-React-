function TaskList({ tasks, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks to show</p>
      </div>
    );
  }

  return (
    <div className="task-board">
      {tasks.map(task => (
        <div
          key={task.id}
          className={`task-card ${task.completed ? 'completed' : ''}`}
        >
          <div className="task-card-header">
            <h3 className="task-title">{task.title}</h3>
            <span className={`task-category ${task.category}`}>
              {task.category}
            </span>
          </div>
          <div className="task-card-body">
            <div className="task-meta">
              <div className="task-deadline">
                <span className="icon-calendar" />
                {task.deadline || 'No deadline'}
              </div>
              <div className={`task-status ${task.completed ? 'completed' : 'pending'}`}>
                {task.completed ? 'Completed' : 'Pending'}
              </div>
            </div>
            <div className="task-actions">
              <button
                className={`action-btn ${task.completed ? 'undo' : 'complete'}`}
                onClick={() => onToggle(task.id)}
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button className="action-btn delete" onClick={() => onDelete(task.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
