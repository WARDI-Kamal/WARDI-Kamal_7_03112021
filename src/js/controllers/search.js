import { renderCard } from '../views/recipesCards';
import { renderDropdowns } from '../views/tags';
import { updateFilteredRecipes, filterDisplayedTags, displayAllDropdownTags } from './filters';

/**
1 * @description filter recipes by input in search fields and then filter dropdown tags
 * @param {*} array
 */
function researchEvent() {
  const mainSearchField = document.getElementById('mainField');
  const searchFields = [...document.querySelectorAll('.search__field')];
  let filteredRecipes = [];

  mainSearchField.addEventListener('input', () => {
    filteredRecipes = updateFilteredRecipes(mainSearchField);
    renderCard(filteredRecipes);
    renderDropdowns(filteredRecipes);
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