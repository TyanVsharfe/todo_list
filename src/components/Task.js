import React, { useState } from "react";
import {useQuery, useMutation} from 'react-query'; // Импорт хуков из react-query
import AddTask from "./AddTask";
import editIcon from '../assets/icons/edit.svg';
import deleteIcon from '../assets/icons/delete.svg';
import '../assets/styles/Task.css';

// Функция для загрузки задач из локального хранилища
const fetchTasks = () => {
  return JSON.parse(localStorage.getItem("tasks")) ?? [];
};

export default function Task() {
  const [searchTerm, setSearchTerm] = useState('');

  // Используем хук useQuery для загрузки задач
  const { data: tasks = [], isLoading } = useQuery('tasks', fetchTasks);

  // Мутация для обновления задач в локальном хранилище
  const updateTasksMutation = useMutation(newTasks => {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  });

  // Функция для добавления задачи
  const handleAddTask = async (title) => {
    const newTask = {
      id: tasks.length + 1,
      title: title,
      done: false,
    };
    const newTasks = tasks.length ? [newTask, ...tasks] : [newTask];
    updateTasksMutation.mutate(newTasks); // Вызов мутации для обновления задач
  };

  // Функция для удаления задачи
  const handleDeleteTask = async (taskId) => {
    const shouldDelete = window.confirm("Вы уверены что хотите удалить эту задачу?");
    if (shouldDelete) {
      const newTasks = tasks.filter((task) => task.id !== taskId);
      updateTasksMutation.mutate(newTasks); // Вызов мутации для обновления задач
    }
  };

  // Функция для редактирования задачи
  const handleEditTask = async (taskId) => {
    const editedTitle = prompt(
        "Редактирование задачи",
        tasks.find((task) => task.id === taskId)?.title
    );

    if (editedTitle !== null && editedTitle.trim() !== "") {
      const newTasks = tasks.map((task) =>
          task.id === taskId ? { ...task, title: editedTitle } : task
      );
      console.log(newTasks);
      updateTasksMutation.mutate(newTasks); // Вызов мутации для обновления задач
    }
  };

  const handleTaskStatusChange = (taskId) => {
    const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
    );
    console.log(updatedTasks);
    updateTasksMutation.mutate(updatedTasks);
  };

  // Фильтрация задач по 'searchTerm'
  const filteredTasks = Array.isArray(tasks) && tasks.length > 0
      ? tasks.filter(task =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase())) : [];


  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
      <div className="task">
        {/* Search bar */}
        <input
            type='search'
            placeholder="Поиск..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
        />
        <AddTask onAddTask={handleAddTask} />

        <ul className='task_list'>
          {filteredTasks.map((task) => (
              <li key={task.id} className='task_item'>
                {/* Чекбокс задачи */}
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handleTaskStatusChange(task.id)}
                    className="task_checkbox"
                />

                {/* Заголовок задачи */}
                <div className="task_title">{task.title}</div>

                <div className="del-edit">
                  {/* Удаление задачи */}
                  <button onClick={() => handleDeleteTask(task.id)}>
                    <img src={deleteIcon} alt="Delete" />
                  </button>
                  {/* Редактирование задачи */}
                  <button onClick={() => handleEditTask(task.id)}>
                    <img src={editIcon} alt="Edit" />
                  </button>
                </div>
              </li>
          ))}
        </ul>
      </div>
  );
}

