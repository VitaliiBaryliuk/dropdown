(function dropdown() {
  const selectWrappers = document.querySelectorAll('.custom-select');
  const selects = document.querySelectorAll('select');
  let selectorsWrapper = null;
  let option = null;
  let createdOptiopns = null;
  let selectedOptions = null;
  let wrappers = null;

  const setWrapper = (dataSelect) => {
    selectorsWrapper = document.createElement('div');
    selectorsWrapper.classList.add('selectorsWrapper');
    selectorsWrapper.dataset.select = dataSelect;
    document.body.append(selectorsWrapper);
  };

  const setOptions = (dataSelect) => {
    for (let i = 0; i < selects.length; i += 1) {
      for (let j = 0; j < selects[i].length; j += 1) {
        if (selects[i][j].dataset.option === dataSelect) {
          option = document.createElement('div');
          j === 0 ? option.classList.add('option', 'selected') : option.classList.add('option', 'hide');
          option.dataset.option = dataSelect;
          option.innerHTML = selects[i][j].innerHTML;
          selectorsWrapper.append(option);
        }
      }
    }
  };

  const showOptions = (selected, allOptions) => {
    for (let i = 0; i < selected.length; i += 1) {
      selected[i].addEventListener('click', () => {
        allOptions.forEach((elem) => {
          if (selected[i].dataset.option === elem.dataset.option) {
            elem.classList.remove('hide');
          }
        });
      });
    }
  };

  const changeSelected = (selected, allOptions) => {
    for (let i = 0; i < allOptions.length; i += 1) {
      allOptions[i].addEventListener('click', (event) => {
        for (let j = 0; j < allOptions.length; j += 1) {
          if (allOptions[j].dataset.option === event.target.dataset.option) {
            allOptions[j].classList.remove('selected');
            event.target.classList.add('selected');
            allOptions[j].closest('.selectorsWrapper').firstChild.innerHTML = event.target.innerHTML;
          }
        }
      }, true);
    }
  };

  const hideNoSelected = (wrap, options) => {
    for (let i = 0; i < wrap.length; i += 1) {
      wrap[i].addEventListener('click', (event) => {
        for (let j = 0; j < options.length; j += 1) {
          if (/selected/.test(options[j].className) !== true && options[j].dataset.option === event.target.dataset.option) {
            options[j].classList.add('hide');
          }
        }
      }, true);
    }
  };

  const dropdownInit = () => {
    for (let i = 0; i < selectWrappers.length; i += 1) {
      setWrapper(selectWrappers[i].dataset.select);
      setOptions(selectWrappers[i].dataset.select);
    }
    createdOptiopns = document.querySelectorAll('.option');
    selectedOptions = document.querySelectorAll('.selected');
    wrappers = document.querySelectorAll('.selectorsWrapper');
    showOptions(selectedOptions, createdOptiopns);
    changeSelected(selectedOptions, createdOptiopns);
    hideNoSelected(wrappers, createdOptiopns);
  };
  dropdownInit();
}());
