import { getListFromStorage, saveListToStorage } from './localStorage.js';

const addItem = (inputValue) => {
  if (inputValue) {
    const updatedList = getListFromStorage();
    const newItem = {
      description: inputValue,
      completed: false,
      index: updatedList.length + 1,
    };
    updatedList.push(newItem);
    saveListToStorage(updatedList);

    return newItem; // Return the new item for further processing if needed
  }

  return null; // Return null if no item is added
};

export default addItem;
