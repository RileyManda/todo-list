const handleClick = (event, inputField, moreIcon, dustbinIcon) => {
  const listItem = event.target.closest('li');
  if (listItem) {
    const label = listItem.querySelector('label');
    const moreIconElement = listItem.querySelector('.more-icon');

    if (listItem.classList.contains('editing')) {
      // Save the changes
      listItem.classList.remove('editing');
      label.textContent = inputField.value;
      moreIconElement.src = moreIcon;
      moreIconElement.alt = 'More Icon';
    } else {
      // Enter edit mode
      listItem.classList.add('editing');
      inputField.value = label.textContent;
      inputField.focus();
      moreIconElement.src = dustbinIcon;
      moreIconElement.alt = 'Dustbin Icon';
    }
  }
};

export default handleClick;
