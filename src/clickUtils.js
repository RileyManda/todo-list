const handleClick = (event, inputField, moreIcon, dustbinIcon) => {
  const listItem = event.currentTarget;
  const label = listItem.querySelector('label');
  const moreIconElement = listItem.querySelector('.more-icon');

  if (listItem.classList.contains('editing')) {
    // Save the changes
    label.textContent = inputField.value;
    listItem.classList.remove('editing');
    moreIconElement.src = moreIcon;
    moreIconElement.alt = 'More Icon';
  } else {
    // Enter edit mode
    inputField.value = label.textContent;
    listItem.classList.add('editing');
    moreIconElement.src = dustbinIcon;
    moreIconElement.alt = 'Dustbin Icon';
  }
};

export default handleClick;
