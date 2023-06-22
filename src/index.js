import clearCompletedItems from './clearItems.js';
import {
  handleDragStart,
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
  handleDrop,
  handleDragEnd,
} from './dragUtils.js';
import handleCheckboxChange from './checkBox.js';
import {
  moreIcon,
  dustbinIcon,
  backspaceIcon,
  refreshIcon,
} from './assets/icons.js';
import './index.css';
import addItem from './addItem.js';
import { getListFromStorage, saveListToStorage } from './localStorage.js';
import deleteItem from './deleteItem.js';
import getListFromDOM from './getListDom.js';

const initializeTodoListApp = () => {
  const inputField = document.querySelector('.add-item input');
  const todoList = document.getElementById('todo-list');
  const refreshIconElement = document.createElement('img');
  const backspaceIconImg = document.createElement('img');

  const renderTodoListItem = (todoItem, index) => {
    const listItem = document.createElement('li');
    listItem.draggable = true;
    listItem.addEventListener('dragstart', handleDragStart);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('gray-checkbox');
    checkbox.checked = todoItem.completed;
    checkbox.addEventListener('change', handleCheckboxChange);

    const label = document.createElement('label');
    label.textContent = todoItem.description;

    const moreIconImg = document.createElement('img');
    moreIconImg.src = moreIcon;
    moreIconImg.alt = 'More Icon';
    moreIconImg.classList.add('more-icon');

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(moreIconImg);
    todoList.appendChild(listItem);

    checkbox.addEventListener('change', () => {
      label.classList.toggle('crossed-out');
      listItem.classList.toggle('completed');
      saveListToStorage(getListFromDOM());
    });

    listItem.addEventListener('click', () => {
      listItem.contentEditable = true;
      listItem.focus();
      moreIconImg.src = dustbinIcon;
      moreIconImg.alt = 'Dustbin Icon';
      listItem.classList.add('selected');
      listItem.classList.remove('edit-mode');
    });

    listItem.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        listItem.contentEditable = false;
        moreIconImg.src = moreIcon;
        moreIconImg.alt = 'More Icon';
        listItem.classList.remove('selected');
        listItem.classList.add('edit-mode');

        const updatedList = getListFromStorage();
        updatedList[index].description = listItem.querySelector('label').textContent;
        saveListToStorage(updatedList);
      }
    });

    moreIconImg.addEventListener('click', (event) => {
      event.stopPropagation();
      if (moreIconImg.src === dustbinIcon) {
        deleteItem(listItem);
        saveListToStorage(getListFromDOM());
      }
    });

    todoItem.index = index + 1;
  };

  const renderTodoListItems = () => {
    const items = getListFromStorage();
    items.forEach(renderTodoListItem);
  };

  renderTodoListItems();

  const handleAddItem = () => {
    const inputValue = inputField.value.trim();
    const newItem = addItem(inputValue);

    if (newItem) {
      renderTodoListItem(newItem, todoList.childElementCount);

      inputField.value = '';
    }
  };

  inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleAddItem();
    }
  });

  todoList.addEventListener('dragover', handleDragOver);
  todoList.addEventListener('dragenter', handleDragEnter);
  todoList.addEventListener('dragleave', handleDragLeave);
  todoList.addEventListener('drop', handleDrop);
  todoList.addEventListener('dragend', handleDragEnd);

  const getCheckedItems = () => Array.from(
    document.querySelectorAll(
      '.list-items li input[type="checkbox"]:checked',
    ),
  );
  const clearButton = document.getElementById('clear');
  clearButton.addEventListener('click', () => {
    const completedItems = getCheckedItems();
    clearCompletedItems(completedItems);
    saveListToStorage(getListFromDOM());
  });
  const header = document.querySelector('.card-header');

  refreshIconElement.src = refreshIcon;
  refreshIconElement.alt = 'Refresh icon';
  refreshIconElement.classList.add('refresh-icon');
  header.appendChild(refreshIconElement);

  backspaceIconImg.src = backspaceIcon;
  backspaceIconImg.alt = 'Backspace icon';
  backspaceIconImg.classList.add('backspace-icon');
  inputField.appendChild(backspaceIconImg);
};

initializeTodoListApp();
