(function dropdown() {
  const container = document.querySelector('.container');
  const selectWrappers = document.querySelectorAll('.custom-select');
  const selectOptions = document.querySelectorAll('option');

  const createElem = (tag, parentElem, class1, class2) => {
    const elem = document.createElement(tag);
    parentElem.appendChild(elem);
    elem.classList.add(class1, class2);
    return elem;
  };

  const createWrapper = () => {
    for (let i = 0; i < selectWrappers.length; i += 1) {
      const dropWrapper = createElem('div', container, 'selectorsWrapper');
      dropWrapper.dataset.select = selectWrappers[i].dataset.select;

      const showingElem = createElem('div', dropWrapper, 'showing-elem');
      showingElem.dataset.showing = selectWrappers[i].dataset.select;

      const showingElemText = createElem('span', showingElem, 'showing-text');
      showingElemText.textContent = 'Dropdown';
      showingElemText.dataset.text = selectWrappers[i].dataset.select;

      const dropdownArrow = createElem('img', showingElem, 'arrow-down');
      dropdownArrow.dataset.image = selectWrappers[i].dataset.select;

      const optionList = createElem('ul', dropWrapper, 'option-list', 'hide');
      optionList.dataset.list = selectWrappers[i].dataset.select;

      for (let j = 0; j < selectOptions.length; j += 1) {
        if (selectOptions[j].dataset.option === selectWrappers[i].dataset.select) {
          const option = createElem('li', optionList, 'option');
          option.dataset.option = selectOptions[j].dataset.option;
          option.innerHTML = selectOptions[j].innerHTML;
        }
      }
    }
  };

  const hideList = (event) => {
    if (/showing-elem/.test(event.target.className)) {
      document.querySelector(`[data-list="${event.target.dataset.showing}"]`).classList.add('hide');
      document.querySelector(`[data-image="${event.target.dataset.showing}"]`).classList.remove('arrow-up');
    }
    container.removeEventListener('click', hideList);
  };

  const setChenges = (event) => {
    const allOptions = document.querySelectorAll('.option');
    if (/option/.test(event.target.className)) {
      document.querySelector(`[data-text="${event.target.dataset.option}"]`).innerHTML = event.target.innerHTML;
      document.querySelector(`[data-image="${event.target.dataset.option}"]`).classList.remove('arrow-up');
      for (let i = 0; i < allOptions.length; i += 1) {
        if (allOptions[i].dataset.option === event.target.dataset.option) {
          allOptions[i].classList.remove('clicked');
        }
      }
      event.target.classList.add('clicked');
      document.querySelector(`[data-list="${event.target.dataset.option}"]`).classList.add('hide');
    }
  };

  const showList = (event) => {
    if (/showing-elem/.test(event.target.className)) {
      const list = document.querySelector(`[data-list="${event.target.dataset.showing}"]`);
      document.querySelector(`[data-image="${event.target.dataset.showing}"]`).classList.add('arrow-up');
      list.classList.remove('hide');
      list.lastChild.classList.add('special');
    }
    container.addEventListener('click', hideList);
  };

  createWrapper();
  container.addEventListener('click', showList);
  container.addEventListener('click', setChenges);
}());
