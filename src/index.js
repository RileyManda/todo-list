import refreshIcon from './assets/refresh-icon.png';
import backspaceIcon from './assets/back-space-icon.png';
import moreIcon from './assets/more-vert.png';
import dustbinIcon from './assets/bin-icon.png';
import './index.css';

const TodoItems = [
  {
    index: 1,
    description: 'going to wash the dishes',
    completed: false,
  },
  {
    index: 2,
    description: 'complete To Do List project',
    completed: false,
  },
];

let dragItem = null;

const handleDragStart = (event) => {
  const moreIconElement = event.target.closest('.more-icon');
  if (moreIconElement) {
    dragItem = event.target.closest('li');
    event.dataTransfer.setData('text/plain', '');
    dragItem.classList.add('dragging');
  } else {
    event.preventDefault();
  }
};

const inputField = document.querySelector('.add-item');

const handleClick = (event) => {
  const listItem = event.currentTarget;
  const label = listItem.querySelector('label');
  const moreIconElement = listItem.querySelector('.more-icon');

  if (listItem.classList.contains('editing')) {
    // Save the changes
    label.textContent = inputField.value;
    listItem.classList.remove('editing');
    moreIconElement.src = moreIcon;
    moreIconElement.alt = 'More Icon';
  } else {
    // Enter edit mode
    inputField.value = label.textContent;
    listItem.classList.add('editing');
    moreIconElement.src = dustbinIcon;
    moreIconElement.alt = 'Dustbin Icon';
  }
};

const todoListItems = document.querySelectorAll('#todo-list li');
todoListItems.forEach((listItem) => {
  listItem.addEventListener('click', handleClick);
});

const todoList = document.getElementById('todo-list');
todoList.addEventListener('click', handleClick);

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
      const listItem = event.currentTarget;
      const label = listItem.querySelector('label');
      const moreIconElement = listItem.querySelector('.more-icon');

      if (listItem.classList.contains('editing')) {
        // Save the changes
        label.textContent = inputField.value;
        listItem.classList.remove('editing');
        moreIconElement.src = moreIcon;
        moreIconElement.alt = 'More Icon';
      } else {
        // Enter edit mode
        inputField.value = label.textContent;
        listItem.classList.add('editing');
        moreIconElement.src = dustbinIcon;
        moreIconElement.alt = 'Dustbin Icon';
      }
    });
  });
};

const handleDragOver = (event) => {
  event.preventDefault();
};

const handleDragEnter = (event) => {
  event.preventDefault();
  event.target.classList.add('drag-over');
};

const handleDragLeave = (event) => {
  event.target.classList.remove('drag-over');
};

const handleDrop = (event) => {
  event.preventDefault();
  const dropTarget = event.target;
  const list = dropTarget.closest('.list-items');
  const listItem = dragItem.closest('li');
  const targetIndex = Array.from(list.children).indexOf(dropTarget);

  list.removeChild(listItem);
  list.insertBefore(listItem, list.children[targetIndex]);
  dropTarget.classList.remove('drag-over');
};

const handleDragEnd = () => {
  dragItem.classList.remove('dragging');
  dragItem = null;
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
const cardText = document.querySelector('.card-text');
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
