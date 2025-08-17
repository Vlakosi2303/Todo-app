import { useState } from 'react';
import './App.css';

function App() {
  // Состояния для задач, новой задачи и редактирования
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  // Добавление задачи
  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  // Удаление задачи
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Отметка выполнения
  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Начало редактирования
  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  // Сохранение редактирования
  const saveEdit = () => {
    if (editText.trim() !== '') {
      const updatedTasks = tasks.map((task, i) =>
        i === editIndex ? { ...task, text: editText } : task
      );
      setTasks(updatedTasks);
      setEditIndex(null);
    }
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      
      {/* Поле для новой задачи */}
      <div className="task-form">
        <input 
          type="text" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Новая задача..."
        />
        <button onClick={addTask}>Добавить</button>
      </div>

      {/* Список задач */}
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            {/* Режим редактирования */}
            {editIndex === index ? (
              <>
                <input 
                  type="text" 
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={saveEdit}>Сохранить</button>
              </>
            ) : (
              <>
                <span onClick={() => toggleComplete(index)}>
                  {task.text}
                </span>
                <button onClick={() => startEdit(index)}>✏️</button>
                <button onClick={() => deleteTask(index)}>❌</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;