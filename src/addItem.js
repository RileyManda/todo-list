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

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    todoList.appendChild(listItem);

    inputField.value = ''; // Clear the input field
  }
};

export default addItemToTodoList;
