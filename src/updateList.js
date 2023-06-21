import { handleDragStart } from './dragUtils.js';
import handleCheckboxChange from './checkBox.js';
import { moreIcon, dustbinIcon } from './assets/icons.js';

const updateList = (inputValue) => {
  const listItem = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('gray-checkbox');

  const label = document.createElement('label');
  label.textContent = inputValue;

  const createIconElement = (src, alt, className, draggable, eventListener) => {
    const iconElement = document.createElement('img');
    iconElement.src = src;
    iconElement.alt = alt;
    iconElement.classList.add(className);
    iconElement.draggable = draggable;
    iconElement.addEventListener('dragstart', eventListener);
    return iconElement;
  };

  const moreIconElement = createIconElement(
    moreIcon,
    'More Icon',
    'more-icon',
    true,
    handleDragStart,
  );

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(moreIconElement);

  listItem.addEventListener('click', (event) => {
    handleCheckboxChange(event, moreIcon, dustbinIcon);
  });

  return listItem;
};

export default updateList;
