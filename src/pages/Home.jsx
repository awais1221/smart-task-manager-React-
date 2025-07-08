import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';

function Home({ tasks, addTask, deleteTask, toggleTask, filteredTasks, filterControls }) {
  return (
    <div className="app-content">
      <h2>Task Manager</h2>
      {filterControls}
      <AddTaskForm onAdd={addTask} />
      <TaskList tasks={filteredTasks} onDelete={deleteTask} onToggle={toggleTask} />
    </div>
  );
}
export default Home;
