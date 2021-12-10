import { renderCard } from '../views/recipesCards';
import { displayError } from '../views/layout';
import { renderDropdowns } from '../views/tags';
import { updateFilter, filterDisplayedTags, displayAllDropdownTags } from './filters';

/**
1 * @description filter recipes by input in search fields and then filter dropdown tags
 * @param {*} array
 */
function researchEvent() {
  const mainSearchField = document.getElementById('mainField');
  const searchFields = [...document.querySelectorAll('.search__field')];
  let filteredRecipes = [];

  mainSearchField.addEventListener('input', () => {
    // filteredRecipes = updateFilter(mainSearchField);
    filteredRecipes = updateFilter(mainSearchField);
    renderCard(filteredRecipes);
    renderDropdowns(filteredRecipes);

    //if filteredRecipes is empty, display error message
    if (filteredRecipes.length === 0) {
      displayError();
    }
  });


  for (const field of searchFields) {
    field.addEventListener('input', () => {      
      if (field.value.length > 2) {
        filterDisplayedTags(field);
      } else if (field.value.length < 3) {
        displayAllDropdownTags(field.dataset.type);
      }
    });
  }
}
function preventSubmit() {
  const form = document.querySelector('.searchBar');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}

export function searchEventHandler(recipesArray) {
  researchEvent(recipesArray);
  preventSubmit();
}