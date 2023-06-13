import refreshIcon from './assets/refresh-icon.png';
import backspaceIcon from './assets/back-space-icon.png';
import moreIcon from './assets/more-vert.png';
import './index.css';

const TodoItems = [
  {
    index: 1,
    description: 'going to wash the dishes',
    completed: false,
  },
  {
    index: 2,
    description: 'complete To Do List project',
    completed: false,
  },
];

let dragItem = null;

const iterateTodoItems = () => {
  const todoList = document.getElementById('todo-list');
  TodoItems.forEach((todoItem) => {
    const listItem = document.createElement('li');
    listItem.draggable = true;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('gray-checkbox');

    const label = document.createElement('label');
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

const handleDragStart = (event) => {
  dragItem = event.target;
  event.dataTransfer.setData('text/plain', '');
  dragItem.classList.add('dragging');
};

const handleDragOver = (event) => {
  event.preventDefault();
};

const handleDragEnter = (event) => {
  event.preventDefault();
  event.target.classList.add('drag-over');
};

const handleDragLeave = (event) => {
  event.target.classList.remove('drag-over');
};

const handleDrop = (event) => {
  event.preventDefault();
  const dropTarget = event.target;
  const list = dropTarget.closest('.list-items');
  const listItem = dragItem;
  const targetIndex = Array.from(list.children).indexOf(dropTarget);

  list.removeChild(listItem);
  list.insertBefore(listItem, list.children[targetIndex]);
  dropTarget.classList.remove('drag-over');
};

const handleDragEnd = () => {
  dragItem.classList.remove('dragging');
  dragItem = null;
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

const todoList = document.getElementById('todo-list');
todoList.addEventListener('dragstart', handleDragStart);
todoList.addEventListener('dragover', handleDragOver);
todoList.addEventListener('dragenter', handleDragEnter);
todoList.addEventListener('dragleave', handleDragLeave);
todoList.addEventListener('drop', handleDrop);
todoList.addEventListener('dragend', handleDragEnd);
