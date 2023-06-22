import addItem from './addItem.js';
import { getListFromStorage, saveListToStorage } from './localStorage.js';

jest.mock('./localStorage.js', () => ({
  getListFromStorage: jest.fn(() => []),
  saveListToStorage: jest.fn(),
}));

describe('addItem', () => {
  test('should add a new item to the localStorage', () => {
    const newItem = addItem('Item 1');

    // Assertions
    expect(getListFromStorage).toHaveBeenCalled();
    expect(saveListToStorage).toHaveBeenCalledWith([
      { description: 'Item 1', completed: false, index: 1 },
    ]);
    expect(newItem).toEqual({
      description: 'Item 1',
      completed: false,
      index: 1,
    });
  });

  test('should not add an empty item to the localStorage', () => {
    const newItem = addItem('');

    // Assertions
    expect(getListFromStorage).not.toHaveBeenCalled();
    expect(saveListToStorage).not.toHaveBeenCalled();
    expect(newItem).toBeNull();
  });
});
