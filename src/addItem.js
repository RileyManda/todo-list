import './index.css';
import { getListFromStorage, saveListToStorage } from './localStorage.js';

import updateToDoList from './updateList.js';

const addItem = () => {
  const inputField = document.querySelector('.add-item input');
  const inputValue = inputField.value.trim();

  if (inputValue) {
    const todoList = document.getElementById('todo-list');
    const listItem = updateToDoList(inputValue);

    todoList.appendChild(listItem);

    inputField.value = ''; // Clear the input field

    const updatedList = getListFromStorage();
    const newItem = {
      description: inputValue,
      completed: false,
      index: updatedList.length + 1,
    };
    updatedList.push(newItem);
    saveListToStorage(updatedList);
  }
};

export default addItem;
