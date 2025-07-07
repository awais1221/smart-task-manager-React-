import { useState } from 'react';
import './AddTaskForm.css';

function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('work');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      category,
      deadline,
      completed: false
    };

    onAdd(newTask);
    setTitle('');
    setCategory('work');
    setDeadline('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-input"
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select
        className="category-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="learning">Learning</option>
        <option value="other">Other</option>
      </select>
      <input
        className="date-input"
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit" className="submit-btn">➕ Add Task</button>
    </form>
  );
}

export default AddTaskForm;
