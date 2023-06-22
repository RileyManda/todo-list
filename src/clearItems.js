const clearCompletedItems = (completedItems) => {
  completedItems
    .map((item) => item.closest('li'))
    .filter((li) => li)
    .forEach((li) => {
      li.remove();
    });
};

export default clearCompletedItems;
