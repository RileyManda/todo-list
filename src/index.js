import clearCompletedItems from './clearItems.js';
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
import { getListFromStorage, saveListToStorage } from './localStorage.js';

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
const getListFromDOM = () => {
  const listItems = Array.from(todoList.querySelectorAll('li'));
  const items = listItems.map((listItem) => {
    const checkbox = listItem.querySelector('input[type="checkbox"]');
    const label = listItem.querySelector('label');
    return {
      description: label.textContent,
      completed: checkbox.checked,
    };
  });
  return items;
};
const iterateTodoItems = () => {
  const items = getListFromStorage(); // Retrieve items from storage
  items.forEach((todoItem, index) => {
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
    todoItem.index = index + 1;
    checkbox.addEventListener('change', (event) => {
      const listItem = event.target.closest('li');
      const label = listItem.querySelector('label');

      if (event.target.checked) {
        label.classList.add('crossed-out');
        listItem.classList.add('completed');
      } else {
        label.classList.remove('crossed-out');
        listItem.classList.remove('completed');
      }

      saveListToStorage(getListFromDOM()); // Update storage after the checkbox state changes
    });

    listItem.addEventListener('click', () => {
      listItem.contentEditable = true;
      listItem.focus();
      moreIconElement.src = dustbinIcon;
      moreIconElement.alt = 'Dustbin Icon';
      listItem.classList.add('selected');
      listItem.classList.remove('edit-mode');
    });

    listItem.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        listItem.contentEditable = false;
        moreIconElement.src = moreIcon;
        moreIconElement.alt = 'More Icon';
        listItem.classList.remove('selected');
        listItem.classList.add('edit-mode');

        // Update the description in the storage
        const index = Array.from(todoList.children).indexOf(listItem);
        const updatedList = getListFromStorage();
        updatedList[index].description = listItem.querySelector('label').textContent;
        saveListToStorage(updatedList);
      }
    });

    moreIconElement.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent the click event from propagating to the list item
      if (moreIconElement.src === dustbinIcon) {
        listItem.remove();
        saveListToStorage(getListFromDOM()); // Update storage after an item is removed
      }
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
// Add event listener for the Enter key press
inputField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addItemToTodoList();
  }
});
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
  clearCompletedItems();
  saveListToStorage(getListFromDOM()); // Update storage after clearing completed items
});
