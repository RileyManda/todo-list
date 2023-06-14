import {
  handleDragStart,
} from './dragUtils.js';
import { handleCheckboxChange } from './clickUtils.js';
import moreIcon from './assets/more-vert.png';
import dustbinIcon from './assets/bin-icon.png';
import './index.css';

const addItemToTodoList = () => {
  const inputField = document.querySelector('.add-item input');
  const inputValue = inputField.value.trim();

  if (inputValue) {
    const todoList = document.getElementById('todo-list');
    const listItem = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('gray-checkbox');

    const label = document.createElement('label');
    label.textContent = inputValue;

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

    inputField.value = ''; // Clear the input field
  }
};

export default addItemToTodoList;
