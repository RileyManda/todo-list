const clearCompletedItems = () => {
  const selectedItems = document.querySelectorAll('.list-items li.selected');
  selectedItems.forEach((item) => {
    item.remove();
  });
};

export default clearCompletedItems;
