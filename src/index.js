// array of todo items

const TodoItems = [
  {
    index: 1,
    description: 'Task1',
    completed: false,
  },
  {
    index: 2,
    description: 'Task2',
    completed: false,
  },
  {
    index: 3,
    description: 'Task3',
    completed: false,
  },
];
export default { TodoItems };

const iterateTodoItems = () => {
  const todoList = document.getElementById('todo-list');

  TodoItems.forEach((todoItem) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${todoItem.index}: ${todoItem.description} (${todoItem.completed})`;
    todoList.appendChild(listItem);
  });
};

iterateTodoItems();
