import handleCheckboxChange from './checkBox.js';

const handleListItemClick = (event) => {
  const listItem = event.target.closest('li');
  const label = listItem.querySelector('label');

  listItem.classList.toggle('selected'); // Toggle the 'selected' class

  if (listItem.classList.contains('selected')) {
    label.contentEditable = true;
    label.focus();
  } else {
    label.contentEditable = false;
  }
};

const listItems = document.querySelectorAll('.list-items li');
listItems.forEach((listItem) => {
  listItem.addEventListener('click', handleListItemClick);
});

const renderTodoList = (todoItems) => {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = ''; // Clear the existing list

  todoItems.forEach((todoItem) => {
    const listItem = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todoItem.completed;
    checkbox.classList.add('gray-checkbox');
    checkbox.addEventListener('change', handleCheckboxChange);

    const label = document.createElement('label');
    label.textContent = todoItem.description;
    if (todoItem.completed) {
      label.classList.add('crossed-out');
      listItem.classList.add('normal');
    }

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    todoList.appendChild(listItem);
  });
};

export { handleListItemClick, renderTodoList };
