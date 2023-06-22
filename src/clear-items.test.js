/**
 * @jest-environment jsdom
 */

import clearCompletedItems from './clearItems.js';

describe('clearCompletedItems', () => {
  test('should remove completed items from the DOM', () => {
    // mock DOM structure with completed items
    document.body.innerHTML = `
      <ul class="list-items">
        <li>
          <input type="checkbox" checked>
        </li>
        <li>
          <input type="checkbox">
        </li>
        <li>
          <input type="checkbox" checked>
        </li>
        <li>
          <input type="checkbox" checked>
        </li>
      </ul>
    `;

    const completedItems = Array.from(
      document.querySelectorAll('.list-items li input[type="checkbox"]:checked'),
    );

    clearCompletedItems(completedItems);

    const remainingItems = Array.from(
      document.querySelectorAll('.list-items li'),
    );
    expect(remainingItems.length).toBe(1);
  });
});
