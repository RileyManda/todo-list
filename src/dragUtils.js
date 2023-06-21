import { saveListToStorage } from './localStorage.js';
import getListFromDOM from './getListDom.js';

export function handleDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
  event.target.classList.add('dragging');
}

export function handleDragOver(event) {
  event.preventDefault();
}

export function handleDragEnter(event) {
  event.target.classList.add('drag-over');
}

export function handleDragLeave(event) {
  event.target.classList.remove('drag-over');
}

export function handleDrop(event) {
  event.preventDefault();
  const itemId = event.dataTransfer.getData('text/plain');
  const item = document.getElementById(itemId);
  const target = event.target.closest('li');

  if (target && item) {
    target.classList.remove('drag-over');
    target.before(item);
  }
}

export function handleDragEnd(event) {
  const draggedListItem = document.querySelector('.dragging');
  const droppedListItem = event.target.closest('li');

  if (draggedListItem && droppedListItem) {
    // Check if the dragged list item is a direct child of todoList
    const todoList = document.getElementById('todo-list');
    const isDraggedChild = todoList.contains(draggedListItem);

    if (isDraggedChild) {
      // Swap the positions of the dragged and dropped list items
      const listItems = Array.from(todoList.children);
      const draggedIndex = listItems.indexOf(draggedListItem);
      const droppedIndex = listItems.indexOf(droppedListItem);

      if (draggedIndex !== droppedIndex) {
        // Remove the dragging class from the dragged list item
        draggedListItem.classList.remove('dragging');

        // Remove the drag-over class from the dropped list item
        droppedListItem.classList.remove('drag-over');

        // Reorder the list items
        draggedListItem.parentNode.removeChild(draggedListItem);
        todoList.insertBefore(draggedListItem, droppedListItem);

        // Update the index labels
        const updatedListItems = Array.from(todoList.children);
        updatedListItems.forEach((listItem, index) => {
          const indexLabel = listItem.querySelector('.index');
          if (indexLabel) {
            indexLabel.textContent = `${index + 1}.`;
          }
        });

        // Save the updated list to storage
        const updatedList = getListFromDOM();
        saveListToStorage(updatedList);
      }
    }
  }
}
