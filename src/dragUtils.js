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

  if (targetIndex >= list.children.length) {
    list.appendChild(listItem); // Insert at the end of the list
  } else {
    list.insertBefore(listItem, list.children[targetIndex]); // Insert at targetIndex
  }

  dropTarget.classList.remove('drag-over');
};

const handleDragEnd = () => {
  dragItem.classList.remove('dragging');
  dragItem = null;
};

export {
  handleDragStart,
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
  handleDrop,
  handleDragEnd,
};
