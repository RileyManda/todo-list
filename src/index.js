import refreshIcon from './assets/refresh-icon.png';
import backspaceIcon from './assets/back-space-icon.png';
import moreIcon from './assets/more-vert.png';
import './index.css';
// array of todo items

const TodoItems = [
  {
    index: 1,
    description: 'wash the dishes',
    completed: false,
  },
  {
    index: 2,
    description: 'complete To Do List project',
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
    // label.textContent = `${todoItem.index}: ${todoItem.description}`;
    label.textContent = todoItem.description;

    const moreIconElement = document.createElement('img');
    moreIconElement.src = moreIcon;
    moreIconElement.alt = 'More Icon';
    moreIconElement.classList.add('more-icon');

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(moreIconElement);
    todoList.appendChild(listItem);
  });
};

iterateTodoItems();

const header = document.querySelector('.card-header');
const refreshIconElement = document.createElement('img');
refreshIconElement.src = refreshIcon;
refreshIconElement.alt = 'Refresh icon';
refreshIconElement.classList.add('refresh-icon');

header.appendChild(refreshIconElement);

const backspaceIconElement = document.createElement('img');
backspaceIconElement.src = backspaceIcon;
backspaceIconElement.alt = 'Backspace icon';
backspaceIconElement.classList.add('backspace-icon');

const inputField = document.querySelector('.add-item');
inputField.appendChild(backspaceIconElement);
