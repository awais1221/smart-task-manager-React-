import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => setTasks([...tasks, newTask]);
  const deleteTask = (id) => setTasks(tasks.filter(task => task.id !== id));
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchCategory = categoryFilter === "All" || task.category === categoryFilter;
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "pending" && !task.completed) ||
      (statusFilter === "completed" && task.completed);
    return matchCategory && matchStatus;
  });

  const filterControls = (
    <div className="task-controls">
      <div className="filter-group">
        <label>Filter by Category:</label>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="learning">Learning</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="filter-buttons">
        <button className={statusFilter === 'all' ? 'active' : ''} onClick={() => setStatusFilter('all')}>All</button>
        <button className={statusFilter === 'pending' ? 'active' : ''} onClick={() => setStatusFilter('pending')}>Pending</button>
        <button className={statusFilter === 'completed' ? 'active' : ''} onClick={() => setStatusFilter('completed')}>Completed</button>
      </div>
    </div>
  );

  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <h1>Smart Task Manager</h1>
          <nav>
            <Link to="/">Home</Link> | <Link to="/about">About</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={
            <Home
              tasks={tasks}
              addTask={addTask}
              deleteTask={deleteTask}
              toggleTask={toggleTask}
              filteredTasks={filteredTasks}
              filterControls={filterControls}
            />
          } />
          <Route path="/about" element={<About />} />
        </Routes>

        <footer className="app-footer">
          <p>© 2025 Smart Task Manager</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
