import deleteItem from './deleteItem.js';
import { saveListToStorage } from './localStorage.js';
import getListFromDOM from './getListDom.js';

jest.mock('./localStorage.js', () => ({
  saveListToStorage: jest.fn(),
}));

jest.mock('./getListDom.js', () => jest.fn());

describe('deleteItem', () => {
  test('should remove the listItem and update the storage', () => {
    const listItem = {};
    getListFromDOM.mockReturnValueOnce(['item1', 'item2']);

    deleteItem(listItem);

    // Assertions
    expect(saveListToStorage).toHaveBeenCalledWith(['item1', 'item2']);
  });
});
