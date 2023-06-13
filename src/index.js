import TodoItems from './todoData.js';
import {
  handleDragStart,
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
  handleDrop,
  handleDragEnd,
} from './dragUtils.js';
import { handleCheckboxChange } from './clickUtils.js';
import refreshIcon from './assets/refresh-icon.png';
import backspaceIcon from './assets/back-space-icon.png';
import moreIcon from './assets/more-vert.png';
import dustbinIcon from './assets/bin-icon.png';
import './index.css';
import addItemToTodoList from './addItem.js';

const inputField = document.querySelector('.add-item');

const todoListItems = document.querySelectorAll('#todo-list li');
todoListItems.forEach((listItem) => {
  listItem.addEventListener('click', (event) => {
    handleCheckboxChange(event, inputField, moreIcon, dustbinIcon);
  });
});

const todoList = document.getElementById('todo-list');
todoList.addEventListener('click', (event) => {
  handleCheckboxChange(event, inputField, moreIcon, dustbinIcon);
});

const iterateTodoItems = () => {
  TodoItems.forEach((todoItem) => {
    const listItem = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('gray-checkbox');

    const label = document.createElement('label');
    label.textContent = todoItem.description;

    const moreIconElement = document.createElement('img');
    moreIconElement.src = moreIcon;
    moreIconElement.alt = 'More Icon';
    moreIconElement.classList.add('more-icon');
    moreIconElement.draggable = true;
    moreIconElement.addEventListener('dragstart', handleDragStart);

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(moreIconElement);
    todoList.appendChild(listItem);

    listItem.addEventListener('click', (event) => {
      handleCheckboxChange(event, inputField, moreIcon, dustbinIcon);
    });
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

inputField.appendChild(backspaceIconElement);

todoList.addEventListener('dragover', handleDragOver);
todoList.addEventListener('dragenter', handleDragEnter);
todoList.addEventListener('dragleave', handleDragLeave);
todoList.addEventListener('drop', handleDrop);
todoList.addEventListener('dragend', handleDragEnd);

const card = document.querySelector('.card');
const cardText = document.querySelector('.card h3'); // Modified line
const moreIconElement = card.querySelector('.more-icon');

cardText.addEventListener('click', () => {
  if (card.classList.contains('editing')) {
    // Save the changes
    card.classList.remove('editing');
    moreIconElement.src = moreIcon;
    moreIconElement.alt = 'More Icon';
  } else {
    // Enter edit mode
    card.classList.add('editing');
    moreIconElement.src = dustbinIcon;
    moreIconElement.alt = 'Dustbin Icon';
  }
});

// Add event listener for the Enter key press
inputField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addItemToTodoList();
  }
});
