const handleCheckboxChange = (event) => {
  const listItem = event.target.closest('li');
  const label = listItem.querySelector('label');

  if (event.target.checked) {
    label.classList.add('crossed-out');
  } else {
    label.classList.remove('crossed-out');
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
    }

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    todoList.appendChild(listItem);
  });
};

export { handleCheckboxChange, renderTodoList };
