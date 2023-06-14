const handleListItemClick = (event) => {
  const listItem = event.target.closest('li');
  const label = listItem.querySelector('label');

  listItem.classList.toggle('selected');

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
const handleCheckboxChange = (event) => {
  const listItem = event.target.closest('li');
  const label = listItem.querySelector('label');

  if (event.target.checked) {
    label.classList.add('crossed-out');
    listItem.classList.add('selected');
  } else {
    label.classList.remove('crossed-out');
    listItem.classList.remove('selected');
  }
};

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
      listItem.classList.add('selected');
    }

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    todoList.appendChild(listItem);
  });
};

export { handleListItemClick, handleCheckboxChange, renderTodoList };
