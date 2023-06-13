import refreshIcon from './assets/refresh-icon.png';

// array of todo items

const TodoItems = [
  {
    index: 1,
    description: 'Task1',
    completed: false,
  },
  {
    index: 2,
    description: 'Task2',
    completed: false,
  },
  {
    index: 3,
    description: 'Task3',
    completed: false,
  },
];
export default { TodoItems };

const iterateTodoItems = () => {
  const todoList = document.getElementById('todo-list');

  TodoItems.forEach((todoItem) => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const label = document.createElement('label');
    label.textContent = `${todoItem.index}: ${todoItem.description}`;

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    todoList.appendChild(listItem);
  });
};

iterateTodoItems();

// refresh icon:
const divElement = document.getElementById('refresh-icon');
const imgElement = document.createElement('img');
imgElement.src = refreshIcon;
imgElement.alt = 'Refresh icon';
divElement.appendChild(imgElement);
