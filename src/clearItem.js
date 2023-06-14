const clearCompletedItems = () => {
  const completedItems = document.querySelectorAll('.list-items li input[type="checkbox"]:checked');
  completedItems.forEach((item) => {
    item.closest('li').remove();
  });
};

export default clearCompletedItems;
