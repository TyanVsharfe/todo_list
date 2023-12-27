import '../assets/styles/AddTask.css';
import newTaskIcon from '../assets/icons/newTask.svg';

export default function AddTask({ onAddTask }) {

  function handleSubmit(event) {
    // Prevent the default behavior of submission
    event.preventDefault();

    const newTitle = prompt("Добавить новую задачу");

    // Отмена
    if (newTitle !== null && newTitle.trim().length !== 0) {
      console.log(newTitle);
      onAddTask(newTitle);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          <img src={newTaskIcon} alt="AddTask"/>
          Добавить задачу
        </button>
      </form>
    </div>
  );
}
