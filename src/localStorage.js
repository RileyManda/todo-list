const storageKey = 'todolist';

export const getListFromStorage = () => {
  const items = JSON.parse(localStorage.getItem(storageKey));
  return items || [];
};

export const saveListToStorage = (items) => {
  localStorage.setItem(storageKey, JSON.stringify(items));
};
